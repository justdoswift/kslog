import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  chooseDefaultMySqlProfile,
  defaultMySqlProfilesPath,
  getMySqlProfile,
  readMySqlProfiles,
  upsertMySqlProfile
} from "../src/mysql-profile-store.js";

describe("mysql profile store", () => {
  let dir: string;
  let filePath: string;

  beforeEach(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), "bosscli-mysql-profile-"));
    filePath = path.join(dir, "mysql-profiles.json");
  });

  afterEach(async () => {
    await fs.rm(dir, { recursive: true, force: true });
  });

  it("builds the default profile path", () => {
    expect(defaultMySqlProfilesPath("/tmp/home")).toBe("/tmp/home/.bosscli/mysql-profiles.json");
  });

  it("creates and reads profiles with 0600 permissions", async () => {
    await upsertMySqlProfile(
      {
        name: "开发数据库",
        host: "192.168.7.182",
        port: 3306,
        username: "root",
        password: "secret",
        setDefault: true
      },
      filePath
    );

    const config = await readMySqlProfiles(filePath);
    const stat = await fs.stat(filePath);

    expect(config.defaultProfile).toBe("开发数据库");
    expect(config.profiles[0]).toMatchObject({
      name: "开发数据库",
      host: "192.168.7.182",
      port: 3306,
      username: "root",
      password: "secret"
    });
    expect(stat.mode & 0o777).toBe(0o600);
  });

  it("updates existing profiles and chooses defaults", async () => {
    await upsertMySqlProfile(
      {
        name: "开发数据库",
        host: "old.mysql",
        port: 3306,
        username: "root",
        password: "old"
      },
      filePath
    );
    await upsertMySqlProfile(
      {
        name: "开发数据库",
        host: "new.mysql",
        port: 3307,
        username: "admin",
        password: "new"
      },
      filePath
    );

    const config = await readMySqlProfiles(filePath);

    expect(config.profiles).toHaveLength(1);
    expect(chooseDefaultMySqlProfile(config)).toMatchObject({
      name: "开发数据库",
      host: "new.mysql",
      port: 3307,
      username: "admin",
      password: "new"
    });
    expect(getMySqlProfile(config, "开发数据库")?.host).toBe("new.mysql");
  });

  it("allows empty passwords for local MySQL profiles", async () => {
    await upsertMySqlProfile(
      {
        name: "本地数据库",
        host: "localhost",
        port: 3307,
        username: "root",
        password: ""
      },
      filePath
    );

    const config = await readMySqlProfiles(filePath);

    expect(config.profiles[0]?.password).toBe("");
  });

  it("returns an empty config when no profile exists", async () => {
    await expect(readMySqlProfiles(filePath)).resolves.toEqual({ profiles: [] });
  });
});
