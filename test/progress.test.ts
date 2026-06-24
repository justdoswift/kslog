import { describe, expect, it } from "vitest";

import { formatProgressLine } from "../src/progress.js";

describe("progress", () => {
  it("renders known-total progress with total, current, speed, and elapsed time", () => {
    expect(
      formatProgressLine({
        label: "历史日志",
        currentBytes: 512,
        totalBytes: 1024,
        startedAt: 0,
        now: 1000
      })
    ).toBe("历史日志  512 B / 1.0 KiB  速度 512B/s  已执行 1s");
  });

  it("renders unknown-total progress with current bytes, speed, and elapsed time", () => {
    expect(
      formatProgressLine({
        label: "当前日志",
        currentBytes: 2048,
        startedAt: 0,
        now: 2000
      })
    ).toBe("当前日志  2.0 KiB  速度 1KiB/s  已执行 2s");
  });
});
