import { formatBytes } from "./utils.js";
export class ProgressBar {
    enabled;
    startedAt = Date.now();
    lastText = "";
    constructor(enabled = process.stderr.isTTY) {
        this.enabled = enabled;
    }
    update(options) {
        const text = formatProgressLine({
            ...options,
            startedAt: this.startedAt,
            now: Date.now()
        });
        if (!this.enabled) {
            this.lastText = text;
            return;
        }
        process.stderr.write(`\r${text.padEnd(this.lastText.length)}`);
        this.lastText = text;
    }
    done(message) {
        if (this.enabled && this.lastText) {
            process.stderr.write(`\r${message.padEnd(this.lastText.length)}\n`);
            this.lastText = "";
            return;
        }
        console.log(message);
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
//# sourceMappingURL=progress.js.map