import fs from "node:fs";

import { buildContentDateRegex } from "./date-utils.js";
import { KubeSphereClient } from "./kubesphere-client.js";
import type { DateSelection, HistoryLogFile } from "./types.js";
import { shellQuote } from "./utils.js";

export interface HistoryTarget {
  namespace: string;
  pod: string;
  container: string;
  historyPath: string;
}

export interface HistoryExportOptions extends HistoryTarget {
  files: HistoryLogFile[];
  dateSelection: DateSelection;
  outputPath: string;
  onPhase?: (message: string) => void;
  onBytes?: (bytes: number) => void;
  onProgress?: (progress: HistoryExportProgress) => void;
}

export interface HistoryExportResult {
  outputPath: string;
  matchedFiles: number;
  skippedFiles: number;
  scannedFiles: number;
  bytesWritten: number;
}

export interface HistoryExportProgress {
  fileIndex: number;
  fileCount: number;
  currentFile?: string;
  sourceBytesProcessed: number;
  totalSourceBytes?: number;
  bytesWritten: number;
}

export async function listHistoryFiles(
  client: KubeSphereClient,
  target: HistoryTarget
): Promise<HistoryLogFile[]> {
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
    .filter((file): file is HistoryLogFile => Boolean(file));
}

export async function statHistoryFiles(
  client: KubeSphereClient,
  target: HistoryTarget,
  files: string[]
): Promise<HistoryLogFile[]> {
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
    .filter((file): file is HistoryLogFile => Boolean(file));
  const foundPaths = new Set(found.map((file) => file.path));
  const missing = files
    .filter((file) => !foundPaths.has(file))
    .map((file) => ({ path: file }));

  return [...found, ...missing];
}

export function filterHistoryFilesByService(files: HistoryLogFile[], serviceName: string): HistoryLogFile[] {
  const normalizedService = serviceName.toLowerCase();
  return files.filter((file) => file.path.toLowerCase().includes(normalizedService));
}

export async function exportHistoryLogs(
  client: KubeSphereClient,
  options: HistoryExportOptions
): Promise<HistoryExportResult> {
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
      } else if (sawUnsupportedGzip) {
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
  } finally {
    await new Promise<void>((resolve, reject) => {
      output.end((error?: Error | null) => (error ? reject(error) : resolve()));
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

export function parseHistoryFileLine(line: string): HistoryLogFile | undefined {
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

export function totalKnownSize(files: HistoryLogFile[]): number | undefined {
  let total = 0;

  for (const file of files) {
    if (typeof file.size !== "number") {
      return undefined;
    }
    total += file.size;
  }

  return total;
}

function buildListFilesCommand(historyPath: string): string {
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

function buildStatFilesCommand(files: string[]): string {
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

function buildGrepCommand(file: string, pattern: string): string {
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
