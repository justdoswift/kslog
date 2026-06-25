import { describe, expect, it } from "vitest";

import {
  buildLexiangBusinessPayloadDefault,
  buildLexiangCurl,
  buildLexiangSign,
  buildLexiangSignString,
  encodeLexiangData,
  findLexiangInterfaceByPath,
  formatLexiangTemplateSummary,
  generateLexiangNoise,
  listLexiangCatalogs,
  listLexiangInterfaces
} from "../src/lexiang.js";
import type { LexiangProfile } from "../src/types.js";

const profile: LexiangProfile = {
  name: "测试环境",
  baseUrl: "http://lexiang.example.com",
  appid: "app1",
  appkey: "192006250b4c09247ec02f6a2d",
  taxPayerNo: "91350100731844207Y",
  version: "1.0",
  createdAt: "2026-06-25T00:00:00.000Z",
  updatedAt: "2026-06-25T00:00:00.000Z"
};

describe("lexiang", () => {
  it("loads separate embedded general and medical interface snapshots", () => {
    const catalogs = listLexiangCatalogs();
    const generalApis = listLexiangInterfaces("general");
    const medicalApis = listLexiangInterfaces("medical");
    const outpatient = findLexiangInterfaceByPath("/api/medical/v1/rpa/10210100111", "medical");

    expect(catalogs.map((catalog) => catalog.name)).toEqual(["通用", "医疗"]);
    expect(generalApis).toHaveLength(42);
    expect(medicalApis).toHaveLength(10);
    expect(outpatient).toMatchObject({
      name: "医疗门诊全电蓝字发票开具",
      sourceDoc: "乐享协同数字化电子发票接口规范（医疗） v1.0.18.docx",
      sectionTitle: "3.2.1 医疗门诊全电蓝字发票开具"
    });
  });

  it("builds default business payloads with nested general invoice arrays", () => {
    const api = findLexiangInterfaceByPath("/api/standard/v1/rpa/102101001", "general");

    expect(api).toMatchObject({
      name: "全电蓝字发票开具",
      sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx",
      sectionTitle: "3.2.1 全电蓝字发票开具"
    });
    const payload = buildLexiangBusinessPayloadDefault(api as NonNullable<typeof api>, profile.taxPayerNo);

    expect(payload.data).toMatchObject({
      xsfnsrsbh: profile.taxPayerNo
    });
    expect(JSON.stringify(payload)).toContain("\"fpmx\":[");
    expect(JSON.stringify(payload)).toContain("\"fjys\":[");
  });

  it("builds default business payloads with nested medical invoice arrays", () => {
    const api = findLexiangInterfaceByPath("/api/medical/v1/rpa/10210100111", "medical");

    expect(api).toBeDefined();
    const payload = buildLexiangBusinessPayloadDefault(api as NonNullable<typeof api>, profile.taxPayerNo);

    expect(payload.data).toMatchObject({
      xsfnsrsbh: profile.taxPayerNo
    });
    expect(JSON.stringify(payload)).toContain("\"fpmx\":[");
    expect(JSON.stringify(payload)).toContain("\"sszdyysmx\":[");
    expect(JSON.stringify(payload)).toContain("\"zdxxlb\":[");
  });

  it("encodes data as UTF-8 base64", () => {
    expect(encodeLexiangData({ nsrsbh: "91350100731844207Y" })).toBe(
      "eyJuc3JzYmgiOiI5MTM1MDEwMDczMTg0NDIwN1kifQ=="
    );
  });

  it("builds SM3 signatures using the document order", () => {
    const data = "eyJuc3JzYmgiOiI5MTM1MDEwMDczMTg0NDIwN1kifQ==";
    const noise = "2aae7f24a3144651ba20f967b8066f6c";

    expect(
      buildLexiangSignString({
        appid: "app1",
        appkey: "192006250b4c09247ec02f6a2d",
        data,
        noise,
        version: "1.0"
      })
    ).toBe(
      "appid=app1&data=eyJuc3JzYmgiOiI5MTM1MDEwMDczMTg0NDIwN1kifQ==&noise=2aae7f24a3144651ba20f967b8066f6c&key=192006250b4c09247ec02f6a2d&version=1.0"
    );
    expect(
      buildLexiangSign({
        appid: "app1",
        appkey: "192006250b4c09247ec02f6a2d",
        data,
        noise,
        version: "1.0"
      })
    ).toBe("4CD26B2A2FC15BD37EA1F20B623405CFFECA55EE49D2D3080D5EECFEC69380A9");
  });

  it("generates UUID-like noise without dashes", () => {
    expect(generateLexiangNoise()).toMatch(/^[0-9a-f]{32}$/);
  });

  it("builds copyable REST curl commands", () => {
    const api = findLexiangInterfaceByPath("/api/standard/v1/rpa/100101001", "general");

    expect(api).toBeDefined();
    const curl = buildLexiangCurl({
      profile,
      api: api as NonNullable<typeof api>,
      businessPayload: { nsrsbh: profile.taxPayerNo },
      noise: "2aae7f24a3144651ba20f967b8066f6c"
    });

    expect(curl).toContain("curl 'http://lexiang.example.com/api/standard/v1/rpa/100101001'");
    expect(curl).toContain("-H 'X-AppId: app1'");
    expect(curl).toContain("-H 'X-TaxPayerNo: 91350100731844207Y'");
    expect(curl).toContain("--data-raw '{\n");
    expect(curl).toContain('"data": "eyJuc3JzYmgiOiI5MTM1MDEwMDczMTg0NDIwN1kifQ=="');
    expect(curl).toContain('"sign": "4CD26B2A2FC15BD37EA1F20B623405CFFECA55EE49D2D3080D5EECFEC69380A9"');
  });

  it("formats template summaries", () => {
    const api = findLexiangInterfaceByPath("/api/medical/v1/rpa/10210100111", "medical");

    expect(api).toBeDefined();
    const summary = formatLexiangTemplateSummary(api as NonNullable<typeof api>);
    expect(summary).toContain("文档模板：乐享协同数字化电子发票接口规范（医疗） v1.0.18.docx / 3.2.1");
    expect(summary).toContain("字段：");
    expect(summary).toContain("必填：");
  });
});
