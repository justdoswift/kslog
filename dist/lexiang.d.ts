import type { LexiangBusinessPayload, LexiangInterfaceInfo, LexiangProfile } from "./types.js";
export declare const DEFAULT_LEXIANG_VERSION = "1.0";
export type LexiangCatalog = "general" | "medical";
export interface LexiangCatalogInfo {
    value: LexiangCatalog;
    name: string;
    description: string;
    interfaces: readonly LexiangInterfaceInfo[];
}
export interface LexiangRequestBody {
    data: string;
    noise: string;
    version: string;
    sign: string;
}
export declare function listLexiangCatalogs(): LexiangCatalogInfo[];
export declare function listLexiangInterfaces(catalog?: LexiangCatalog): LexiangInterfaceInfo[];
export declare function findLexiangInterfaceByPath(path: string, catalog?: LexiangCatalog): LexiangInterfaceInfo | undefined;
export declare function formatLexiangInterfaceChoice(api: LexiangInterfaceInfo): string;
export declare function formatLexiangTemplateSummary(api: LexiangInterfaceInfo): string;
export declare function parseLexiangBusinessPayloadJson(value: string): LexiangBusinessPayload;
export declare function buildLexiangBusinessPayloadDefault(api: LexiangInterfaceInfo, taxPayerNo: string): LexiangBusinessPayload;
export declare function encodeLexiangData(payload: LexiangBusinessPayload): string;
export declare function generateLexiangNoise(): string;
export declare function buildLexiangSign(input: {
    appid: string;
    appkey: string;
    data: string;
    noise: string;
    version: string;
}): string;
export declare function buildLexiangSignString(input: {
    appid: string;
    appkey: string;
    data: string;
    noise: string;
    version: string;
}): string;
export declare function buildLexiangRequestBody(input: {
    profile: Pick<LexiangProfile, "appid" | "appkey" | "version">;
    businessPayload: LexiangBusinessPayload;
    noise?: string;
}): LexiangRequestBody;
export declare function buildLexiangCurl(input: {
    profile: Pick<LexiangProfile, "baseUrl" | "appid" | "appkey" | "taxPayerNo" | "version">;
    api: LexiangInterfaceInfo;
    businessPayload: LexiangBusinessPayload;
    noise?: string;
}): string;
