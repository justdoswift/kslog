#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { confirm, input, number, password as promptPassword } from "@inquirer/prompts";
import { Command, Option } from "commander";
import { KubeSphereClient } from "./kubesphere-client.js";
import { buildOutputPath, chooseLeqiAction, chooseLeqiApi, chooseContainer, chooseDateSelection, chooseHistoryFiles, chooseLogRange, chooseLogSource, chooseNamespace, choosePod, chooseSavedProfile, chooseTarget, chooseWorkctlFeature, promptLeqiReqDto, promptConnection, promptNewProfileName } from "./prompts.js";
import { getProfile, readProfiles, removeProfile, setDefaultProfile, upsertProfile } from "./profile-store.js";
import { exportHistoryLogs, filterHistoryFilesByService, listHistoryFiles, statHistoryFiles } from "./history-logs.js";
import { buildLogFileName, defaultOutputDir, formatBytes, normalizeBaseUrl } from "./utils.js";
import { ProgressBar } from "./progress.js";
import { buildLeqiCurl, buildLeqiExecCurlCommand, buildLeqiInvokePayload, DEFAULT_LEQI_DB_HOST, DEFAULT_LEQI_DB_NAME, DEFAULT_LEQI_DB_PORT, DEFAULT_LEQI_DB_USER, DEFAULT_LEQI_ENDPOINT, DEFAULT_LEQI_RUNNER_WORKLOAD, DEFAULT_LEQI_TAX_PAYER_NO, listLeqiApis } from "./leqi.js";
const program = new Command();
program
    .name("workctl")
    .description("日常工作工具集 CLI")
    .version("0.5.0");
addConnectionOptions(program);
addDownloadOptions(program);
program.action(async (options) => {
    if (hasDownloadHint(options)) {
        await runDownloadFlow(options);
        return;
    }
    const feature = await chooseWorkctlFeature();
    if (feature === "leqi") {
        await runLeqiFlow(options);
        return;
    }
    await runDownloadFlow(options);
});
const loginCheck = program
    .command("login-check")
    .description("验证 KubeSphere 地址和账号能否登录");
addConnectionOptions(loginCheck);
loginCheck.action(async (options, command) => {
    const mergedOptions = mergeCommandOptions(options, command);
    const { client, connection } = await loginFromOptions(mergedOptions);
    const namespaces = await client.listNamespaces();
    console.log(`登录成功：${connection.username} @ ${connection.baseUrl}`);
    console.log(`可见 namespace 数量：${namespaces.length}`);
});
const download = program.command("download").description("下载指定工作负载的容器日志");
addConnectionOptions(download);
addDownloadOptions(download);
download.action(async (options, command) => {
    await runDownloadFlow(mergeCommandOptions(options, command));
});
const current = program.command("current").description("下载当前容器日志");
addConnectionOptions(current);
addDownloadOptions(current);
current.action(async (options, command) => {
    await runDownloadFlow({ ...mergeCommandOptions(options, command), source: "current" });
});
const history = program.command("history").description("下载 /opt/saas-logs 历史日志");
addConnectionOptions(history);
addDownloadOptions(history);
history.action(async (options, command) => {
    await runDownloadFlow({ ...mergeCommandOptions(options, command), source: "history" });
});
const leqi = program.command("leqi").description("乐企接口工具");
addConnectionOptions(leqi);
addLeqiOptions(leqi);
leqi.action(async (options, command) => {
    await runLeqiFlow(mergeCommandOptions(options, command));
});
const profile = program.command("profile").description("管理已保存的 KubeSphere 环境");
profile.command("list").description("列出环境").action(async () => {
    const config = await readProfiles();
    if (config.profiles.length === 0) {
        console.log("还没有保存的环境");
        return;
    }
    for (const item of config.profiles) {
        const marker = item.name === config.defaultProfile ? "*" : " ";
        console.log(`${marker} ${item.name}\t${item.url}\t${item.username}`);
    }
});
profile.command("add").description("新增或更新环境").action(async () => {
    const name = await input({ message: "环境名称", required: true });
    const url = await input({ message: "KubeSphere 地址", default: "http://192.168.7.191:30880", required: true });
    const username = await input({ message: "用户名", default: "admin", required: true });
    const password = await promptPassword({ message: "密码", mask: "*" });
    const insecure = await confirm({ message: "是否允许 https 自签名证书", default: false });
    const setDefault = await confirm({ message: "设为默认环境", default: true });
    console.warn("提示：密码会按你的选择明文保存到 ~/.workctl/profiles.json。");
    const saved = await upsertProfile({ name, url, username, password, insecure, setDefault });
    console.log(`已保存环境：${saved.name}`);
});
profile.command("remove <name>").description("删除环境").action(async (name) => {
    const removed = await removeProfile(name);
    console.log(removed ? `已删除环境：${name}` : `环境不存在：${name}`);
});
profile.command("use <name>").description("设置默认环境").action(async (name) => {
    await setDefaultProfile(name);
    console.log(`默认环境已设置为：${name}`);
});
program.parseAsync(process.argv).catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`错误：${message}`);
    process.exitCode = 1;
});
function addConnectionOptions(command) {
    command
        .addOption(new Option("--profile <name>", "使用已保存的环境").env("WORKCTL_PROFILE"))
        .addOption(new Option("--url <url>", "KubeSphere 地址，例如 http://192.168.7.191:30880").env("WORKCTL_URL"))
        .addOption(new Option("-u, --username <username>", "用户名").env("WORKCTL_USERNAME"))
        .addOption(new Option("-p, --password <password>", "密码").env("WORKCTL_PASSWORD"))
        .option("--insecure", "允许 https 自签名证书");
}
function addDownloadOptions(command) {
    command
        .option("-n, --namespace <namespace>", "namespace")
        .option("-w, --workload <workload>", "工作负载名称")
        .option("-s, --service <service>", "工作负载名称（兼容旧参数）")
        .option("--pod <pod>", "Pod 名称")
        .option("-c, --container <container>", "容器名称")
        .addOption(new Option("--source <source>", "日志来源").choices(["current", "history"]))
        .option("--tail-lines <number>", "当前日志：最近 N 行", parsePositiveInteger)
        .option("--since-minutes <number>", "当前日志：最近 N 分钟", parsePositiveInteger)
        .option("--all", "当前日志：下载全部当前日志")
        .option("--history-path <path>", "历史日志根路径", "/opt/saas-logs")
        .option("--date <date>", "历史日志：指定日期 YYYY-MM-DD")
        .option("--from <date>", "历史日志：开始日期 YYYY-MM-DD")
        .option("--to <date>", "历史日志：结束日期 YYYY-MM-DD")
        .option("--recent-days <number>", "历史日志：最近 N 天", parsePositiveInteger)
        .option("--history-file <path...>", "历史日志：指定远端文件，可传多个")
        .option("-o, --output-dir <dir>", "输出目录");
}
function addLeqiOptions(command) {
    command
        .option("--api <apiIdentity>", "乐企接口 apiIdentity")
        .option("--tax-payer-no <taxPayerNo>", "纳税人识别号")
        .option("--test-mode <number>", "testMode", parseNonNegativeInteger)
        .option("--req-dto <json>", "reqDTO JSON object")
        .addOption(new Option("--action <action>", "操作").choices(["curl", "call"]))
        .option("--endpoint <url>", "proxy invoke 地址", DEFAULT_LEQI_ENDPOINT)
        .option("-n, --namespace <namespace>", "执行调用的 namespace")
        .option("--runner-workload <workload>", "执行 curl 的工作负载", DEFAULT_LEQI_RUNNER_WORKLOAD)
        .option("--pod <pod>", "执行 curl 的 Pod 名称")
        .option("-c, --container <container>", "执行 curl 的容器名称")
        .addOption(new Option("--db-host <host>", "乐企接口库地址").env("WORKCTL_LEQI_DB_HOST"))
        .addOption(new Option("--db-port <port>", "乐企接口库端口").env("WORKCTL_LEQI_DB_PORT").argParser(parsePositiveInteger))
        .addOption(new Option("--db-user <user>", "乐企接口库用户名").env("WORKCTL_LEQI_DB_USER"))
        .addOption(new Option("--db-password <password>", "乐企接口库密码").env("WORKCTL_LEQI_DB_PASSWORD"))
        .addOption(new Option("--db-name <database>", "乐企接口库名").env("WORKCTL_LEQI_DB_NAME"));
}
function mergeCommandOptions(options, command) {
    return {
        ...(command.parent?.opts() ?? {}),
        ...command.opts(),
        ...options
    };
}
async function runDownloadFlow(options) {
    const { client, connection } = await loginFromOptions(options);
    console.log(`已登录：${connection.username} @ ${connection.baseUrl}`);
    const { namespace, target, pod, container } = await chooseKubeTarget(client, options);
    const source = await chooseLogSource(options.source);
    if (source === "history") {
        await runHistoryDownload(client, options, namespace, target, pod, container);
        return;
    }
    await runCurrentDownload(client, options, namespace, target, pod, container);
}
async function runLeqiFlow(options) {
    const dbOptions = await resolveLeqiDbOptions(options);
    const apis = await listLeqiApis(dbOptions);
    const api = await chooseLeqiApi(apis, options.api);
    const taxPayerNo = options.taxPayerNo ??
        (await input({
            message: "taxPayerNo",
            default: DEFAULT_LEQI_TAX_PAYER_NO,
            required: true
        }));
    const testMode = options.testMode ??
        (await number({
            message: "testMode",
            default: 0,
            min: 0,
            required: true
        }));
    const reqDTO = await promptLeqiReqDto(options.reqDto);
    const payload = buildLeqiInvokePayload({
        api,
        taxPayerNo,
        testMode,
        reqDTO
    });
    const endpoint = options.endpoint ?? DEFAULT_LEQI_ENDPOINT;
    const curlText = buildLeqiCurl(endpoint, payload);
    const action = await chooseLeqiAction(options.action);
    console.log(`已选择：${api.apiIdentity}  ${api.apiName}`);
    if (action === "curl") {
        console.log("\n可复制 curl：");
        console.log(curlText);
        return;
    }
    const { client, connection } = await loginFromOptions(options);
    const runner = await chooseLeqiRunner(client, options);
    console.log(`已登录：${connection.username} @ ${connection.baseUrl}`);
    console.log(`执行位置：${runner.namespace} / ${runner.target.name} / ${runner.pod.name} / ${runner.container}`);
    const result = await client.execCommand({
        namespace: runner.namespace,
        pod: runner.pod.name,
        container: runner.container,
        command: buildLeqiExecCurlCommand(endpoint, payload),
        timeoutMs: 120000
    });
    if (result.error.trim()) {
        throw new Error(`调用失败：${result.error.trim()}`);
    }
    if (result.stderr.trim()) {
        console.error(result.stderr.trim());
    }
    console.log(result.stdout.trim() || "(无响应内容)");
}
async function chooseLeqiRunner(client, options) {
    const namespaces = await client.listNamespaces();
    const namespace = await chooseNamespace(namespaces, options.namespace);
    const runnerWorkload = options.runnerWorkload ?? DEFAULT_LEQI_RUNNER_WORKLOAD;
    let target;
    try {
        target = await client.resolveTarget(namespace, runnerWorkload);
    }
    catch (error) {
        if (options.runnerWorkload) {
            throw error;
        }
        const targets = await client.listTargets(namespace);
        target = await chooseTarget(targets);
    }
    const pods = await client.listPodsForTarget(target);
    if (pods.length === 0) {
        throw new Error(buildNoPodsMessage(target));
    }
    const pod = await choosePod(pods, options.pod);
    if (pod.containers.length === 0) {
        throw new Error(`Pod ${pod.name} 中没有可选容器`);
    }
    return {
        namespace,
        target,
        pod,
        container: await chooseContainer(pod.containers, options.container)
    };
}
async function resolveLeqiDbOptions(options) {
    const password = options.dbPassword ??
        process.env.WORKCTL_LEQI_DB_PASSWORD ??
        (await promptPassword({
            message: "乐企接口库密码",
            mask: "*"
        }));
    return {
        host: options.dbHost ?? process.env.WORKCTL_LEQI_DB_HOST ?? DEFAULT_LEQI_DB_HOST,
        port: options.dbPort ?? Number(process.env.WORKCTL_LEQI_DB_PORT ?? DEFAULT_LEQI_DB_PORT),
        user: options.dbUser ?? process.env.WORKCTL_LEQI_DB_USER ?? DEFAULT_LEQI_DB_USER,
        password,
        database: options.dbName ?? process.env.WORKCTL_LEQI_DB_NAME ?? DEFAULT_LEQI_DB_NAME
    };
}
function hasDownloadHint(options) {
    return Boolean(options.namespace ??
        options.workload ??
        options.service ??
        options.pod ??
        options.container ??
        options.tailLines ??
        options.sinceMinutes ??
        options.all ??
        options.outputDir ??
        options.source ??
        options.date ??
        options.from ??
        options.to ??
        options.recentDays ??
        options.historyFile);
}
async function chooseKubeTarget(client, options) {
    const namespaces = await client.listNamespaces();
    if (namespaces.length === 0) {
        throw new Error("当前账号没有可见 namespace");
    }
    const namespace = await chooseNamespace(namespaces, options.namespace);
    const targets = await client.listTargets(namespace);
    if (targets.length === 0) {
        throw new Error(`namespace ${namespace} 中没有可选择的工作负载`);
    }
    const workloadName = options.workload ?? options.service;
    const target = workloadName
        ? await client.resolveTarget(namespace, workloadName)
        : await chooseTarget(targets);
    const pods = await client.listPodsForTarget(target);
    if (pods.length === 0) {
        throw new Error(buildNoPodsMessage(target));
    }
    const pod = await choosePod(pods, options.pod);
    if (pod.containers.length === 0) {
        throw new Error(`Pod ${pod.name} 中没有可选容器`);
    }
    return {
        namespace,
        target,
        pod,
        container: await chooseContainer(pod.containers, options.container)
    };
}
function buildNoPodsMessage(target) {
    if ((target.desiredReplicas ?? 0) === 0) {
        return `工作负载 ${target.name} 当前副本数为 0，没有可进入的 Pod；请先扩容，或切换到有运行 Pod 的环境`;
    }
    return `工作负载 ${target.name} 没有匹配的 Pod`;
}
async function runCurrentDownload(client, options, namespace, target, pod, container) {
    const range = await chooseLogRange({
        tailLines: options.tailLines,
        sinceMinutes: options.sinceMinutes,
        all: options.all
    });
    const outputPath = await buildOutputPath({
        namespace,
        service: target.name,
        pod: pod.name,
        outputDir: options.outputDir
    });
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    printCurrentDownloadSummary(namespace, target.name, pod.name, container, range, outputPath);
    const progress = new ProgressBar();
    await client.downloadLog({
        namespace,
        pod: pod.name,
        container,
        range,
        outputPath,
        timestamps: true,
        onProgress: (bytes) => progress.update({
            label: "当前日志",
            currentBytes: bytes
        })
    });
    const stats = await fs.stat(outputPath);
    progress.done(`下载完成：${outputPath}`);
    console.log(`文件大小：${formatBytes(stats.size)}`);
}
async function runHistoryDownload(client, options, namespace, target, pod, container) {
    const historyPath = options.historyPath ?? "/opt/saas-logs";
    const dateSelection = await chooseDateSelection({
        date: options.date,
        from: options.from,
        to: options.to,
        recentDays: options.recentDays
    });
    const progress = new ProgressBar();
    let files = options.historyFile?.map((file) => ({ path: file }));
    if (files && files.length > 0) {
        progress.update({
            label: "读取历史日志大小",
            currentBytes: 0,
            extra: `${files.length} 个文件`
        });
        files = await statHistoryFiles(client, { namespace, pod: pod.name, container, historyPath }, options.historyFile ?? []);
    }
    else {
        progress.update({
            label: "列历史日志文件",
            currentBytes: 0,
            extra: historyPath
        });
        const allFiles = await listHistoryFiles(client, { namespace, pod: pod.name, container, historyPath });
        const serviceFiles = filterHistoryFilesByService(allFiles, target.name);
        files = serviceFiles.length > 0 ? serviceFiles : allFiles;
        if (serviceFiles.length === 0) {
            console.log(`没有找到路径包含 ${target.name} 的历史文件，改为展示全部 ${allFiles.length} 个文件。`);
        }
        files = await chooseHistoryFiles(files);
    }
    if (files.length === 0) {
        throw new Error("未选择历史日志文件");
    }
    const outputPath = await buildHistoryOutputPath({
        namespace,
        service: target.name,
        pod: pod.name,
        dateSelection,
        outputDir: options.outputDir
    });
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    console.log("开始导出历史日志：");
    console.log(`  namespace: ${namespace}`);
    console.log(`  workload: ${target.name}`);
    console.log(`  pod:       ${pod.name}`);
    console.log(`  container: ${container}`);
    console.log(`  path:      ${historyPath}`);
    console.log(`  dates:     ${dateSelection.from} ~ ${dateSelection.to}`);
    console.log(`  files:     ${files.length}`);
    console.log(`  output:    ${outputPath}`);
    const result = await exportHistoryLogs(client, {
        namespace,
        pod: pod.name,
        container,
        historyPath,
        files,
        dateSelection,
        outputPath,
        onProgress: (snapshot) => progress.update({
            label: `历史日志 ${snapshot.fileIndex}/${snapshot.fileCount}`,
            currentBytes: typeof snapshot.totalSourceBytes === "number"
                ? snapshot.sourceBytesProcessed
                : snapshot.bytesWritten,
            totalBytes: snapshot.totalSourceBytes,
            extra: `写入 ${formatBytes(snapshot.bytesWritten)}  ${snapshot.currentFile ? path.basename(snapshot.currentFile) : ""}`
        })
    });
    const stats = await fs.stat(outputPath);
    progress.done(`历史日志导出完成：${outputPath}`);
    console.log(`文件大小：${formatBytes(stats.size)}`);
    console.log(`扫描文件：${result.scannedFiles}，有匹配：${result.matchedFiles}，跳过：${result.skippedFiles}`);
    if (result.matchedFiles === 0) {
        console.log("没有导出匹配日期的日志行。");
    }
}
async function loginFromOptions(options) {
    const { connection, newProfileName } = await resolveConnection(options);
    const client = new KubeSphereClient({
        baseUrl: connection.baseUrl,
        insecure: connection.insecure
    });
    await client.login(connection.username, connection.password);
    if (newProfileName) {
        const saved = await upsertProfile({
            name: newProfileName,
            url: connection.baseUrl,
            username: connection.username,
            password: connection.password,
            insecure: connection.insecure,
            setDefault: true
        });
        console.log(`已保存环境：${saved.name}`);
    }
    return { client, connection };
}
async function resolveConnection(options) {
    const config = await readProfiles();
    if (options.profile) {
        const profile = await getProfile(options.profile);
        if (!profile) {
            throw new Error(`profile 不存在：${options.profile}`);
        }
        return {
            connection: await promptConnection({
                baseUrl: options.url ? normalizeBaseUrl(options.url) : profile.url,
                username: options.username ?? profile.username,
                password: options.password ?? profile.password,
                insecure: options.insecure ?? profile.insecure
            })
        };
    }
    if (options.url || options.username || options.password) {
        return {
            connection: await promptConnection({
                baseUrl: options.url ? normalizeBaseUrl(options.url) : undefined,
                username: options.username,
                password: options.password,
                insecure: options.insecure
            })
        };
    }
    const choice = await chooseSavedProfile(config.profiles, config.defaultProfile);
    if (choice.kind === "saved") {
        return {
            connection: await promptConnection({
                baseUrl: choice.profile.url,
                username: choice.profile.username,
                password: choice.profile.password,
                insecure: options.insecure ?? choice.profile.insecure
            })
        };
    }
    const newProfileName = await promptNewProfileName(config.profiles.map((profile) => profile.name));
    return {
        connection: await promptConnection({
            insecure: options.insecure
        }),
        newProfileName
    };
}
function parsePositiveInteger(value) {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        throw new Error(`需要正整数：${value}`);
    }
    return parsed;
}
function parseNonNegativeInteger(value) {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed) || parsed < 0) {
        throw new Error(`需要非负整数：${value}`);
    }
    return parsed;
}
function printCurrentDownloadSummary(namespace, workload, pod, container, range, outputPath) {
    const rangeText = range.mode === "all"
        ? "全部当前日志"
        : range.mode === "tail"
            ? `最近 ${range.tailLines} 行`
            : `最近 ${Math.round((range.sinceSeconds ?? 0) / 60)} 分钟`;
    console.log("开始下载当前日志：");
    console.log(`  namespace: ${namespace}`);
    console.log(`  workload: ${workload}`);
    console.log(`  pod:       ${pod}`);
    console.log(`  container: ${container}`);
    console.log(`  range:     ${rangeText}`);
    console.log(`  output:    ${outputPath}`);
}
async function buildHistoryOutputPath(options) {
    const outputDir = options.outputDir ?? defaultOutputDir(process.env.HOME ?? "");
    const datePart = options.dateSelection.from === options.dateSelection.to
        ? options.dateSelection.from
        : `${options.dateSelection.from}_to_${options.dateSelection.to}`;
    const fileName = buildLogFileName(options.namespace, `${options.service}_history_${datePart}`, options.pod);
    return path.join(outputDir, fileName);
}
//# sourceMappingURL=cli.js.map