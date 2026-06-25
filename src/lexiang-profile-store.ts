import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { DEFAULT_LEXIANG_VERSION } from "./lexiang.js";
import type { LexiangProfile, LexiangProfilesFile } from "./types.js";
import { normalizeBaseUrl } from "./utils.js";

const CONFIG_DIR = ".bosscli";
const CONFIG_FILE = "lexiang-profiles.json";

export function defaultLexiangProfilesPath(homeDir = os.homedir()): string {
  return path.join(homeDir, CONFIG_DIR, CONFIG_FILE);
}

export async function readLexiangProfiles(
  filePath = defaultLexiangProfilesPath()
): Promise<LexiangProfilesFile> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as LexiangProfilesFile;
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
    throw new Error(`读取乐享 profile 配置失败：${(error as Error).message}`);
  }
}

export async function writeLexiangProfiles(
  profilesFile: LexiangProfilesFile,
  filePath = defaultLexiangProfilesPath()
): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true, mode: 0o700 });
  await fs.writeFile(filePath, `${JSON.stringify(profilesFile, null, 2)}\n`, {
    encoding: "utf8",
    mode: 0o600
  });
  await fs.chmod(filePath, 0o600);
}

export async function upsertLexiangProfile(
  input: {
    name: string;
    baseUrl: string;
    appid: string;
    appkey: string;
    taxPayerNo: string;
    version?: string;
    setDefault?: boolean;
  },
  filePath = defaultLexiangProfilesPath()
): Promise<LexiangProfile> {
  const name = input.name.trim();
  if (!name) {
    throw new Error("乐享 profile name 不能为空");
  }
  if (!input.appid.trim()) {
    throw new Error("appid 不能为空");
  }
  if (!input.appkey) {
    throw new Error("appkey 不能为空");
  }
  if (!input.taxPayerNo.trim()) {
    throw new Error("taxPayerNo 不能为空");
  }

  const config = await readLexiangProfiles(filePath);
  const now = new Date().toISOString();
  const existing = config.profiles.find((profile) => profile.name === name);
  const profile: LexiangProfile = {
    name,
    baseUrl: normalizeBaseUrl(input.baseUrl),
    appid: input.appid.trim(),
    appkey: input.appkey,
    taxPayerNo: input.taxPayerNo.trim(),
    version: input.version?.trim() || DEFAULT_LEXIANG_VERSION,
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

  await writeLexiangProfiles(config, filePath);
  return profile;
}

export function chooseDefaultLexiangProfile(config: LexiangProfilesFile): LexiangProfile | undefined {
  if (config.defaultProfile) {
    const defaultProfile = config.profiles.find((profile) => profile.name === config.defaultProfile);
    if (defaultProfile) {
      return defaultProfile;
    }
  }
  return config.profiles[0];
}
