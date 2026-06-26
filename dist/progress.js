import { formatBytes } from "./utils.js";
export class ProgressBar {
    enabled;
    startedAt = Date.now();
    lastText = "";
    lastLineCount = 0;
    constructor(enabled = process.stderr.isTTY) {
        this.enabled = enabled;
    }
    update(options) {
        const text = formatProgressLine({
            ...options,
            startedAt: this.startedAt,
            now: Date.now()
        });
        this.updateText(text);
    }
    updateText(text) {
        if (!this.enabled) {
            this.lastText = text;
            this.lastLineCount = lineCount(text);
            return;
        }
        this.clearPreviousText();
        process.stderr.write(text);
        this.lastText = text;
        this.lastLineCount = lineCount(text);
    }
    done(message) {
        if (this.enabled && this.lastText) {
            this.clearPreviousText();
            process.stderr.write(`${message}\n`);
            this.lastText = "";
            this.lastLineCount = 0;
            return;
        }
        console.log(message);
    }
    clearPreviousText() {
        if (!this.lastText) {
            return;
        }
        process.stderr.write("\r");
        if (this.lastLineCount > 1) {
            process.stderr.write(`\x1b[${this.lastLineCount - 1}A`);
        }
        for (let index = 0; index < this.lastLineCount; index += 1) {
            process.stderr.write("\x1b[2K");
            if (index < this.lastLineCount - 1) {
                process.stderr.write("\x1b[1B");
            }
        }
        process.stderr.write("\r");
        if (this.lastLineCount > 1) {
            process.stderr.write(`\x1b[${this.lastLineCount - 1}A`);
        }
    }
}
export function formatProgressLine(options) {
    const now = options.now ?? Date.now();
    const startedAt = options.startedAt ?? now;
    const elapsedMs = Math.max(0, now - startedAt);
    const elapsedSeconds = Math.max(0.001, elapsedMs / 1000);
    const currentBytes = Math.max(0, options.currentBytes);
    const rate = currentBytes / elapsedSeconds;
    const hasTotal = typeof options.totalBytes === "number" && options.totalBytes > 0;
    const amount = hasTotal
        ? `${formatBytes(currentBytes)} / ${formatBytes(options.totalBytes)}`
        : formatBytes(currentBytes);
    const extra = options.extra ? `  ${options.extra}` : "";
    return `${options.label}  ${amount}  速度 ${formatRate(rate)}  已执行 ${formatDuration(elapsedMs)}${extra}`;
}
export function formatDuration(elapsedMs) {
    const seconds = Math.max(0, Math.round(elapsedMs / 1000));
    if (seconds < 60) {
        return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m${String(remainingSeconds).padStart(2, "0")}s`;
}
function formatRate(bytesPerSecond) {
    return `${formatBytes(bytesPerSecond).replace(/\.0(?= )/, "").replace(" ", "")}/s`;
}
export function formatProgressRate(bytes, elapsedMs) {
    const elapsedSeconds = Math.max(0.001, Math.max(0, elapsedMs) / 1000);
    return formatRate(Math.max(0, bytes) / elapsedSeconds);
}
export function formatTableProgressPercent(copiedTables, totalTables) {
    if (totalTables <= 0) {
        return "0%";
    }
    const percent = copiedTables >= totalTables ? 100 : Math.floor((Math.max(0, copiedTables) / totalTables) * 100);
    return `${percent}%`;
}
function lineCount(text) {
    return Math.max(1, text.split("\n").length);
}
//# sourceMappingURL=progress.js.map