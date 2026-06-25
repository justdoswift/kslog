import { createHash, randomUUID } from "node:crypto";
import { LEXIANG_GENERAL_INTERFACES } from "./lexiang-general-snapshot.js";
import { LEXIANG_MEDICAL_INTERFACES } from "./lexiang-medical-snapshot.js";
import { joinUrl, normalizeBaseUrl, shellQuote } from "./utils.js";
export const DEFAULT_LEXIANG_VERSION = "1.0";
const LEXIANG_CATALOGS = [
    {
        value: "general",
        name: "通用",
        description: "销项通用接口",
        interfaces: LEXIANG_GENERAL_INTERFACES
    },
    {
        value: "medical",
        name: "医疗",
        description: "医疗接口",
        interfaces: LEXIANG_MEDICAL_INTERFACES
    }
];
export function listLexiangCatalogs() {
    return LEXIANG_CATALOGS.map((catalog) => ({ ...catalog }));
}
export function listLexiangInterfaces(catalog = "medical") {
    return [...getLexiangCatalog(catalog).interfaces];
}
export function findLexiangInterfaceByPath(path, catalog = "medical") {
    return getLexiangCatalog(catalog).interfaces.find((api) => api.path === path);
}
export function formatLexiangInterfaceChoice(api) {
    const category = api.category ? `${api.category}  ` : "";
    return `${category}${api.name}  ${api.path}`;
}
export function formatLexiangTemplateSummary(api) {
    const requiredCount = api.fields.filter((field) => field.required === "是").length;
    return [
        `文档模板：${api.sourceDoc} / ${api.sectionTitle}`,
        `字段：${api.fields.length} 个，必填：${requiredCount} 个`
    ].join("\n");
}
export function parseLexiangBusinessPayloadJson(value) {
    const parsed = JSON.parse(value);
    if (!isJsonObject(parsed)) {
        throw new Error("业务参数必须是 JSON object");
    }
    return parsed;
}
export function buildLexiangBusinessPayloadDefault(api, taxPayerNo) {
    return fillBusinessDefaults(cloneJson(api.template), taxPayerNo);
}
export function encodeLexiangData(payload) {
    return Buffer.from(JSON.stringify(payload), "utf8").toString("base64");
}
export function generateLexiangNoise() {
    return randomUUID().replace(/-/g, "");
}
export function buildLexiangSign(input) {
    return createHash("sm3").update(buildLexiangSignString(input), "utf8").digest("hex").toUpperCase();
}
export function buildLexiangSignString(input) {
    return [
        `appid=${input.appid}`,
        `data=${input.data}`,
        `noise=${input.noise}`,
        `key=${input.appkey}`,
        `version=${input.version}`
    ].join("&");
}
export function buildLexiangRequestBody(input) {
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
export function buildLexiangCurl(input) {
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
function fillBusinessDefaults(value, taxPayerNo, key) {
    if (key && ["nsrsbh", "xsfnsrsbh", "fqfnsrsbh"].includes(key)) {
        return taxPayerNo;
    }
    if (Array.isArray(value)) {
        return value.map((item) => fillBusinessDefaults(item, taxPayerNo));
    }
    if (isJsonObject(value)) {
        const result = {};
        for (const [childKey, childValue] of Object.entries(value)) {
            result[childKey] = fillBusinessDefaults(childValue, taxPayerNo, childKey);
        }
        return result;
    }
    return value;
}
function getLexiangCatalog(catalog) {
    const found = LEXIANG_CATALOGS.find((item) => item.value === catalog);
    if (!found) {
        throw new Error(`未知乐享接口类型：${catalog}`);
    }
    return found;
}
function cloneJson(value) {
    return JSON.parse(JSON.stringify(value));
}
function isJsonObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
//# sourceMappingURL=lexiang.js.map