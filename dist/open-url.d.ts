export interface OpenCommand {
    command: string;
    args: string[];
}
export interface OpenUrlOptions {
    platform?: NodeJS.Platform;
    runner?: (command: OpenCommand) => Promise<void>;
}
export declare function commandForOpenUrl(url: string, platform?: NodeJS.Platform): OpenCommand;
export declare function openUrl(url: string, options?: OpenUrlOptions): Promise<void>;
