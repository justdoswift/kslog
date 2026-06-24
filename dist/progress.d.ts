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
    constructor(enabled?: boolean);
    update(options: Omit<ProgressRenderOptions, "startedAt" | "now">): void;
    done(message: string): void;
}
export declare function formatProgressLine(options: ProgressRenderOptions): string;
