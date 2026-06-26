export interface ProgressRenderOptions {
    label: string;
    currentBytes: number;
    totalBytes?: number;
    startedAt?: number;
    now?: number;
    extra?: string;
}
export declare class ProgressBar {
    private readonly enabled;
    private readonly startedAt;
    private lastText;
    private lastLineCount;
    constructor(enabled?: boolean);
    update(options: Omit<ProgressRenderOptions, "startedAt" | "now">): void;
    updateText(text: string): void;
    done(message: string): void;
    private clearPreviousText;
}
export declare function formatProgressLine(options: ProgressRenderOptions): string;
export declare function formatDuration(elapsedMs: number): string;
export declare function formatProgressRate(bytes: number, elapsedMs: number): string;
export declare function formatTableProgressPercent(copiedTables: number, totalTables: number): string;
