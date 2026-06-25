import { createHash, randomUUID } from "node:crypto";

import { LEXIANG_MEDICAL_INTERFACES } from "./lexiang-medical-snapshot.js";
import type { JsonValue, LexiangBusinessPayload, LexiangInterfaceInfo, LexiangProfile } from "./types.js";
import { joinUrl, normalizeBaseUrl, shellQuote } from "./utils.js";

export const DEFAULT_LEXIANG_VERSION = "1.0";

export interface LexiangRequestBody {
  data: string;
  noise: string;
  version: string;
  sign: string;
}

export function listLexiangInterfaces(): LexiangInterfaceInfo[] {
  return [...LEXIANG_MEDICAL_INTERFACES];
}

export function findLexiangInterfaceByPath(path: string): LexiangInterfaceInfo | undefined {
  return LEXIANG_MEDICAL_INTERFACES.find((api) => api.path === path);
}

export function formatLexiangInterfaceChoice(api: LexiangInterfaceInfo): string {
  const category = api.category ? `${api.category}  ` : "";
  return `${category}${api.name}  ${api.path}`;
}

export function formatLexiangTemplateSummary(api: LexiangInterfaceInfo): string {
  const requiredCount = api.fields.filter((field) => field.required === "是").length;
  return [
    `文档模板：${api.sourceDoc} / ${api.sectionTitle}`,
    `字段：${api.fields.length} 个，必填：${requiredCount} 个`
  ].join("\n");
}

export function parseLexiangBusinessPayloadJson(value: string): LexiangBusinessPayload {
  const parsed = JSON.parse(value) as JsonValue;
  if (!isJsonObject(parsed)) {
    throw new Error("业务参数必须是 JSON object");
  }
  return parsed as LexiangBusinessPayload;
}

export function buildLexiangBusinessPayloadDefault(
  api: LexiangInterfaceInfo,
  taxPayerNo: string
): LexiangBusinessPayload {
  return fillBusinessDefaults(cloneJson(api.template), taxPayerNo) as LexiangBusinessPayload;
}

export function encodeLexiangData(payload: LexiangBusinessPayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64");
}

export function generateLexiangNoise(): string {
  return randomUUID().replace(/-/g, "");
}

export function buildLexiangSign(input: {
  appid: string;
  appkey: string;
  data: string;
  noise: string;
  version: string;
}): string {
  return createHash("sm3").update(buildLexiangSignString(input), "utf8").digest("hex").toUpperCase();
}

export function buildLexiangSignString(input: {
  appid: string;
  appkey: string;
  data: string;
  noise: string;
  version: string;
}): string {
  return [
    `appid=${input.appid}`,
    `data=${input.data}`,
    `noise=${input.noise}`,
    `key=${input.appkey}`,
    `version=${input.version}`
  ].join("&");
}

export function buildLexiangRequestBody(input: {
  profile: Pick<LexiangProfile, "appid" | "appkey" | "version">;
  businessPayload: LexiangBusinessPayload;
  noise?: string;
}): LexiangRequestBody {
  const data = encodeLexiangData(input.businessPayload);
  const noise = input.noise ?? generateLexiangNoise();
  const version = input.profile.version || DEFAULT_LEXIANG_VERSION;
  const sign = buildLexiangSign({
    appid: input.profile.appid,
    appkey: input.profile.appkey,
    data,
    noise,
    version
  });
  return {
    data,
    noise,
    version,
    sign
  };
}

export function buildLexiangCurl(input: {
  profile: Pick<LexiangProfile, "baseUrl" | "appid" | "appkey" | "taxPayerNo" | "version">;
  api: LexiangInterfaceInfo;
  businessPayload: LexiangBusinessPayload;
  noise?: string;
}): string {
  const body = buildLexiangRequestBody({
    profile: input.profile,
    businessPayload: input.businessPayload,
    noise: input.noise
  });
  const endpoint = joinUrl(normalizeBaseUrl(input.profile.baseUrl), input.api.path);
  const formattedBody = JSON.stringify(body, null, 2);
  return [
    `curl ${shellQuote(endpoint)} \\`,
    `  -H ${shellQuote("Content-Type: application/json")} \\`,
    `  -H ${shellQuote(`X-AppId: ${input.profile.appid}`)} \\`,
    `  -H ${shellQuote(`X-TaxPayerNo: ${input.profile.taxPayerNo}`)} \\`,
    `  --data-raw ${shellQuote(formattedBody)}`
  ].join("\n");
}

function fillBusinessDefaults(value: JsonValue, taxPayerNo: string, key?: string): JsonValue {
  if (key && ["nsrsbh", "xsfnsrsbh", "fqfnsrsbh"].includes(key)) {
    return taxPayerNo;
  }

  if (Array.isArray(value)) {
    return value.map((item) => fillBusinessDefaults(item, taxPayerNo));
  }

  if (isJsonObject(value)) {
    const result: Record<string, JsonValue> = {};
    for (const [childKey, childValue] of Object.entries(value)) {
      result[childKey] = fillBusinessDefaults(childValue, taxPayerNo, childKey);
    }
    return result;
  }

  return value;
}

function cloneJson<T extends JsonValue>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isJsonObject(value: JsonValue): value is Record<string, JsonValue> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
