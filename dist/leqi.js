import { createConnection } from "mysql2/promise";
import { shellQuote } from "./utils.js";
export const DEFAULT_LEQI_DB_HOST = "192.168.7.195";
export const DEFAULT_LEQI_DB_PORT = 3306;
export const DEFAULT_LEQI_DB_USER = "root";
export const DEFAULT_LEQI_DB_NAME = "lxzsdb";
export const DEFAULT_LEQI_ENDPOINT = "http://tax-api-proxy-server.tax-digital.svc.cluster.local:8080/leqi/proxy/invoke";
export const DEFAULT_LEQI_RUNNER_WORKLOAD = "tax-api-proxy-server";
export const DEFAULT_LEQI_TAX_PAYER_NO = "91150100397352740W";
export async function listLeqiApis(options) {
    const connection = await createConnection({
        host: options.host,
        port: options.port,
        user: options.user,
        password: options.password,
        database: options.database,
        connectTimeout: 10000
    });
    try {
        const [rows] = await connection.execute([
            "SELECT api_identifier, api_name, remarks, module, url_suffix,",
            "use_case_code, server_code, ability_code, scene_code",
            "FROM tax_leqi_api_info",
            "WHERE invalidated = 0",
            "ORDER BY api_identifier"
        ].join(" "));
        return rows.map((row) => ({
            apiIdentity: row.api_identifier,
            apiName: row.api_name,
            remarks: row.remarks ?? undefined,
            module: row.module ?? undefined,
            urlSuffix: row.url_suffix ?? undefined,
            useCaseCode: row.use_case_code ?? undefined,
            serverCode: row.server_code ?? undefined,
            abilityCode: row.ability_code ?? undefined,
            sceneCode: row.scene_code ?? undefined
        }));
    }
    finally {
        await connection.end();
    }
}
export function parseReqDtoJson(value) {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("reqDTO 必须是 JSON object");
    }
    return parsed;
}
export function buildLeqiInvokePayload(input) {
    return {
        apiIdentity: input.api.apiIdentity,
        taxPayerNo: input.taxPayerNo,
        testMode: input.testMode,
        reqDTO: input.reqDTO
    };
}
export function buildLeqiCurl(endpoint, payload) {
    return [
        `curl ${shellQuote(endpoint)} \\`,
        `  -H ${shellQuote("Content-Type: application/json")} \\`,
        `  --data-raw ${shellQuote(JSON.stringify(payload))}`
    ].join("\n");
}
export function buildLeqiExecCurlCommand(endpoint, payload) {
    return [
        "sh",
        "-lc",
        [
            "curl -sS",
            shellQuote(endpoint),
            "-H",
            shellQuote("Content-Type: application/json"),
            "--data-raw",
            shellQuote(JSON.stringify(payload))
        ].join(" ")
    ];
}
export function formatLeqiApiChoice(api) {
    const remark = api.remarks && api.remarks !== api.apiName ? `  ${api.remarks}` : "";
    const moduleText = api.module ? `  ${api.module}` : "";
    return `${api.apiIdentity}  ${api.apiName}${moduleText}${remark}`;
}
//# sourceMappingURL=leqi.js.map