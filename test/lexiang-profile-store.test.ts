import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  chooseDefaultLexiangProfile,
  defaultLexiangProfilesPath,
  readLexiangProfiles,
  upsertLexiangProfile
} from "../src/lexiang-profile-store.js";

describe("lexiang profile store", () => {
  let dir: string;
  let filePath: string;

  beforeEach(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), "bosscli-lexiang-profile-"));
    filePath = path.join(dir, "lexiang-profiles.json");
  });

  afterEach(async () => {
    await fs.rm(dir, { recursive: true, force: true });
  });

  it("builds the default profile path", () => {
    expect(defaultLexiangProfilesPath("/tmp/home")).toBe("/tmp/home/.bosscli/lexiang-profiles.json");
  });

  it("creates and reads profiles with 0600 permissions", async () => {
    await upsertLexiangProfile(
      {
        name: "医疗测试",
        baseUrl: "lexiang.example.com",
        appid: "app1",
        appkey: "secret-key",
        taxPayerNo: "91350100731844207Y",
        setDefault: true
      },
      filePath
    );

    const config = await readLexiangProfiles(filePath);
    const stat = await fs.stat(filePath);

    expect(config.defaultProfile).toBe("医疗测试");
    expect(config.profiles[0]).toMatchObject({
      name: "医疗测试",
      baseUrl: "http://lexiang.example.com",
      appid: "app1",
      appkey: "secret-key",
      taxPayerNo: "91350100731844207Y",
      version: "1.0"
    });
    expect(stat.mode & 0o777).toBe(0o600);
  });

  it("updates existing profiles and chooses defaults", async () => {
    await upsertLexiangProfile(
      {
        name: "医疗测试",
        baseUrl: "http://old.example.com",
        appid: "app1",
        appkey: "old",
        taxPayerNo: "old-tax"
      },
      filePath
    );
    await upsertLexiangProfile(
      {
        name: "医疗测试",
        baseUrl: "https://new.example.com",
        appid: "app2",
        appkey: "new",
        taxPayerNo: "new-tax",
        version: "1.1"
      },
      filePath
    );

    const config = await readLexiangProfiles(filePath);

    expect(config.profiles).toHaveLength(1);
    expect(chooseDefaultLexiangProfile(config)).toMatchObject({
      name: "医疗测试",
      baseUrl: "https://new.example.com",
      appid: "app2",
      appkey: "new",
      taxPayerNo: "new-tax",
      version: "1.1"
    });
  });

  it("returns an empty config when no profile exists", async () => {
    await expect(readLexiangProfiles(filePath)).resolves.toEqual({ profiles: [] });
  });
});
