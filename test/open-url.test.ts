import { describe, expect, it } from "vitest";

import { commandForOpenUrl, openUrl, type OpenCommand } from "../src/open-url.js";

describe("open-url", () => {
  const url = "https://silken-cliff-6z59.here.now/";

  it("uses the macOS open command", () => {
    expect(commandForOpenUrl(url, "darwin")).toEqual({ command: "open", args: [url] });
  });

  it("uses the Windows start command", () => {
    expect(commandForOpenUrl(url, "win32")).toEqual({ command: "cmd", args: ["/c", "start", "", url] });
  });

  it("uses xdg-open on Linux-like platforms", () => {
    expect(commandForOpenUrl(url, "linux")).toEqual({ command: "xdg-open", args: [url] });
  });

  it("runs the selected open command through an injectable runner", async () => {
    const commands: OpenCommand[] = [];

    await openUrl(url, {
      platform: "darwin",
      runner: async (command) => {
        commands.push(command);
      }
    });

    expect(commands).toEqual([{ command: "open", args: [url] }]);
  });
});
