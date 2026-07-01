import { KubeSphereClient } from "./kubesphere-client.js";
export declare const DEFAULT_DEPENDENCY_SCAN_DIRS: string[];
export declare const DEFAULT_DEPENDENCY_TOP_LEVEL_SCAN_DIRS: string[];
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
    onProgress?: (progress: DependencyExportProgress) => void;
}
export interface DependencyExportResult {
    outputDir: string;
    appJarPath: string;
    libsDir: string;
    manifestPath: string;
    dependenciesPath: string;
    dependencyCount: number;
}
export interface DependencyExportProgress {
    stage: "download" | "parse";
    message: string;
    currentBytes?: number;
    totalBytes?: number;
    method?: "direct" | "stable";
}
export interface DependencySearchQuery {
    raw: string;
    artifactId?: string;
    version?: string;
    exactJarName?: string;
    fuzzyTerms: string[];
}
export interface DependencySearchHit {
    archivePath: string;
    entry: string;
}
export interface DependencyClassSearchQuery {
    raw: string;
    classEntry: string;
}
export interface DependencyClassSearchHit {
    archivePath: string;
    scope: "app" | "dependency";
    entry: string;
    classEntry: string;
}
export declare function buildDiscoverJarCommand(scanDirs?: string[]): string;
export declare function buildDiscoverTopLevelArchiveCommand(scanDirs?: string[]): string;
export declare function parseDependencySearchQuery(rawQuery: string): DependencySearchQuery;
export declare function dependencyEntryMatches(query: DependencySearchQuery, entry: string): boolean;
export declare function parseDependencyClassSearchQuery(rawQuery: string): DependencyClassSearchQuery;
export declare function dependencyClassEntryMatches(query: DependencyClassSearchQuery, entry: string): boolean;
export declare function buildListArchiveEntriesCommand(archivePath: string): string;
export declare function buildSearchClassInArchiveCommand(archivePath: string, classEntry: string): string;
export declare function parseJarCandidateLines(output: string): JarCandidate[];
export declare function jarPathFromJavaArgs(args: string[], cwd?: string): string | undefined;
export declare function sortJarCandidates(candidates: JarCandidate[]): JarCandidate[];
export declare function buildDependencyOutputDir(homeDir: string, target: Pick<DependencyTarget, "namespace" | "workload">, date?: Date): string;
export declare function discoverJarCandidates(client: KubeSphereClient, target: Omit<DependencyTarget, "workload">): Promise<JarCandidate[]>;
export declare function searchDependencyInArchive(options: {
    client: KubeSphereClient;
    target: Omit<DependencyTarget, "workload">;
    archivePath: string;
    query: DependencySearchQuery;
}): Promise<DependencySearchHit[]>;
export declare function searchClassInArchive(options: {
    client: KubeSphereClient;
    target: Omit<DependencyTarget, "workload">;
    archivePath: string;
    query: DependencyClassSearchQuery;
}): Promise<DependencyClassSearchHit[]>;
export declare function runReadOnlyExecWithRetry<T>(operation: () => Promise<T>, options?: {
    attempts?: number;
    delayMs?: number;
}): Promise<T>;
export declare function exportJavaDependencies(options: DependencyExportOptions): Promise<DependencyExportResult>;
export declare function downloadRemoteFile(options: {
    client: KubeSphereClient;
    target: Omit<DependencyTarget, "workload">;
    remotePath: string;
    outputPath: string;
    onProgress?: (progress: {
        currentBytes: number;
        totalBytes?: number;
        method: "direct" | "stable";
    }) => void;
}): Promise<void>;
export declare function extractDependencyJars(appJarPath: string, libsDir: string): Promise<DependencyJarInfo[]>;
export declare function readMavenCoordinates(jarPath: string): Promise<{
    groupId?: string;
    artifactId?: string;
    version?: string;
}>;
export declare function parsePomProperties(text: string): {
    groupId?: string;
    artifactId?: string;
    version?: string;
};
export declare function formatDependenciesText(manifest: DependencyManifest): string;
export declare function buildDependencyManifest(options: {
    target: DependencyTarget;
    remoteJarPath: string;
    appJarPath: string;
    appJarFileName: string;
    appStats: {
        size: number;
        sha256: string;
    };
    dependencies: DependencyJarInfo[];
}): DependencyManifest;
