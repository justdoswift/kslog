import crypto from "node:crypto";
import { once } from "node:events";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";

import * as yauzl from "yauzl";

import { KubeSphereClient } from "./kubesphere-client.js";
import type { ExecResult } from "./types.js";
import { formatBytes, sanitizeFileName, shellQuote, timestampForFile } from "./utils.js";

export const DEFAULT_DEPENDENCY_SCAN_DIRS = ["/app", "/opt/saas", "/opt", "/deployments", "/workspace"];
export const DEFAULT_DEPENDENCY_TOP_LEVEL_SCAN_DIRS = ["/app", "/opt/saas", "/opt", "/deployments", "/workspace"];

export interface DependencyTarget {
  namespace: string;
  workload: string;
  pod: string;
  container: string;
}

export interface JarCandidate {
  path: string;
  source: "process" | "scan" | "provided";
}

export interface DependencyJarInfo {
  fileName: string;
  path: string;
  size: number;
  sha256: string;
  groupId?: string;
  artifactId?: string;
  version?: string;
}

export interface DependencyManifest {
  generatedAt: string;
  target: DependencyTarget;
  remoteJarPath: string;
  appJar: {
    fileName: string;
    path: string;
    size: number;
    sha256: string;
  };
  dependencies: DependencyJarInfo[];
}

export interface DependencyExportOptions {
  client: KubeSphereClient;
  target: DependencyTarget;
  remoteJarPath: string;
  outputRoot: string;
  onProgress?: (progress: DependencyExportProgress) => void;
}

export interface DependencyExportResult {
  outputDir: string;
  appJarPath: string;
  libsDir: string;
  manifestPath: string;
  dependenciesPath: string;
  dependencyCount: number;
}

export interface DependencyExportProgress {
  stage: "download" | "parse";
  message: string;
  currentBytes?: number;
  totalBytes?: number;
  method?: "direct" | "stable";
}

export interface DependencySearchQuery {
  raw: string;
  artifactId?: string;
  version?: string;
  exactJarName?: string;
  fuzzyTerms: string[];
}

export interface DependencySearchHit {
  archivePath: string;
  entry: string;
}

export interface DependencyClassSearchQuery {
  raw: string;
  classEntry: string;
}

export interface DependencyClassSearchHit {
  archivePath: string;
  scope: "app" | "dependency";
  entry: string;
  classEntry: string;
}

const NO_ARCHIVE_LISTER_MARKER = "__BOSSCLI_NO_ARCHIVE_LISTER__";

export function buildDiscoverJarCommand(scanDirs = DEFAULT_DEPENDENCY_SCAN_DIRS): string {
  const findArchiveExpression = "\\( -name '*.jar' -o -name '*.war' \\)";

  return [
    "for cmdline in /proc/[0-9]*/cmdline; do",
    "  [ -r \"$cmdline\" ] || continue",
    "  pid=${cmdline#/proc/}",
    "  pid=${pid%/cmdline}",
    "  jar=$(tr '\\0' '\\n' < \"$cmdline\" 2>/dev/null | awk 'prev == \"-jar\" { print; exit } { prev = $0 }')",
    "  [ -n \"$jar\" ] || continue",
    "  case \"$jar\" in",
    "    /*) jar_path=\"$jar\" ;;",
    "    *) cwd=$(readlink -f \"/proc/$pid/cwd\" 2>/dev/null || pwd); jar_path=\"$cwd/$jar\" ;;",
    "  esac",
    "  [ -f \"$jar_path\" ] && printf 'process\\t%s\\n' \"$jar_path\"",
    "done",
    ...scanDirs.map(
      (dir) =>
        `if [ -d ${shellQuote(dir)} ]; then find ${shellQuote(dir)} -maxdepth 5 -type f ${findArchiveExpression} -print 2>/dev/null | sed 's/^/scan\\t/' || true; fi`
    ),
    "exit 0"
  ].join("\n");
}

export function buildDiscoverTopLevelArchiveCommand(
  scanDirs = DEFAULT_DEPENDENCY_TOP_LEVEL_SCAN_DIRS
): string {
  const findArchiveExpression = "\\( -name '*.jar' -o -name '*.war' \\)";

  return [
    ...scanDirs.map(
      (dir) =>
        `if [ -d ${shellQuote(dir)} ]; then find ${shellQuote(dir)} -maxdepth 1 -type f ${findArchiveExpression} -print 2>/dev/null | sed 's/^/scan\\t/' || true; fi`
    ),
    "exit 0"
  ].join("\n");
}

export function parseDependencySearchQuery(rawQuery: string): DependencySearchQuery {
  const raw = rawQuery.trim();
  if (!raw) {
    throw new Error("依赖关键词不能为空");
  }

  const parts = raw.split(":").map((part) => part.trim()).filter(Boolean);
  const artifactId = parts.length >= 2 ? parts[1] : undefined;
  const version = parts.length >= 3 ? parts[2] : undefined;
  const exactJarName = artifactId && version ? `${artifactId}-${version}.jar` : undefined;
  const fuzzySource = exactJarName ?? artifactId ?? raw;
  const fuzzyTerms = fuzzySource
    .toLowerCase()
    .split(/[^a-z0-9_.-]+/i)
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    raw,
    artifactId,
    version,
    exactJarName,
    fuzzyTerms
  };
}

export function dependencyEntryMatches(query: DependencySearchQuery, entry: string): boolean {
  const fileName = path.posix.basename(entry).toLowerCase();
  if (!fileName.endsWith(".jar")) {
    return false;
  }

  if (query.exactJarName) {
    return fileName === query.exactJarName.toLowerCase();
  }

  const normalizedFileName = normalizeDependencySearchText(fileName);
  return query.fuzzyTerms.every((term) => normalizedFileName.includes(normalizeDependencySearchText(term)));
}

export function parseDependencyClassSearchQuery(rawQuery: string): DependencyClassSearchQuery {
  const raw = rawQuery.trim();
  if (!raw) {
    throw new Error("类路径不能为空");
  }

  const extracted =
    raw.match(/(?:ClassNotFoundException|NoClassDefFoundError)\s*:?\s*([A-Za-z0-9_.$/]+)/)?.[1] ?? raw;
  const cleanValue = extracted
    .trim()
    .replace(/^class\s+/, "")
    .replace(/^['"]|['"]$/g, "")
    .replace(/^\//, "");
  const classEntry = normalizeClassSearchEntry(cleanValue);

  if (!classEntry || classEntry === ".class") {
    throw new Error(`无法识别类路径：${raw}`);
  }

  return {
    raw,
    classEntry
  };
}

export function dependencyClassEntryMatches(query: DependencyClassSearchQuery, entry: string): boolean {
  const cleanEntry = entry.trim().replace(/^\//, "");
  return cleanEntry.endsWith(query.classEntry);
}

export function buildListArchiveEntriesCommand(archivePath: string): string {
  const quotedArchivePath = shellQuote(archivePath);
  return [
    "if command -v unzip >/dev/null 2>&1; then",
    `  unzip -Z1 ${quotedArchivePath} 2>/dev/null || unzip -l ${quotedArchivePath} 2>/dev/null | awk 'NR > 3 && $4 != \"\" && $4 !~ /^-+$/ { print $4 }'`,
    "elif command -v jar >/dev/null 2>&1; then",
    `  jar tf ${quotedArchivePath} 2>/dev/null`,
    "else",
    `  echo ${NO_ARCHIVE_LISTER_MARKER}`,
    "fi",
    "exit 0"
  ].join("\n");
}

export function buildSearchClassInArchiveCommand(archivePath: string, classEntry: string): string {
  const quotedArchivePath = shellQuote(archivePath);
  const quotedClassEntry = shellQuote(classEntry);
  const printMatchAwk =
    "function endswith(s,t){return length(s)>=length(t)&&substr(s,length(s)-length(t)+1)==t} index($0,c)>0&&endswith($0,c)";

  return [
    `archive=${quotedArchivePath}`,
    `class_entry=${quotedClassEntry}`,
    "tmp=$(mktemp -d 2>/dev/null || mktemp -d -t bosscli-class-search)",
    "cleanup() { rm -rf \"$tmp\"; }",
    "trap cleanup EXIT",
    "if command -v unzip >/dev/null 2>&1; then",
    "  list_entries() { unzip -Z1 \"$1\" 2>/dev/null || unzip -l \"$1\" 2>/dev/null | awk 'NR > 3 && $4 != \"\" && $4 !~ /^-+$/ { print $4 }'; }",
    "  entries=$(list_entries \"$archive\" || true)",
    `  printf '%s\\n' "$entries" | awk -v c="$class_entry" '${printMatchAwk}{print "APP\\t"$0}'`,
    "  printf '%s\\n' \"$entries\" | grep -E '(^|/)(BOOT-INF/lib|WEB-INF/lib|lib)/.*\\.jar$' | while IFS= read -r lib; do",
    "    [ -n \"$lib\" ] || continue",
    "    libfile=\"$tmp/lib.jar\"",
    "    unzip -p \"$archive\" \"$lib\" > \"$libfile\" 2>/dev/null || continue",
    `    list_entries "$libfile" | awk -v c="$class_entry" -v lib="$lib" '${printMatchAwk}{print "LIB\\t"lib"\\t"$0}'`,
    "  done",
    "elif command -v jar >/dev/null 2>&1; then",
    "  entries=$(jar tf \"$archive\" 2>/dev/null || true)",
    `  printf '%s\\n' "$entries" | awk -v c="$class_entry" '${printMatchAwk}{print "APP\\t"$0}'`,
    "  printf '%s\\n' \"$entries\" | grep -E '(^|/)(BOOT-INF/lib|WEB-INF/lib|lib)/.*\\.jar$' | while IFS= read -r lib; do",
    "    [ -n \"$lib\" ] || continue",
    "    rm -rf \"$tmp/extract\"",
    "    mkdir -p \"$tmp/extract\"",
    "    (cd \"$tmp/extract\" && jar xf \"$archive\" \"$lib\") 2>/dev/null || continue",
    "    libfile=\"$tmp/extract/$lib\"",
    "    [ -f \"$libfile\" ] || continue",
    `    jar tf "$libfile" 2>/dev/null | awk -v c="$class_entry" -v lib="$lib" '${printMatchAwk}{print "LIB\\t"lib"\\t"$0}'`,
    "  done",
    "else",
    `  echo ${NO_ARCHIVE_LISTER_MARKER}`,
    "fi",
    "exit 0"
  ].join("\n");
}

export function parseJarCandidateLines(output: string): JarCandidate[] {
  const seen = new Set<string>();
  const candidates: JarCandidate[] = [];

  for (const line of output.split(/\r?\n/)) {
    const [rawSource, ...pathParts] = line.split("\t");
    const jarPath = pathParts.join("\t").trim();
    const source = rawSource === "process" ? "process" : rawSource === "provided" ? "provided" : "scan";

    if (!jarPath || !isJavaArchivePath(jarPath) || seen.has(jarPath)) {
      continue;
    }

    seen.add(jarPath);
    candidates.push({ path: jarPath, source });
  }

  return sortJarCandidates(candidates);
}

export function jarPathFromJavaArgs(args: string[], cwd = ""): string | undefined {
  const jarIndex = args.findIndex((arg) => arg === "-jar");
  const jarPath = jarIndex >= 0 ? args[jarIndex + 1]?.trim() : undefined;
  if (!jarPath) {
    return undefined;
  }

  if (jarPath.startsWith("/") || !cwd) {
    return jarPath;
  }

  return path.posix.join(cwd, jarPath);
}

export function sortJarCandidates(candidates: JarCandidate[]): JarCandidate[] {
  return [...candidates].sort((left, right) => {
    const priorityDiff = candidatePriority(left) - candidatePriority(right);
    return priorityDiff === 0 ? left.path.localeCompare(right.path) : priorityDiff;
  });
}

export function buildDependencyOutputDir(
  homeDir: string,
  target: Pick<DependencyTarget, "namespace" | "workload">,
  date = new Date()
): string {
  return path.join(
    homeDir,
    "Downloads",
    "bosscli",
    "dependencies",
    sanitizeFileName(target.namespace),
    sanitizeFileName(target.workload),
    timestampForFile(date)
  );
}

export async function discoverJarCandidates(
  client: KubeSphereClient,
  target: Omit<DependencyTarget, "workload">
): Promise<JarCandidate[]> {
  const topLevelResult = await runDiscoveryCommand(client, target, buildDiscoverTopLevelArchiveCommand(), 30000);
  const topLevelCandidates = candidatesFromDiscoveryResult(topLevelResult);

  if (topLevelCandidates.length > 0) {
    return topLevelCandidates;
  }

  const result = await runDiscoveryCommand(client, target, buildDiscoverJarCommand(), 60000);

  return candidatesFromDiscoveryResult(result);
}

export async function searchDependencyInArchive(options: {
  client: KubeSphereClient;
  target: Omit<DependencyTarget, "workload">;
  archivePath: string;
  query: DependencySearchQuery;
}): Promise<DependencySearchHit[]> {
  const result = await runRemoteTextCommand(
    options.client,
    options.target,
    buildListArchiveEntriesCommand(options.archivePath),
    60000
  );

  const error = result.error.trim() || (result.stderr.trim() && !result.stdout.trim() ? result.stderr.trim() : "");
  if (error) {
    throw new Error(error);
  }

  if (result.stdout.includes(NO_ARCHIVE_LISTER_MARKER)) {
    throw new Error("容器中没有 unzip 或 jar，无法在不下载应用包的情况下检索依赖");
  }

  return result.stdout
    .split(/\r?\n/)
    .map((entry) => entry.trim())
    .filter((entry) => dependencyEntryMatches(options.query, entry))
    .map((entry) => ({
      archivePath: options.archivePath,
      entry
    }));
}

export async function searchClassInArchive(options: {
  client: KubeSphereClient;
  target: Omit<DependencyTarget, "workload">;
  archivePath: string;
  query: DependencyClassSearchQuery;
}): Promise<DependencyClassSearchHit[]> {
  const result = await runRemoteTextCommand(
    options.client,
    options.target,
    buildSearchClassInArchiveCommand(options.archivePath, options.query.classEntry),
    180000
  );

  const error = result.error.trim() || (result.stderr.trim() && !result.stdout.trim() ? result.stderr.trim() : "");
  if (error) {
    throw new Error(error);
  }

  if (result.stdout.includes(NO_ARCHIVE_LISTER_MARKER)) {
    throw new Error("容器中没有 unzip 或 jar，无法在不下载应用包的情况下检索类");
  }

  const hits: DependencyClassSearchHit[] = [];
  for (const line of result.stdout.split(/\r?\n/)) {
    const [scope, first, second] = line.split("\t");
    if (scope === "APP" && first && dependencyClassEntryMatches(options.query, first)) {
      hits.push({
        archivePath: options.archivePath,
        scope: "app",
        entry: options.archivePath,
        classEntry: first
      });
    }
    if (scope === "LIB" && first && second && dependencyClassEntryMatches(options.query, second)) {
      hits.push({
        archivePath: options.archivePath,
        scope: "dependency",
        entry: first,
        classEntry: second
      });
    }
  }

  return hits;
}

async function runDiscoveryCommand(
  client: KubeSphereClient,
  target: Omit<DependencyTarget, "workload">,
  command: string,
  timeoutMs: number
): Promise<ExecResult> {
  return runRemoteTextCommand(client, target, command, timeoutMs);
}

async function runRemoteTextCommand(
  client: KubeSphereClient,
  target: Omit<DependencyTarget, "workload">,
  command: string,
  timeoutMs: number
): Promise<ExecResult> {
  try {
    return await runReadOnlyExecWithRetry(() =>
      client.execCommand({
        namespace: target.namespace,
        pod: target.pod,
        container: target.container,
        command: ["sh", "-lc", command],
        timeoutMs
      })
    );
  } catch (error) {
    if (!isTransientExecError(error)) {
      throw error;
    }

    const result = await execTextViaInteractiveShell({
      client,
      target,
      command: stripTrailingExitZero(command),
      timeoutMs: timeoutMs * 2
    });

    return {
      stdout: result.stdout,
      stderr: "",
      error: result.exitStatus === "0" ? "" : `交互式 exec 退出码 ${result.exitStatus ?? "unknown"}`
    };
  }
}

function candidatesFromDiscoveryResult(result: ExecResult): JarCandidate[] {
  if (result.error.trim()) {
    throw new Error(`查找 jar/war 失败：${result.error.trim()}`);
  }
  if (result.stderr.trim() && !result.stdout.trim()) {
    throw new Error(`查找 jar/war 失败：${result.stderr.trim()}`);
  }

  return parseJarCandidateLines(result.stdout);
}

export async function runReadOnlyExecWithRetry<T>(
  operation: () => Promise<T>,
  options: { attempts?: number; delayMs?: number } = {}
): Promise<T> {
  const attempts = options.attempts ?? 3;
  const delayMs = options.delayMs ?? 500;
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt >= attempts || !isTransientExecError(error)) {
        throw error;
      }
      await delay(delayMs * attempt);
    }
  }

  throw lastError;
}

export async function exportJavaDependencies(options: DependencyExportOptions): Promise<DependencyExportResult> {
  const outputDir = options.outputRoot;
  const appDir = path.join(outputDir, "app");
  const libsDir = path.join(outputDir, "libs");
  await fsp.mkdir(appDir, { recursive: true });
  await fsp.mkdir(libsDir, { recursive: true });

  const appJarFileName = sanitizeFileName(path.basename(options.remoteJarPath));
  const appJarPath = path.join(appDir, appJarFileName);
  options.onProgress?.({
    stage: "download",
    message: `下载应用包：${options.remoteJarPath}`,
    currentBytes: 0
  });
  await downloadRemoteFile({
    client: options.client,
    target: options.target,
    remotePath: options.remoteJarPath,
    outputPath: appJarPath,
    onProgress: (progress) => {
      options.onProgress?.({
        stage: "download",
        message: `下载应用包：${options.remoteJarPath}`,
        ...progress
      });
    }
  });

  options.onProgress?.({
    stage: "parse",
    message: "解析依赖 jar"
  });
  const dependencies = await extractDependencyJars(appJarPath, libsDir);
  const appStats = await fileStats(appJarPath);
  const manifest = buildDependencyManifest({
    target: options.target,
    remoteJarPath: options.remoteJarPath,
    appJarPath,
    appJarFileName,
    appStats,
    dependencies
  });
  const manifestPath = path.join(outputDir, "manifest.json");
  const dependenciesPath = path.join(outputDir, "dependencies.txt");
  await fsp.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  await fsp.writeFile(dependenciesPath, formatDependenciesText(manifest), "utf8");

  return {
    outputDir,
    appJarPath,
    libsDir,
    manifestPath,
    dependenciesPath,
    dependencyCount: dependencies.length
  };
}

export async function downloadRemoteFile(options: {
  client: KubeSphereClient;
  target: Omit<DependencyTarget, "workload">;
  remotePath: string;
  outputPath: string;
  onProgress?: (progress: {
    currentBytes: number;
    totalBytes?: number;
    method: "direct" | "stable";
  }) => void;
}): Promise<void> {
  const expectedSize = await getRemoteFileSize(options);
  const emitProgress = (progress: {
    currentBytes: number;
    totalBytes?: number;
    method: "direct" | "stable";
  }) => {
    options.onProgress?.({
      ...progress,
      totalBytes: progress.totalBytes ?? expectedSize
    });
  };

  emitProgress({ currentBytes: 0, method: "direct" });

  try {
    await downloadRemoteFileDirect({ ...options, onProgress: emitProgress });
    await assertDownloadedSize(options.outputPath, expectedSize);
  } catch (error) {
    if (!isRecoverableDownloadError(error)) {
      throw error;
    }

    await fsp.rm(options.outputPath, { force: true });
    emitProgress({ currentBytes: 0, method: "stable" });
    await downloadRemoteFileViaInteractiveBase64({ ...options, onProgress: emitProgress });
    await assertDownloadedSize(options.outputPath, expectedSize);
  }
}

async function getRemoteFileSize(options: {
  client: KubeSphereClient;
  target: Omit<DependencyTarget, "workload">;
  remotePath: string;
}): Promise<number | undefined> {
  const command = [
    `if command -v stat >/dev/null 2>&1; then stat -c '%s' -- ${shellQuote(options.remotePath)} 2>/dev/null`,
    `|| wc -c < ${shellQuote(options.remotePath)}`,
    `else wc -c < ${shellQuote(options.remotePath)}; fi`
  ].join(" ");

  try {
    const result = await runRemoteTextCommand(options.client, options.target, command, 30000);
    const error = result.error.trim() || result.stderr.trim();
    if (error) {
      return undefined;
    }

    const match = result.stdout.match(/\d+/);
    return match ? Number(match[0]) : undefined;
  } catch {
    return undefined;
  }
}

async function assertDownloadedSize(outputPath: string, expectedSize: number | undefined): Promise<void> {
  if (expectedSize === undefined || !Number.isFinite(expectedSize)) {
    return;
  }

  const stats = await fsp.stat(outputPath);
  if (stats.size !== expectedSize) {
    throw new DownloadSizeMismatchError(`下载应用包大小不一致：本地 ${stats.size} bytes，远端 ${expectedSize} bytes`);
  }
}

async function downloadRemoteFileDirect(options: {
  client: KubeSphereClient;
  target: Omit<DependencyTarget, "workload">;
  remotePath: string;
  outputPath: string;
  onProgress?: (progress: {
    currentBytes: number;
    totalBytes?: number;
    method: "direct" | "stable";
  }) => void;
}): Promise<void> {
  const output = fs.createWriteStream(options.outputPath);
  const stderrChunks: Buffer[] = [];
  const errorChunks: Buffer[] = [];
  let downloadedBytes = 0;

  try {
    await options.client.streamExecOutput({
      namespace: options.target.namespace,
      pod: options.target.pod,
      container: options.target.container,
      command: ["sh", "-lc", `cat -- ${shellQuote(options.remotePath)}`],
      timeoutMs: 600000,
      onStdout: async (chunk) => {
        downloadedBytes += chunk.length;
        if (!output.write(chunk)) {
          await once(output, "drain");
        }
        options.onProgress?.({
          currentBytes: downloadedBytes,
          method: "direct"
        });
      },
      onStderr: (chunk) => {
        stderrChunks.push(chunk);
      },
      onErrorChannel: (chunk) => {
        errorChunks.push(chunk);
      }
    });
  } finally {
    output.end();
    await once(output, "close");
  }

  const error = Buffer.concat(errorChunks).toString("utf8").trim();
  const stderr = Buffer.concat(stderrChunks).toString("utf8").trim();
  if (error || stderr) {
    await fsp.rm(options.outputPath, { force: true });
    throw new Error(`下载应用包失败：${error || stderr}`);
  }
}

async function downloadRemoteFileViaInteractiveBase64(options: {
  client: KubeSphereClient;
  target: Omit<DependencyTarget, "workload">;
  remotePath: string;
  outputPath: string;
  onProgress?: (progress: {
    currentBytes: number;
    totalBytes?: number;
    method: "direct" | "stable";
  }) => void;
}): Promise<void> {
  const output = fs.createWriteStream(options.outputPath);
  const token = crypto.randomUUID().replace(/-/g, "");
  const beginMarker = `__BOSSCLI_BEGIN_${token}__`;
  const endMarker = `__BOSSCLI_END_${token}__:`;
  let mode: "waiting" | "capturing" | "done" = "waiting";
  let textBuffer = "";
  let base64Remainder = "";
  let exitStatus: string | undefined;
  let foundEnd = false;
  let downloadedBytes = 0;

  const writeDecodedBase64 = async (text: string, final = false) => {
    const cleanText = `${base64Remainder}${text}`.replace(/[^A-Za-z0-9+/=]/g, "");
    const decodeLength = final ? cleanText.length : cleanText.length - (cleanText.length % 4);

    if (decodeLength > 0) {
      const decoded = Buffer.from(cleanText.slice(0, decodeLength), "base64");
      if (!output.write(decoded)) {
        await once(output, "drain");
      }
      downloadedBytes += decoded.length;
      options.onProgress?.({
        currentBytes: downloadedBytes,
        method: "stable"
      });
    }

    base64Remainder = cleanText.slice(decodeLength);
  };

  const consumeStdout = async (chunk: Buffer) => {
    textBuffer += chunk.toString("utf8");

    while (true) {
      if (mode === "waiting") {
        const beginIndex = textBuffer.indexOf(beginMarker);
        if (beginIndex === -1) {
          textBuffer = textBuffer.slice(-beginMarker.length);
          return;
        }
        textBuffer = textBuffer.slice(beginIndex + beginMarker.length);
        mode = "capturing";
      }

      if (mode === "capturing") {
        const endIndex = textBuffer.indexOf(endMarker);
        if (endIndex === -1) {
          const keepLength = endMarker.length + 16;
          const processLength = Math.max(0, textBuffer.length - keepLength);
          if (processLength > 0) {
            await writeDecodedBase64(textBuffer.slice(0, processLength));
            textBuffer = textBuffer.slice(processLength);
          }
          return;
        }

        await writeDecodedBase64(textBuffer.slice(0, endIndex), true);
        const statusMatch = textBuffer.slice(endIndex + endMarker.length).match(/^(\d+)/);
        exitStatus = statusMatch?.[1];
        textBuffer = "";
        mode = "done";
        foundEnd = true;
        return;
      }

      return;
    }
  };

  const command = [
    `printf '\\n__BOSSCLI_BEGIN_%s__\\n' ${token}`,
    `base64 ${shellQuote(options.remotePath)}`,
    "status=$?",
    `printf '\\n__BOSSCLI_END_%s__:%s\\n' ${token} \"$status\"`,
    "exit"
  ].join("; ");

  try {
    await options.client.streamInteractiveShell({
      namespace: options.target.namespace,
      pod: options.target.pod,
      container: options.target.container,
      inputLines: [command],
      timeoutMs: 1800000,
      onStdout: consumeStdout
    });
  } finally {
    output.end();
    await once(output, "close");
  }

  if (!foundEnd) {
    await fsp.rm(options.outputPath, { force: true });
    throw new Error("下载应用包失败：交互式 base64 下载没有收到结束标记");
  }

  if (exitStatus !== "0") {
    await fsp.rm(options.outputPath, { force: true });
    throw new Error(`下载应用包失败：base64 退出码 ${exitStatus ?? "unknown"}`);
  }
}

async function execTextViaInteractiveShell(options: {
  client: KubeSphereClient;
  target: Omit<DependencyTarget, "workload">;
  command: string;
  timeoutMs: number;
}): Promise<{ stdout: string; exitStatus?: string }> {
  const token = crypto.randomUUID().replace(/-/g, "");
  const beginMarker = `__BOSSCLI_BEGIN_${token}__`;
  const endMarker = `__BOSSCLI_END_${token}__:`;
  let mode: "waiting" | "capturing" | "done" = "waiting";
  let textBuffer = "";
  let stdout = "";
  let exitStatus: string | undefined;
  let foundEnd = false;

  const consumeStdout = (chunk: Buffer) => {
    textBuffer += chunk.toString("utf8");

    while (true) {
      if (mode === "waiting") {
        const beginIndex = textBuffer.indexOf(beginMarker);
        if (beginIndex === -1) {
          textBuffer = textBuffer.slice(-beginMarker.length);
          return;
        }
        textBuffer = textBuffer.slice(beginIndex + beginMarker.length);
        mode = "capturing";
      }

      if (mode === "capturing") {
        const endIndex = textBuffer.indexOf(endMarker);
        if (endIndex === -1) {
          const keepLength = endMarker.length + 16;
          const processLength = Math.max(0, textBuffer.length - keepLength);
          if (processLength > 0) {
            stdout += textBuffer.slice(0, processLength);
            textBuffer = textBuffer.slice(processLength);
          }
          return;
        }

        stdout += textBuffer.slice(0, endIndex);
        const statusMatch = textBuffer.slice(endIndex + endMarker.length).match(/^(\d+)/);
        exitStatus = statusMatch?.[1];
        textBuffer = "";
        mode = "done";
        foundEnd = true;
        return;
      }

      return;
    }
  };

  const command = [
    `printf '\\n__BOSSCLI_BEGIN_%s__\\n' ${token}`,
    `{ ${options.command}; }`,
    "status=$?",
    `printf '\\n__BOSSCLI_END_%s__:%s\\n' ${token} \"$status\"`,
    "exit"
  ].join("; ");

  await options.client.streamInteractiveShell({
    namespace: options.target.namespace,
    pod: options.target.pod,
    container: options.target.container,
    inputLines: [command],
    timeoutMs: options.timeoutMs,
    onStdout: consumeStdout
  });

  if (!foundEnd) {
    throw new Error("交互式 exec 没有收到结束标记");
  }

  return {
    stdout: normalizeTerminalText(stdout),
    exitStatus
  };
}

export async function extractDependencyJars(appJarPath: string, libsDir: string): Promise<DependencyJarInfo[]> {
  const zip = await yauzl.openPromise(appJarPath, { lazyEntries: true });
  const dependencies: DependencyJarInfo[] = [];

  try {
    for await (const entry of zip.eachEntry()) {
      if (!isDependencyJarEntry(entry.fileName)) {
        continue;
      }

      const fileName = sanitizeFileName(path.basename(entry.fileName));
      const outputPath = uniqueDependencyPath(libsDir, fileName, dependencies);
      const outputFileName = path.basename(outputPath);
      const hash = crypto.createHash("sha256");
      let size = 0;
      const readStream = await zip.openReadStreamPromise(entry);
      readStream.on("data", (chunk: Buffer) => {
        size += chunk.length;
        hash.update(chunk);
      });
      await pipeline(readStream, fs.createWriteStream(outputPath));

      dependencies.push({
        fileName: outputFileName,
        path: outputPath,
        size,
        sha256: hash.digest("hex"),
        ...(await readMavenCoordinates(outputPath))
      });
    }
  } finally {
    zip.close();
  }

  return dependencies.sort((left, right) => left.fileName.localeCompare(right.fileName));
}

export async function readMavenCoordinates(jarPath: string): Promise<{
  groupId?: string;
  artifactId?: string;
  version?: string;
}> {
  let zip: yauzl.ZipFile;
  try {
    zip = await yauzl.openPromise(jarPath, { lazyEntries: true });
  } catch {
    return {};
  }

  try {
    for await (const entry of zip.eachEntry()) {
      if (!/^META-INF\/maven\/[^/]+\/[^/]+\/pom\.properties$/.test(entry.fileName)) {
        continue;
      }

      const text = await readZipEntryText(zip, entry);
      return parsePomProperties(text);
    }
  } finally {
    zip.close();
  }

  return {};
}

export function parsePomProperties(text: string): { groupId?: string; artifactId?: string; version?: string } {
  const result: { groupId?: string; artifactId?: string; version?: string } = {};

  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const separator = trimmed.indexOf("=");
    if (separator <= 0) {
      continue;
    }
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (key === "groupId" || key === "artifactId" || key === "version") {
      result[key] = value;
    }
  }

  return result;
}

export function formatDependenciesText(manifest: DependencyManifest): string {
  const lines = [
    `服务：${manifest.target.namespace} / ${manifest.target.workload}`,
    `Pod：${manifest.target.pod}`,
    `容器：${manifest.target.container}`,
    `远端应用包：${manifest.remoteJarPath}`,
    `应用包：${manifest.appJar.fileName} (${formatBytes(manifest.appJar.size)})`,
    `依赖数量：${manifest.dependencies.length}`,
    ""
  ];

  for (const dependency of manifest.dependencies) {
    const gav =
      dependency.groupId && dependency.artifactId && dependency.version
        ? `${dependency.groupId}:${dependency.artifactId}:${dependency.version}`
        : dependency.fileName;
    lines.push(`${gav}\t${formatBytes(dependency.size)}\t${dependency.fileName}`);
  }

  return `${lines.join("\n")}\n`;
}

export function buildDependencyManifest(options: {
  target: DependencyTarget;
  remoteJarPath: string;
  appJarPath: string;
  appJarFileName: string;
  appStats: { size: number; sha256: string };
  dependencies: DependencyJarInfo[];
}): DependencyManifest {
  return {
    generatedAt: new Date().toISOString(),
    target: options.target,
    remoteJarPath: options.remoteJarPath,
    appJar: {
      fileName: options.appJarFileName,
      path: options.appJarPath,
      ...options.appStats
    },
    dependencies: options.dependencies
  };
}

function candidatePriority(candidate: JarCandidate): number {
  if (candidate.source === "provided") {
    return 0;
  }
  if (candidate.source === "process") {
    return 1;
  }
  if (/\/(?:target|build)\//.test(candidate.path)) {
    return 3;
  }
  if (isLikelyAppArchive(candidate.path)) {
    return 2;
  }
  if (/\/(?:agent|optional-plugins)\//.test(candidate.path)) {
    return 5;
  }
  return 4;
}

function isJavaArchivePath(filePath: string): boolean {
  return /\.(?:jar|war)$/i.test(filePath);
}

function isLikelyAppArchive(filePath: string): boolean {
  return /^\/(?:app|opt\/saas|deployments|workspace)\/[^/]+\.(?:jar|war)$/i.test(filePath);
}

function isTransientExecError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /socket hang up|ECONNRESET|WebSocket was closed before the connection was established/i.test(message);
}

function isRecoverableDownloadError(error: unknown): boolean {
  return error instanceof DownloadSizeMismatchError || isTransientExecError(error);
}

function normalizeDependencySearchText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function normalizeClassSearchEntry(value: string): string {
  const withoutSuffix = value.endsWith(".class") ? value.slice(0, -".class".length) : value;
  const slashValue = withoutSuffix.includes("/") ? withoutSuffix : withoutSuffix.replace(/\./g, "/");
  return `${slashValue.replace(/^\/+/, "")}.class`;
}

class DownloadSizeMismatchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DownloadSizeMismatchError";
  }
}

function stripTrailingExitZero(command: string): string {
  return command.replace(/\nexit 0\s*$/, "");
}

function normalizeTerminalText(text: string): string {
  return text.replace(/\r/g, "");
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isDependencyJarEntry(fileName: string): boolean {
  return (
    /^BOOT-INF\/lib\/[^/]+\.jar$/.test(fileName) ||
    /^WEB-INF\/lib\/[^/]+\.jar$/.test(fileName) ||
    /^lib\/[^/]+\.jar$/.test(fileName)
  );
}

function uniqueDependencyPath(libsDir: string, fileName: string, existing: DependencyJarInfo[]): string {
  if (!existing.some((item) => item.fileName === fileName)) {
    return path.join(libsDir, fileName);
  }

  const parsed = path.parse(fileName);
  let index = 2;
  while (true) {
    const candidate = `${parsed.name}_${index}${parsed.ext}`;
    if (!existing.some((item) => item.fileName === candidate)) {
      return path.join(libsDir, candidate);
    }
    index += 1;
  }
}

async function readZipEntryText(zip: yauzl.ZipFile, entry: yauzl.Entry): Promise<string> {
  const chunks: Buffer[] = [];
  const stream = await zip.openReadStreamPromise(entry);
  stream.on("data", (chunk: Buffer) => chunks.push(chunk));
  await once(stream, "end");
  return Buffer.concat(chunks).toString("utf8");
}

async function fileStats(filePath: string): Promise<{ size: number; sha256: string }> {
  const hash = crypto.createHash("sha256");
  const stream = fs.createReadStream(filePath);
  stream.on("data", (chunk: Buffer | string) => hash.update(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
  await once(stream, "end");
  const stats = await fsp.stat(filePath);
  return { size: stats.size, sha256: hash.digest("hex") };
}
