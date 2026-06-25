import { spawn } from "node:child_process";
import process from "node:process";

export interface OpenCommand {
  command: string;
  args: string[];
}

export interface OpenUrlOptions {
  platform?: NodeJS.Platform;
  runner?: (command: OpenCommand) => Promise<void>;
}

export function commandForOpenUrl(url: string, platform: NodeJS.Platform = process.platform): OpenCommand {
  if (platform === "darwin") {
    return { command: "open", args: [url] };
  }

  if (platform === "win32") {
    return { command: "cmd", args: ["/c", "start", "", url] };
  }

  return { command: "xdg-open", args: [url] };
}

export async function openUrl(url: string, options: OpenUrlOptions = {}): Promise<void> {
  const command = commandForOpenUrl(url, options.platform);
  const runner = options.runner ?? runOpenCommand;
  await runner(command);
}

async function runOpenCommand(command: OpenCommand): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command.command, command.args, {
      stdio: "ignore",
      detached: true
    });

    child.on("error", reject);
    child.on("spawn", () => {
      child.unref();
      resolve();
    });
  });
}
