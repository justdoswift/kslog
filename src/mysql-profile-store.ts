import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import type { MySqlProfile, MySqlProfilesFile } from "./types.js";

const CONFIG_DIR = ".bosscli";
const CONFIG_FILE = "mysql-profiles.json";

export function defaultMySqlProfilesPath(homeDir = os.homedir()): string {
  return path.join(homeDir, CONFIG_DIR, CONFIG_FILE);
}

export async function readMySqlProfiles(filePath = defaultMySqlProfilesPath()): Promise<MySqlProfilesFile> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as MySqlProfilesFile;

    if (!Array.isArray(parsed.profiles)) {
      throw new Error("profiles 字段必须是数组");
    }

    return {
      defaultProfile: parsed.defaultProfile,
      profiles: parsed.profiles
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { profiles: [] };
    }

    throw new Error(`读取 MySQL profile 配置失败：${(error as Error).message}`);
  }
}

export async function writeMySqlProfiles(
  profilesFile: MySqlProfilesFile,
  filePath = defaultMySqlProfilesPath()
): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true, mode: 0o700 });
  await fs.writeFile(filePath, `${JSON.stringify(profilesFile, null, 2)}\n`, {
    encoding: "utf8",
    mode: 0o600
  });
  await fs.chmod(filePath, 0o600);
}

export async function upsertMySqlProfile(
  input: {
    name: string;
    host: string;
    port: number;
    username: string;
    password: string;
    setDefault?: boolean;
  },
  filePath = defaultMySqlProfilesPath()
): Promise<MySqlProfile> {
  const name = input.name.trim();
  if (!name) {
    throw new Error("MySQL profile name 不能为空");
  }
  if (!input.host.trim()) {
    throw new Error("MySQL host 不能为空");
  }
  if (!input.username.trim()) {
    throw new Error("MySQL username 不能为空");
  }

  const config = await readMySqlProfiles(filePath);
  const now = new Date().toISOString();
  const existing = config.profiles.find((profile) => profile.name === name);
  const profile: MySqlProfile = {
    name,
    host: input.host.trim(),
    port: input.port,
    username: input.username.trim(),
    password: input.password,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now
  };

  if (existing) {
    Object.assign(existing, profile);
  } else {
    config.profiles.push(profile);
  }

  if (input.setDefault ?? config.profiles.length === 1) {
    config.defaultProfile = name;
  }

  await writeMySqlProfiles(config, filePath);
  return profile;
}

export function chooseDefaultMySqlProfile(config: MySqlProfilesFile): MySqlProfile | undefined {
  if (config.defaultProfile) {
    const defaultProfile = config.profiles.find((profile) => profile.name === config.defaultProfile);
    if (defaultProfile) {
      return defaultProfile;
    }
  }

  return config.profiles[0];
}

export function getMySqlProfile(config: MySqlProfilesFile, name: string): MySqlProfile | undefined {
  return config.profiles.find((profile) => profile.name === name);
}
