import type { LexiangProfile, LexiangProfilesFile } from "./types.js";
export declare function defaultLexiangProfilesPath(homeDir?: string): string;
export declare function readLexiangProfiles(filePath?: string): Promise<LexiangProfilesFile>;
export declare function writeLexiangProfiles(profilesFile: LexiangProfilesFile, filePath?: string): Promise<void>;
export declare function upsertLexiangProfile(input: {
    name: string;
    baseUrl: string;
    appid: string;
    appkey: string;
    taxPayerNo: string;
    version?: string;
    setDefault?: boolean;
}, filePath?: string): Promise<LexiangProfile>;
export declare function chooseDefaultLexiangProfile(config: LexiangProfilesFile): LexiangProfile | undefined;
