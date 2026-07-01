import crypto from "node:crypto";
import { once } from "node:events";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";

import * as yauzl from "yauzl";

import { KubeSphereClient } from "./kubesphere-client.js";
import { formatBytes, sanitizeFileName, shellQuote, timestampForFile } from "./utils.js";

export const DEFAULT_DEPENDENCY_SCAN_DIRS = ["/app", "/opt", "/deployments", "/workspace"];

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
  onProgress?: (message: string) => void;
}

export interface DependencyExportResult {
  outputDir: string;
  appJarPath: string;
  libsDir: string;
  manifestPath: string;
  dependenciesPath: string;
  dependencyCount: number;
}

export function buildDiscoverJarCommand(scanDirs = DEFAULT_DEPENDENCY_SCAN_DIRS): string {
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
        `[ -d ${shellQuote(dir)} ] && find ${shellQuote(dir)} -maxdepth 5 -type f -name '*.jar' -print 2>/dev/null | sed 's/^/scan\\t/'`
    )
  ].join("\n");
}

export function parseJarCandidateLines(output: string): JarCandidate[] {
  const seen = new Set<string>();
  const candidates: JarCandidate[] = [];

  for (const line of output.split(/\r?\n/)) {
    const [rawSource, ...pathParts] = line.split("\t");
    const jarPath = pathParts.join("\t").trim();
    const source = rawSource === "process" ? "process" : rawSource === "provided" ? "provided" : "scan";

    if (!jarPath || !jarPath.endsWith(".jar") || seen.has(jarPath)) {
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
  const result = await client.execCommand({
    namespace: target.namespace,
    pod: target.pod,
    container: target.container,
    command: ["sh", "-lc", buildDiscoverJarCommand()],
    timeoutMs: 60000
  });

  if (result.error.trim()) {
    throw new Error(`查找 jar 失败：${result.error.trim()}`);
  }
  if (result.stderr.trim() && !result.stdout.trim()) {
    throw new Error(`查找 jar 失败：${result.stderr.trim()}`);
  }

  return parseJarCandidateLines(result.stdout);
}

export async function exportJavaDependencies(options: DependencyExportOptions): Promise<DependencyExportResult> {
  const outputDir = options.outputRoot;
  const appDir = path.join(outputDir, "app");
  const libsDir = path.join(outputDir, "libs");
  await fsp.mkdir(appDir, { recursive: true });
  await fsp.mkdir(libsDir, { recursive: true });

  const appJarFileName = sanitizeFileName(path.basename(options.remoteJarPath));
  const appJarPath = path.join(appDir, appJarFileName);
  options.onProgress?.(`下载应用 jar：${options.remoteJarPath}`);
  await downloadRemoteFile({
    client: options.client,
    target: options.target,
    remotePath: options.remoteJarPath,
    outputPath: appJarPath
  });

  options.onProgress?.("解析依赖 jar");
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
}): Promise<void> {
  const output = fs.createWriteStream(options.outputPath);
  const stderrChunks: Buffer[] = [];
  const errorChunks: Buffer[] = [];

  try {
    await options.client.streamExecOutput({
      namespace: options.target.namespace,
      pod: options.target.pod,
      container: options.target.container,
      command: ["sh", "-lc", `cat -- ${shellQuote(options.remotePath)}`],
      timeoutMs: 600000,
      onStdout: async (chunk) => {
        if (!output.write(chunk)) {
          await once(output, "drain");
        }
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
    throw new Error(`下载 jar 失败：${error || stderr}`);
  }
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
    `远端 jar：${manifest.remoteJarPath}`,
    `应用 jar：${manifest.appJar.fileName} (${formatBytes(manifest.appJar.size)})`,
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
  return 2;
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
