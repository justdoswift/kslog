import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  buildLogFileName,
  cookieHeaderFromJar,
  defaultOutputDir,
  encryptPassword,
  normalizeBaseUrl,
  parseSetCookieHeaders,
  sanitizeFileName,
  selectorToString,
  shellQuote,
  timestampForFile
} from "../src/utils.js";

describe("utils", () => {
  it("normalizes KubeSphere base URLs", () => {
    expect(normalizeBaseUrl("192.168.7.191:30880/")).toBe("http://192.168.7.191:30880");
    expect(normalizeBaseUrl("https://example.com/foo?bar=baz")).toBe("https://example.com/foo");
  });

  it("matches the KubeSphere frontend password encryption algorithm", () => {
    expect(encryptPassword("kubesphere", "P@88w0rd")).toBe("MDAxMTAwMTAxMDAw@`]QLa\\enjiSA");
  });

  it("parses and serializes cookies", () => {
    const jar = parseSetCookieHeaders([
      "token=abc.def; path=/; httponly",
      "refreshToken=xyz; path=/; httponly"
    ]);

    expect(cookieHeaderFromJar(jar)).toBe("token=abc.def; refreshToken=xyz");
  });

  it("builds Kubernetes label selectors", () => {
    expect(selectorToString({ app: "tax-invoice-business-server", tier: "backend" })).toBe(
      "app=tax-invoice-business-server,tier=backend"
    );
  });

  it("sanitizes log filenames", () => {
    expect(sanitizeFileName("tax/digital:server*")).toBe("tax_digital_server");
  });

  it("creates stable timestamps and output paths", () => {
    const date = new Date("2026-06-24T09:02:03");

    expect(timestampForFile(date)).toBe("20260624_090203");
    expect(buildLogFileName("tax-digital", "svc/name", "pod:one", date)).toBe(
      "tax-digital_svc_name_pod_one_20260624_090203.log"
    );
    expect(defaultOutputDir(os.homedir())).toBe(path.join(os.homedir(), "Downloads", "bosscli", "kubesphere-logs"));
  });

  it("quotes shell arguments safely", () => {
    expect(shellQuote("/opt/saas-logs/a'b.log")).toBe("'/opt/saas-logs/a'\\''b.log'");
  });
});
