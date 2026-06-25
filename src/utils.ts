import path from "node:path";

import type { CookieJar } from "./types.js";

export function normalizeBaseUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) {
    throw new Error("KubeSphere 地址不能为空");
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`;
  const url = new URL(withProtocol);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("KubeSphere 地址只支持 http 或 https");
  }

  url.pathname = url.pathname.replace(/\/+$/, "");
  url.search = "";
  url.hash = "";

  return url.toString().replace(/\/$/, "");
}

export function joinUrl(baseUrl: string, apiPath: string): string {
  const normalizedPath = apiPath.startsWith("/") ? apiPath : `/${apiPath}`;
  return `${baseUrl}${normalizedPath}`;
}

export function encryptPassword(encryptKey: string, password: string): string {
  let key = encryptKey || "kubesphere";
  const encodedPassword = Buffer.from(password, "utf8").toString("base64");

  if (encodedPassword.length > key.length) {
    key += encodedPassword.slice(0, encodedPassword.length - key.length);
  }

  const oddEvenBits: string[] = [];
  const mixedChars: string[] = [];

  for (let index = 0; index < key.length; index += 1) {
    const passwordCharCode =
      encodedPassword.length > index ? encodedPassword.charCodeAt(index) : 64;
    const combined = key.charCodeAt(index) + passwordCharCode;

    oddEvenBits.push(combined % 2 === 0 ? "0" : "1");
    mixedChars.push(String.fromCharCode(Math.floor(combined / 2)));
  }

  return `${Buffer.from(oddEvenBits.join(""), "utf8").toString("base64")}@${mixedChars.join("")}`;
}

export function parseSetCookieHeaders(setCookieHeaders: string[]): CookieJar {
  const jar: CookieJar = new Map();

  for (const header of setCookieHeaders) {
    const firstPart = header.split(";")[0];
    const separatorIndex = firstPart.indexOf("=");

    if (separatorIndex <= 0) {
      continue;
    }

    const name = firstPart.slice(0, separatorIndex).trim();
    const value = firstPart.slice(separatorIndex + 1).trim();

    if (name) {
      jar.set(name, value);
    }
  }

  return jar;
}

export function mergeCookieJar(target: CookieJar, source: CookieJar): void {
  for (const [name, value] of source) {
    target.set(name, value);
  }
}

export function cookieHeaderFromJar(jar: CookieJar): string {
  return [...jar.entries()].map(([name, value]) => `${name}=${value}`).join("; ");
}

export function selectorToString(selector: Record<string, string>): string {
  return Object.entries(selector)
    .filter(([key, value]) => key && value)
    .map(([key, value]) => `${key}=${value}`)
    .join(",");
}

export function sanitizeFileName(value: string): string {
  const sanitized = value
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");

  return sanitized || "log";
}

export function timestampForFile(date = new Date()): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    "_",
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds())
  ].join("");
}

export function defaultOutputDir(homeDir: string): string {
  return path.join(homeDir, "Downloads", "bosscli", "kubesphere-logs");
}

export function buildLogFileName(namespace: string, service: string, pod: string, date = new Date()): string {
  return `${sanitizeFileName(namespace)}_${sanitizeFileName(service)}_${sanitizeFileName(pod)}_${timestampForFile(date)}.log`;
}

export function shellQuote(value: string): string {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KiB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MiB`;
}
