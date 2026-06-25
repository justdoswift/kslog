import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
const CONFIG_DIR = ".bosscli";
const CONFIG_FILE = "mysql-profiles.json";
export function defaultMySqlProfilesPath(homeDir = os.homedir()) {
    return path.join(homeDir, CONFIG_DIR, CONFIG_FILE);
}
export async function readMySqlProfiles(filePath = defaultMySqlProfilesPath()) {
    try {
        const raw = await fs.readFile(filePath, "utf8");
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed.profiles)) {
            throw new Error("profiles 字段必须是数组");
        }
        return {
            defaultProfile: parsed.defaultProfile,
            profiles: parsed.profiles
        };
    }
    catch (error) {
        if (error.code === "ENOENT") {
            return { profiles: [] };
        }
        throw new Error(`读取 MySQL profile 配置失败：${error.message}`);
    }
}
export async function writeMySqlProfiles(profilesFile, filePath = defaultMySqlProfilesPath()) {
    await fs.mkdir(path.dirname(filePath), { recursive: true, mode: 0o700 });
    await fs.writeFile(filePath, `${JSON.stringify(profilesFile, null, 2)}\n`, {
        encoding: "utf8",
        mode: 0o600
    });
    await fs.chmod(filePath, 0o600);
}
export async function upsertMySqlProfile(input, filePath = defaultMySqlProfilesPath()) {
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
    const profile = {
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
    }
    else {
        config.profiles.push(profile);
    }
    if (input.setDefault ?? config.profiles.length === 1) {
        config.defaultProfile = name;
    }
    await writeMySqlProfiles(config, filePath);
    return profile;
}
export function chooseDefaultMySqlProfile(config) {
    if (config.defaultProfile) {
        const defaultProfile = config.profiles.find((profile) => profile.name === config.defaultProfile);
        if (defaultProfile) {
            return defaultProfile;
        }
    }
    return config.profiles[0];
}
export function getMySqlProfile(config, name) {
    return config.profiles.find((profile) => profile.name === name);
}
//# sourceMappingURL=mysql-profile-store.js.map