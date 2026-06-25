export declare const DEFAULT_MYSQL_PORT = 3306;
export interface MySqlConnection {
    host: string;
    port: number;
    username: string;
    password: string;
}
export interface MySqlCommandSpec {
    command: string;
    args: string[];
}
export interface MySqlBackupResult {
    transferredBytes: number;
    copiedTables: number;
    totalTables: number;
}
export interface MySqlBackupProgress {
    transferredBytes: number;
    copiedTables: number;
    totalTables: number;
}
export interface MySqlBackupOptions {
    connection: MySqlConnection;
    source: string;
    dest: string;
    onProgress?: (progress: MySqlBackupProgress) => void;
}
export declare function isValidDatabaseName(value: string): boolean;
export declare function assertDatabaseName(value: string, label?: string): void;
export declare function escapeIdentifier(value: string): string;
export declare function escapeSqlString(value: string): string;
export declare function buildMySqlEnv(connection: MySqlConnection, baseEnv?: NodeJS.ProcessEnv): NodeJS.ProcessEnv;
export declare function buildMysqlCommand(connection: Omit<MySqlConnection, "password">, options?: {
    sql?: string;
    database?: string;
}): MySqlCommandSpec;
export declare function buildMysqldumpCommand(connection: Omit<MySqlConnection, "password">, source: string): MySqlCommandSpec;
export declare function validateBackupPreflight(source: string, dest: string, sourceExists: boolean, destExists: boolean): void;
export declare function backupMySqlDatabase(options: MySqlBackupOptions): Promise<MySqlBackupResult>;
export declare function buildCreateDatabaseSql(database: string, defaults: {
    charset: string;
    collation: string;
}): string;
export declare function countTables(connection: MySqlConnection, database: string): Promise<number>;
