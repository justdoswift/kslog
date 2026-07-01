import { KubeSphereClient } from "./kubesphere-client.js";
export declare const DEFAULT_DEPENDENCY_SCAN_DIRS: string[];
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
    onProgress?: (message: string) => void;
}
export interface DependencyExportResult {
    outputDir: string;
    appJarPath: string;
    libsDir: string;
    manifestPath: string;
    dependenciesPath: string;
    dependencyCount: number;
}
export declare function buildDiscoverJarCommand(scanDirs?: string[]): string;
export declare function parseJarCandidateLines(output: string): JarCandidate[];
export declare function jarPathFromJavaArgs(args: string[], cwd?: string): string | undefined;
export declare function sortJarCandidates(candidates: JarCandidate[]): JarCandidate[];
export declare function buildDependencyOutputDir(homeDir: string, target: Pick<DependencyTarget, "namespace" | "workload">, date?: Date): string;
export declare function discoverJarCandidates(client: KubeSphereClient, target: Omit<DependencyTarget, "workload">): Promise<JarCandidate[]>;
export declare function exportJavaDependencies(options: DependencyExportOptions): Promise<DependencyExportResult>;
export declare function downloadRemoteFile(options: {
    client: KubeSphereClient;
    target: Omit<DependencyTarget, "workload">;
    remotePath: string;
    outputPath: string;
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
