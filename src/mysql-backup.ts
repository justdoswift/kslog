import { spawn } from "node:child_process";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

export const DEFAULT_MYSQL_PORT = 3306;
const MYSQL_COMMAND = "mysql";
const MYSQLDUMP_COMMAND = "mysqldump";

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

export function isValidDatabaseName(value: string): boolean {
  return /^[A-Za-z0-9_$]+$/.test(value);
}

export function assertDatabaseName(value: string, label = "数据库名"): void {
  if (!isValidDatabaseName(value)) {
    throw new Error(`${label} 只支持字母、数字、下划线和 $`);
  }
}

export function escapeIdentifier(value: string): string {
  assertDatabaseName(value);
  return `\`${value.replace(/`/g, "``")}\``;
}

export function escapeSqlString(value: string): string {
  return `'${value.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
}

export function buildMySqlEnv(connection: MySqlConnection, baseEnv: NodeJS.ProcessEnv = process.env): NodeJS.ProcessEnv {
  return {
    ...baseEnv,
    MYSQL_PWD: connection.password
  };
}

export function buildMysqlCommand(
  connection: Omit<MySqlConnection, "password">,
  options: { sql?: string; database?: string } = {}
): MySqlCommandSpec {
  const args = [
    "--host",
    connection.host,
    "--port",
    String(connection.port),
    "--user",
    connection.username,
    "--protocol",
    "TCP",
    "--default-character-set",
    "utf8mb4"
  ];

  if (options.sql) {
    args.push("--batch", "--skip-column-names", "--execute", options.sql);
  }

  if (options.database) {
    assertDatabaseName(options.database);
    args.push(options.database);
  }

  return { command: MYSQL_COMMAND, args };
}

export function buildMysqldumpCommand(connection: Omit<MySqlConnection, "password">, source: string): MySqlCommandSpec {
  assertDatabaseName(source, "source 数据库名");
  return {
    command: MYSQLDUMP_COMMAND,
    args: [
      "--host",
      connection.host,
      "--port",
      String(connection.port),
      "--user",
      connection.username,
      "--protocol",
      "TCP",
      "--default-character-set",
      "utf8mb4",
      "--single-transaction",
      "--triggers",
      "--events",
      "--hex-blob",
      "--column-statistics=0",
      source
    ]
  };
}

export function validateBackupPreflight(source: string, dest: string, sourceExists: boolean, destExists: boolean): void {
  assertDatabaseName(source, "source 数据库名");
  assertDatabaseName(dest, "dest 数据库名");
  if (source === dest) {
    throw new Error("source 和 dest 不能相同");
  }
  if (!sourceExists) {
    throw new Error(`source 数据库不存在：${source}`);
  }
  if (destExists) {
    throw new Error(`dest 数据库已存在：${dest}`);
  }
}

export async function backupMySqlDatabase(options: MySqlBackupOptions): Promise<MySqlBackupResult> {
  const { connection, source, dest, onProgress } = options;
  assertDatabaseName(source, "source 数据库名");
  assertDatabaseName(dest, "dest 数据库名");
  await ensureMySqlCommandsAvailable();

  const sourceExists = await databaseExists(connection, source);
  const destExists = await databaseExists(connection, dest);
  validateBackupPreflight(source, dest, sourceExists, destExists);
  const totalTables = await countTables(connection, source);
  onProgress?.({ transferredBytes: 0, copiedTables: 0, totalTables });

  const defaults = await databaseDefaults(connection, source);
  await runMysqlSql(connection, buildCreateDatabaseSql(dest, defaults));
  return dumpAndRestore(connection, source, dest, totalTables, onProgress);
}

export function buildCreateDatabaseSql(
  database: string,
  defaults: { charset: string; collation: string }
): string {
  return [
    "CREATE DATABASE",
    escapeIdentifier(database),
    "DEFAULT CHARACTER SET",
    safeSqlName(defaults.charset, "charset"),
    "DEFAULT COLLATE",
    safeSqlName(defaults.collation, "collation")
  ].join(" ");
}

async function databaseExists(connection: MySqlConnection, database: string): Promise<boolean> {
  const sql = `SELECT COUNT(*) FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = ${escapeSqlString(database)}`;
  const value = await runMysqlSql(connection, sql);
  return value.trim() === "1";
}

export async function countTables(connection: MySqlConnection, database: string): Promise<number> {
  assertDatabaseName(database);
  const sql = `SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA = ${escapeSqlString(database)}`;
  const value = await runMysqlSql(connection, sql);
  return Number(value.trim()) || 0;
}

async function databaseDefaults(
  connection: MySqlConnection,
  database: string
): Promise<{ charset: string; collation: string }> {
  const sql = [
    "SELECT DEFAULT_CHARACTER_SET_NAME, DEFAULT_COLLATION_NAME",
    "FROM information_schema.SCHEMATA",
    `WHERE SCHEMA_NAME = ${escapeSqlString(database)}`
  ].join(" ");
  const value = await runMysqlSql(connection, sql);
  const [charset, collation] = value.trim().split(/\t+/);
  return {
    charset: charset || "utf8mb4",
    collation: collation || "utf8mb4_0900_ai_ci"
  };
}

async function ensureMySqlCommandsAvailable(): Promise<void> {
  await runCommand({ command: MYSQL_COMMAND, args: ["--version"] }, undefined);
  await runCommand({ command: MYSQLDUMP_COMMAND, args: ["--version"] }, undefined);
}

async function runMysqlSql(connection: MySqlConnection, sql: string): Promise<string> {
  return runCommand(buildMysqlCommand(connection, { sql }), connection);
}

async function dumpAndRestore(
  connection: MySqlConnection,
  source: string,
  dest: string,
  totalTables: number,
  onProgress?: (progress: MySqlBackupProgress) => void
): Promise<MySqlBackupResult> {
  const dumpSpec = buildMysqldumpCommand(connection, source);
  const restoreSpec = buildMysqlCommand(connection, { database: dest });
  const env = buildMySqlEnv(connection);
  const dump = spawn(dumpSpec.command, dumpSpec.args, { env, stdio: ["ignore", "pipe", "pipe"] });
  const restore = spawn(restoreSpec.command, restoreSpec.args, { env, stdio: ["pipe", "ignore", "pipe"] });
  const dumpStderr = collectStreamText(dump.stderr);
  const restoreStderr = collectStreamText(restore.stderr);
  let transferredBytes = 0;
  let copiedTables = 0;
  const emitProgress = () => {
    onProgress?.({ transferredBytes, copiedTables, totalTables });
  };
  const poller = startTableCountPoller(connection, dest, (value) => {
    copiedTables = value;
    emitProgress();
  });

  const progress = new Transform({
    transform(chunk: Buffer, _encoding, callback) {
      transferredBytes += chunk.length;
      emitProgress();
      callback(null, chunk);
    }
  });

  try {
    const pipePromise = pipeline(dump.stdout, progress, restore.stdin);
    const [dumpResult, restoreResult] = await Promise.all([
      waitForChild(dump, MYSQLDUMP_COMMAND),
      waitForChild(restore, MYSQL_COMMAND),
      pipePromise
    ]).then(async ([dumpCode, restoreCode]) => {
      const [dumpError, restoreError] = await Promise.all([dumpStderr, restoreStderr]);
      return [
        { code: dumpCode, stderr: dumpError },
        { code: restoreCode, stderr: restoreError }
      ] as const;
    });

    copiedTables = await countTables(connection, dest);
    emitProgress();

    if (dumpResult.code !== 0) {
      throw new Error(`mysqldump 执行失败：${dumpResult.stderr.trim() || `退出码 ${dumpResult.code}`}`);
    }
    if (restoreResult.code !== 0) {
      throw new Error(`mysql 恢复失败：${restoreResult.stderr.trim() || `退出码 ${restoreResult.code}`}`);
    }

    return { transferredBytes, copiedTables, totalTables };
  } finally {
    poller.stop();
  }
}

function startTableCountPoller(
  connection: MySqlConnection,
  database: string,
  onCount: (value: number) => void
): { stop: () => void } {
  let running = false;
  const poll = async () => {
    if (running) {
      return;
    }
    running = true;
    try {
      onCount(await countTables(connection, database));
    } catch {
      // Progress polling is best-effort; the dump/restore process owns success or failure.
    } finally {
      running = false;
    }
  };
  const timer = setInterval(() => {
    void poll();
  }, 1000);
  void poll();

  return {
    stop: () => clearInterval(timer)
  };
}

async function runCommand(spec: MySqlCommandSpec, connection: MySqlConnection | undefined): Promise<string> {
  const child = spawn(spec.command, spec.args, {
    env: connection ? buildMySqlEnv(connection) : process.env,
    stdio: ["ignore", "pipe", "pipe"]
  });
  const stdout = collectStreamText(child.stdout);
  const stderr = collectStreamText(child.stderr);
  const code = await waitForChild(child, spec.command);
  const [out, err] = await Promise.all([stdout, stderr]);

  if (code !== 0) {
    throw new Error(`${spec.command} 执行失败：${err.trim() || `退出码 ${code}`}`);
  }

  return out;
}

function collectStreamText(stream: NodeJS.ReadableStream): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk: Buffer | string) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

function waitForChild(child: ReturnType<typeof spawn>, command: string): Promise<number> {
  return new Promise((resolve, reject) => {
    child.on("error", (error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") {
        reject(new Error(`找不到 ${command} 命令，请先安装 mysql-client`));
        return;
      }
      reject(error);
    });
    child.on("close", (code) => resolve(code ?? 1));
  });
}

function safeSqlName(value: string, label: string): string {
  if (!/^[A-Za-z0-9_]+$/.test(value)) {
    throw new Error(`非法 ${label}：${value}`);
  }
  return value;
}
