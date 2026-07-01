import crypto from "node:crypto";
import { once } from "node:events";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import * as yauzl from "yauzl";
import { formatBytes, sanitizeFileName, shellQuote, timestampForFile } from "./utils.js";
export const DEFAULT_DEPENDENCY_SCAN_DIRS = ["/app", "/opt/saas", "/opt", "/deployments", "/workspace"];
export const DEFAULT_DEPENDENCY_TOP_LEVEL_SCAN_DIRS = ["/app", "/opt/saas", "/opt", "/deployments", "/workspace"];
export function buildDiscoverJarCommand(scanDirs = DEFAULT_DEPENDENCY_SCAN_DIRS) {
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
        ...scanDirs.map((dir) => `if [ -d ${shellQuote(dir)} ]; then find ${shellQuote(dir)} -maxdepth 5 -type f ${findArchiveExpression} -print 2>/dev/null | sed 's/^/scan\\t/' || true; fi`),
        "exit 0"
    ].join("\n");
}
export function buildDiscoverTopLevelArchiveCommand(scanDirs = DEFAULT_DEPENDENCY_TOP_LEVEL_SCAN_DIRS) {
    const findArchiveExpression = "\\( -name '*.jar' -o -name '*.war' \\)";
    return [
        ...scanDirs.map((dir) => `if [ -d ${shellQuote(dir)} ]; then find ${shellQuote(dir)} -maxdepth 1 -type f ${findArchiveExpression} -print 2>/dev/null | sed 's/^/scan\\t/' || true; fi`),
        "exit 0"
    ].join("\n");
}
export function parseJarCandidateLines(output) {
    const seen = new Set();
    const candidates = [];
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
export function jarPathFromJavaArgs(args, cwd = "") {
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
export function sortJarCandidates(candidates) {
    return [...candidates].sort((left, right) => {
        const priorityDiff = candidatePriority(left) - candidatePriority(right);
        return priorityDiff === 0 ? left.path.localeCompare(right.path) : priorityDiff;
    });
}
export function buildDependencyOutputDir(homeDir, target, date = new Date()) {
    return path.join(homeDir, "Downloads", "bosscli", "dependencies", sanitizeFileName(target.namespace), sanitizeFileName(target.workload), timestampForFile(date));
}
export async function discoverJarCandidates(client, target) {
    const topLevelResult = await runDiscoveryCommand(client, target, buildDiscoverTopLevelArchiveCommand(), 30000);
    const topLevelCandidates = candidatesFromDiscoveryResult(topLevelResult);
    if (topLevelCandidates.length > 0) {
        return topLevelCandidates;
    }
    const result = await runDiscoveryCommand(client, target, buildDiscoverJarCommand(), 60000);
    return candidatesFromDiscoveryResult(result);
}
async function runDiscoveryCommand(client, target, command, timeoutMs) {
    try {
        return await runReadOnlyExecWithRetry(() => client.execCommand({
            namespace: target.namespace,
            pod: target.pod,
            container: target.container,
            command: ["sh", "-lc", command],
            timeoutMs
        }));
    }
    catch (error) {
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
function candidatesFromDiscoveryResult(result) {
    if (result.error.trim()) {
        throw new Error(`查找 jar/war 失败：${result.error.trim()}`);
    }
    if (result.stderr.trim() && !result.stdout.trim()) {
        throw new Error(`查找 jar/war 失败：${result.stderr.trim()}`);
    }
    return parseJarCandidateLines(result.stdout);
}
export async function runReadOnlyExecWithRetry(operation, options = {}) {
    const attempts = options.attempts ?? 3;
    const delayMs = options.delayMs ?? 500;
    let lastError;
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
        try {
            return await operation();
        }
        catch (error) {
            lastError = error;
            if (attempt >= attempts || !isTransientExecError(error)) {
                throw error;
            }
            await delay(delayMs * attempt);
        }
    }
    throw lastError;
}
export async function exportJavaDependencies(options) {
    const outputDir = options.outputRoot;
    const appDir = path.join(outputDir, "app");
    const libsDir = path.join(outputDir, "libs");
    await fsp.mkdir(appDir, { recursive: true });
    await fsp.mkdir(libsDir, { recursive: true });
    const appJarFileName = sanitizeFileName(path.basename(options.remoteJarPath));
    const appJarPath = path.join(appDir, appJarFileName);
    options.onProgress?.(`下载应用包：${options.remoteJarPath}`);
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
export async function downloadRemoteFile(options) {
    try {
        await downloadRemoteFileDirect(options);
    }
    catch (error) {
        if (!isTransientExecError(error)) {
            throw error;
        }
        await fsp.rm(options.outputPath, { force: true });
        await downloadRemoteFileViaInteractiveBase64(options);
    }
}
async function downloadRemoteFileDirect(options) {
    const output = fs.createWriteStream(options.outputPath);
    const stderrChunks = [];
    const errorChunks = [];
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
    }
    finally {
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
async function downloadRemoteFileViaInteractiveBase64(options) {
    const output = fs.createWriteStream(options.outputPath);
    const token = crypto.randomUUID().replace(/-/g, "");
    const beginMarker = `__BOSSCLI_BEGIN_${token}__`;
    const endMarker = `__BOSSCLI_END_${token}__:`;
    let mode = "waiting";
    let textBuffer = "";
    let base64Remainder = "";
    let exitStatus;
    let foundEnd = false;
    const writeDecodedBase64 = async (text, final = false) => {
        const cleanText = `${base64Remainder}${text}`.replace(/[^A-Za-z0-9+/=]/g, "");
        const decodeLength = final ? cleanText.length : cleanText.length - (cleanText.length % 4);
        if (decodeLength > 0) {
            const decoded = Buffer.from(cleanText.slice(0, decodeLength), "base64");
            if (!output.write(decoded)) {
                await once(output, "drain");
            }
        }
        base64Remainder = cleanText.slice(decodeLength);
    };
    const consumeStdout = async (chunk) => {
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
    }
    finally {
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
async function execTextViaInteractiveShell(options) {
    const token = crypto.randomUUID().replace(/-/g, "");
    const beginMarker = `__BOSSCLI_BEGIN_${token}__`;
    const endMarker = `__BOSSCLI_END_${token}__:`;
    let mode = "waiting";
    let textBuffer = "";
    let stdout = "";
    let exitStatus;
    let foundEnd = false;
    const consumeStdout = (chunk) => {
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
export async function extractDependencyJars(appJarPath, libsDir) {
    const zip = await yauzl.openPromise(appJarPath, { lazyEntries: true });
    const dependencies = [];
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
            readStream.on("data", (chunk) => {
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
    }
    finally {
        zip.close();
    }
    return dependencies.sort((left, right) => left.fileName.localeCompare(right.fileName));
}
export async function readMavenCoordinates(jarPath) {
    let zip;
    try {
        zip = await yauzl.openPromise(jarPath, { lazyEntries: true });
    }
    catch {
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
    }
    finally {
        zip.close();
    }
    return {};
}
export function parsePomProperties(text) {
    const result = {};
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
export function formatDependenciesText(manifest) {
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
        const gav = dependency.groupId && dependency.artifactId && dependency.version
            ? `${dependency.groupId}:${dependency.artifactId}:${dependency.version}`
            : dependency.fileName;
        lines.push(`${gav}\t${formatBytes(dependency.size)}\t${dependency.fileName}`);
    }
    return `${lines.join("\n")}\n`;
}
export function buildDependencyManifest(options) {
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
function candidatePriority(candidate) {
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
function isJavaArchivePath(filePath) {
    return /\.(?:jar|war)$/i.test(filePath);
}
function isLikelyAppArchive(filePath) {
    return /^\/(?:app|opt\/saas|deployments|workspace)\/[^/]+\.(?:jar|war)$/i.test(filePath);
}
function isTransientExecError(error) {
    const message = error instanceof Error ? error.message : String(error);
    return /socket hang up|ECONNRESET|WebSocket was closed before the connection was established/i.test(message);
}
function stripTrailingExitZero(command) {
    return command.replace(/\nexit 0\s*$/, "");
}
function normalizeTerminalText(text) {
    return text.replace(/\r/g, "");
}
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
function isDependencyJarEntry(fileName) {
    return (/^BOOT-INF\/lib\/[^/]+\.jar$/.test(fileName) ||
        /^WEB-INF\/lib\/[^/]+\.jar$/.test(fileName) ||
        /^lib\/[^/]+\.jar$/.test(fileName));
}
function uniqueDependencyPath(libsDir, fileName, existing) {
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
async function readZipEntryText(zip, entry) {
    const chunks = [];
    const stream = await zip.openReadStreamPromise(entry);
    stream.on("data", (chunk) => chunks.push(chunk));
    await once(stream, "end");
    return Buffer.concat(chunks).toString("utf8");
}
async function fileStats(filePath) {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);
    stream.on("data", (chunk) => hash.update(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    await once(stream, "end");
    const stats = await fsp.stat(filePath);
    return { size: stats.size, sha256: hash.digest("hex") };
}
//# sourceMappingURL=dependencies.js.map