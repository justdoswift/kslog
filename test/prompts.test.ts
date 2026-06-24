import { describe, expect, it } from "vitest";

import { formatTargetChoice, preferredNamespace } from "../src/prompts.js";

describe("prompts", () => {
  it("prefers tax-digital when it is available", () => {
    expect(preferredNamespace(["default", "tax-digital", "kubesphere-system"])).toBe("tax-digital");
  });

  it("falls back to the first namespace when tax-digital is unavailable", () => {
    expect(preferredNamespace(["default", "kubesphere-system"])).toBe("default");
  });

  it("shows deployment replica counts in target choices", () => {
    expect(
      formatTargetChoice({
        kind: "Deployment",
        name: "tax-data-extraction-server",
        namespace: "tax-digital",
        selector: { app: "tax-data-extraction-server" },
        desiredReplicas: 0,
        readyReplicas: 0
      })
    ).toBe("tax-data-extraction-server  工作负载(Deployment)  (0/0)");
  });

  it("shows ready deployment replica counts in target choices", () => {
    expect(
      formatTargetChoice({
        kind: "Deployment",
        name: "tax-invoice-business-server",
        namespace: "tax-digital",
        selector: { app: "tax-invoice-business-server" },
        desiredReplicas: 1,
        readyReplicas: 1
      })
    ).toBe("tax-invoice-business-server  工作负载(Deployment)  (1/1)");
  });
});
