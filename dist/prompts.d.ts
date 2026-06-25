import type { DateSelection, HistoryLogFile, KubeTarget, LeqiAction, LeqiApiInfo, LogRange, LogSource, PodSummary, SavedProfile } from "./types.js";
export declare const DEFAULT_NAMESPACE = "tax-digital";
export interface ConnectionAnswers {
    baseUrl: string;
    username: string;
    password: string;
    insecure?: boolean;
}
export type WorkctlFeature = "logs" | "leqi";
export type ProfileChoice = {
    kind: "saved";
    profile: SavedProfile;
} | {
    kind: "new";
};
export declare function chooseSavedProfile(profiles: SavedProfile[], defaultProfile?: string): Promise<ProfileChoice>;
export declare function promptConnection(defaults: Partial<ConnectionAnswers>): Promise<ConnectionAnswers>;
export declare function promptNewProfileName(existingNames: string[]): Promise<string>;
export declare function preferredNamespace(namespaces: string[], preferred?: string): string | undefined;
export declare function chooseWorkctlFeature(): Promise<WorkctlFeature>;
export declare function chooseNamespace(namespaces: string[], provided?: string): Promise<string>;
export declare function chooseTarget(targets: KubeTarget[], provided?: string): Promise<KubeTarget>;
export declare function formatTargetChoice(target: KubeTarget): string;
export declare function choosePod(pods: PodSummary[], provided?: string): Promise<PodSummary>;
export declare function chooseContainer(containers: string[], provided?: string): Promise<string>;
export declare function chooseLogRange(options: {
    tailLines?: number;
    sinceMinutes?: number;
    all?: boolean;
}): Promise<LogRange>;
export declare function chooseLogSource(provided?: LogSource): Promise<LogSource>;
export declare function chooseLeqiApi(apis: LeqiApiInfo[], provided?: string): Promise<LeqiApiInfo>;
export declare function chooseLeqiAction(provided?: LeqiAction): Promise<LeqiAction>;
export declare function promptLeqiReqDto(provided?: string): Promise<Record<string, unknown>>;
export declare function chooseDateSelection(options: {
    date?: string;
    from?: string;
    to?: string;
    recentDays?: number;
}): Promise<DateSelection>;
export declare function chooseHistoryFiles(files: HistoryLogFile[]): Promise<HistoryLogFile[]>;
export declare function buildOutputPath(options: {
    namespace: string;
    service: string;
    pod: string;
    outputDir?: string;
}): Promise<string>;
