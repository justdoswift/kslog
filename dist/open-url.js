import { spawn } from "node:child_process";
import process from "node:process";
export function commandForOpenUrl(url, platform = process.platform) {
    if (platform === "darwin") {
        return { command: "open", args: [url] };
    }
    if (platform === "win32") {
        return { command: "cmd", args: ["/c", "start", "", url] };
    }
    return { command: "xdg-open", args: [url] };
}
export async function openUrl(url, options = {}) {
    const command = commandForOpenUrl(url, options.platform);
    const runner = options.runner ?? runOpenCommand;
    await runner(command);
}
async function runOpenCommand(command) {
    await new Promise((resolve, reject) => {
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
//# sourceMappingURL=open-url.js.map