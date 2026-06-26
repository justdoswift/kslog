import { describe, expect, it } from "vitest";

import { formatDuration, formatProgressLine, formatProgressRate, formatTableProgressPercent } from "../src/progress.js";

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

  it("formats elapsed duration for completion summaries", () => {
    expect(formatDuration(7_000)).toBe("7s");
    expect(formatDuration(188_000)).toBe("3m08s");
  });

  it("formats diagnostic dump rates", () => {
    expect(formatProgressRate(2048, 2000)).toBe("1KiB/s");
  });

  it("formats table progress without rounding unfinished work to 100%", () => {
    expect(formatTableProgressPercent(307, 3787)).toBe("8%");
    expect(formatTableProgressPercent(999, 1000)).toBe("99%");
    expect(formatTableProgressPercent(1000, 1000)).toBe("100%");
  });
});
