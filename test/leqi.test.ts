import { describe, expect, it } from "vitest";

import {
  buildLeqiCurl,
  buildLeqiExecCurlCommand,
  buildLeqiInvokePayload,
  formatLeqiApiChoice,
  parseReqDtoJson
} from "../src/leqi.js";
import type { LeqiApiInfo } from "../src/types.js";

const api: LeqiApiInfo = {
  apiIdentity: "200000001",
  apiName: "授信额度查询",
  remarks: "授信额度查询"
};

describe("leqi", () => {
  it("builds invoke payloads", () => {
    expect(
      buildLeqiInvokePayload({
        api,
        taxPayerNo: "91150100397352740W",
        testMode: 0,
        reqDTO: { sqed: 20000000 }
      })
    ).toEqual({
      apiIdentity: "200000001",
      taxPayerNo: "91150100397352740W",
      testMode: 0,
      reqDTO: { sqed: 20000000 }
    });
  });

  it("builds copyable curl commands", () => {
    const payload = buildLeqiInvokePayload({
      api,
      taxPayerNo: "91150100397352740W",
      testMode: 0,
      reqDTO: { sqlx: "1" }
    });

    expect(buildLeqiCurl("http://proxy/leqi/proxy/invoke", payload)).toContain(
      "--data-raw '{\"apiIdentity\":\"200000001\""
    );
  });

  it("builds exec curl commands", () => {
    const payload = buildLeqiInvokePayload({
      api,
      taxPayerNo: "91150100397352740W",
      testMode: 0,
      reqDTO: {}
    });

    expect(buildLeqiExecCurlCommand("http://proxy/leqi/proxy/invoke", payload)).toEqual([
      "sh",
      "-lc",
      "curl -sS 'http://proxy/leqi/proxy/invoke' -H 'Content-Type: application/json' --data-raw '{\"apiIdentity\":\"200000001\",\"taxPayerNo\":\"91150100397352740W\",\"testMode\":0,\"reqDTO\":{}}'"
    ]);
  });

  it("parses reqDTO JSON objects", () => {
    expect(parseReqDtoJson("{\"sqed\":100}")).toEqual({ sqed: 100 });
    expect(() => parseReqDtoJson("[]")).toThrow("reqDTO 必须是 JSON object");
  });

  it("formats api choices", () => {
    expect(formatLeqiApiChoice(api)).toBe("200000001  授信额度查询");
  });
});
