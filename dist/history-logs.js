import fs from "node:fs";
import { buildContentDateRegex } from "./date-utils.js";
import { shellQuote } from "./utils.js";
export async function listHistoryFiles(client, target) {
    const command = buildListFilesCommand(target.historyPath);
    const result = await client.execCommand({
        namespace: target.namespace,
        pod: target.pod,
        container: target.container,
        command: ["sh", "-lc", command],
        timeoutMs: 60000
    });
    if (result.stderr.trim() && !result.stdout.trim()) {
        throw new Error(`列历史日志失败：${result.stderr.trim()}`);
    }
    return result.stdout
        .split(/\r?\n/)
        .map(parseHistoryFileLine)
        .filter((file) => Boolean(file));
}
export async function statHistoryFiles(client, target, files) {
    if (files.length === 0) {
        return [];
    }
    const result = await client.execCommand({
        namespace: target.namespace,
        pod: target.pod,
        container: target.container,
        command: ["sh", "-lc", buildStatFilesCommand(files)],
        timeoutMs: 60000
    });
    if (result.stderr.trim() && !result.stdout.trim()) {
        throw new Error(`读取历史日志大小失败：${result.stderr.trim()}`);
    }
    const found = result.stdout
        .split(/\r?\n/)
        .map(parseHistoryFileLine)
        .filter((file) => Boolean(file));
    const foundPaths = new Set(found.map((file) => file.path));
    const missing = files
        .filter((file) => !foundPaths.has(file))
        .map((file) => ({ path: file }));
    return [...found, ...missing];
}
export function filterHistoryFilesByService(files, serviceName) {
    const normalizedService = serviceName.toLowerCase();
    return files.filter((file) => file.path.toLowerCase().includes(normalizedService));
}
export async function exportHistoryLogs(client, options) {
    const pattern = buildContentDateRegex(options.dateSelection.dates);
    const output = fs.createWriteStream(options.outputPath, { encoding: "utf8" });
    let bytesWritten = 0;
    let matchedFiles = 0;
    let skippedFiles = 0;
    let sourceBytesProcessed = 0;
    const totalSourceBytes = totalKnownSize(options.files);
    try {
        for (const [index, file] of options.files.entries()) {
            options.onPhase?.(`扫描历史日志 ${index + 1}/${options.files.length}: ${file.path}`);
            options.onProgress?.({
                fileIndex: index + 1,
                fileCount: options.files.length,
                currentFile: file.path,
                sourceBytesProcessed,
                totalSourceBytes,
                bytesWritten
            });
            let wroteHeader = false;
            let sawUnsupportedGzip = false;
            await client.streamExecOutput({
                namespace: options.namespace,
                pod: options.pod,
                container: options.container,
                command: ["sh", "-lc", buildGrepCommand(file.path, pattern)],
                timeoutMs: 10 * 60 * 1000,
                onStdout: (chunk) => {
                    if (!wroteHeader) {
                        const header = `===== ${file.path} =====\n`;
                        output.write(header);
                        bytesWritten += Buffer.byteLength(header);
                        matchedFiles += 1;
                        wroteHeader = true;
                    }
                    output.write(chunk);
                    bytesWritten += chunk.length;
                    options.onBytes?.(bytesWritten);
                    options.onProgress?.({
                        fileIndex: index + 1,
                        fileCount: options.files.length,
                        currentFile: file.path,
                        sourceBytesProcessed,
                        totalSourceBytes,
                        bytesWritten
                    });
                },
                onStderr: (chunk) => {
                    if (chunk.toString("utf8").includes("__BOSSCLI_SKIP_GZIP__")) {
                        sawUnsupportedGzip = true;
                    }
                }
            });
            if (wroteHeader) {
                output.write("\n");
                bytesWritten += 1;
            }
            else if (sawUnsupportedGzip) {
                skippedFiles += 1;
            }
            sourceBytesProcessed += file.size ?? 0;
            options.onProgress?.({
                fileIndex: index + 1,
                fileCount: options.files.length,
                currentFile: file.path,
                sourceBytesProcessed,
                totalSourceBytes,
                bytesWritten
            });
        }
    }
    finally {
        await new Promise((resolve, reject) => {
            output.end((error) => (error ? reject(error) : resolve()));
        });
    }
    return {
        outputPath: options.outputPath,
        matchedFiles,
        skippedFiles,
        scannedFiles: options.files.length,
        bytesWritten
    };
}
export function parseHistoryFileLine(line) {
    const trimmed = line.trimEnd();
    if (!trimmed) {
        return undefined;
    }
    const separatorIndex = trimmed.indexOf("\t");
    if (separatorIndex < 0) {
        return { path: trimmed.trim() };
    }
    const sizeText = trimmed.slice(0, separatorIndex).trim();
    const path = trimmed.slice(separatorIndex + 1).trim();
    const size = Number.parseInt(sizeText, 10);
    if (!path) {
        return undefined;
    }
    return {
        path,
        size: Number.isFinite(size) && size >= 0 ? size : undefined
    };
}
export function totalKnownSize(files) {
    let total = 0;
    for (const file of files) {
        if (typeof file.size !== "number") {
            return undefined;
        }
        total += file.size;
    }
    return total;
}
function buildListFilesCommand(historyPath) {
    return [
        `base=${shellQuote(historyPath)}`,
        `if find "$base" -maxdepth 0 -printf '' >/dev/null 2>&1; then`,
        `  find "$base" -type f -printf '%s\\t%p\\n' 2>/dev/null | sort -k2`,
        `else`,
        `  find "$base" -type f 2>/dev/null | sort | while IFS= read -r file; do`,
        `    size=$(stat -c %s "$file" 2>/dev/null || wc -c < "$file" 2>/dev/null || true)`,
        `    printf '%s\\t%s\\n' "$size" "$file"`,
        `  done`,
        `fi`
    ].join("\n");
}
function buildStatFilesCommand(files) {
    return [
        `for file in ${files.map(shellQuote).join(" ")}; do`,
        `  if [ -f "$file" ]; then`,
        `    size=$(stat -c %s "$file" 2>/dev/null || wc -c < "$file" 2>/dev/null || true)`,
        `    printf '%s\\t%s\\n' "$size" "$file"`,
        `  else`,
        `    printf '\\t%s\\n' "$file"`,
        `  fi`,
        `done`
    ].join("\n");
}
function buildGrepCommand(file, pattern) {
    const quotedFile = shellQuote(file);
    const quotedPattern = shellQuote(pattern);
    return [
        `file=${quotedFile}`,
        `pattern=${quotedPattern}`,
        `case "$file" in`,
        `  *.gz)`,
        `    if command -v zgrep >/dev/null 2>&1; then`,
        `      zgrep -h -E -- "$pattern" "$file" || true`,
        `    else`,
        `      echo "__BOSSCLI_SKIP_GZIP__: zgrep not found for $file" >&2`,
        `    fi`,
        `    ;;`,
        `  *)`,
        `    grep -h -E -- "$pattern" "$file" || true`,
        `    ;;`,
        `esac`
    ].join("\n");
}
//# sourceMappingURL=history-logs.js.map