import type { MySqlProfile, MySqlProfilesFile } from "./types.js";
export declare function defaultMySqlProfilesPath(homeDir?: string): string;
export declare function readMySqlProfiles(filePath?: string): Promise<MySqlProfilesFile>;
export declare function writeMySqlProfiles(profilesFile: MySqlProfilesFile, filePath?: string): Promise<void>;
export declare function upsertMySqlProfile(input: {
    name: string;
    host: string;
    port: number;
    username: string;
    password: string;
    setDefault?: boolean;
}, filePath?: string): Promise<MySqlProfile>;
export declare function chooseDefaultMySqlProfile(config: MySqlProfilesFile): MySqlProfile | undefined;
export declare function getMySqlProfile(config: MySqlProfilesFile, name: string): MySqlProfile | undefined;
