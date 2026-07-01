import os from "node:os";
import fsp from "node:fs/promises";
import path from "node:path";

import { describe, expect, it, vi } from "vitest";

import {
  buildDependencyManifest,
  buildDependencyOutputDir,
  buildDiscoverJarCommand,
  buildDiscoverTopLevelArchiveCommand,
  buildListArchiveEntriesCommand,
  buildSearchClassInArchiveCommand,
  dependencyClassEntryMatches,
  dependencyEntryMatches,
  discoverJarCandidates,
  downloadRemoteFile,
  formatDependenciesText,
  jarPathFromJavaArgs,
  parseDependencyClassSearchQuery,
  parseDependencySearchQuery,
  parseJarCandidateLines,
  parsePomProperties,
  runReadOnlyExecWithRetry,
  searchClassInArchive,
  searchDependencyInArchive,
  sortJarCandidates,
  type DependencyJarInfo
} from "../src/dependencies.js";

describe("dependencies", () => {
  it("parses Java -jar arguments", () => {
    expect(jarPathFromJavaArgs(["java", "-Dspring.profiles.active=prod", "-jar", "/app/server.jar"])).toBe(
      "/app/server.jar"
    );
    expect(jarPathFromJavaArgs(["java", "-jar", "server.jar"], "/app")).toBe("/app/server.jar");
    expect(jarPathFromJavaArgs(["java", "org.example.Main"])).toBeUndefined();
  });

  it("parses and sorts Java archive candidates", () => {
    const candidates = parseJarCandidateLines(
      [
        "scan\t/opt/app/helper.jar",
        "scan\t/opt/saas/tax-workflow-server.war",
        "scan\t/opt/saas/agent/skywalking-agent.jar",
        "process\t/app/server.jar",
        "scan\t/opt/app/helper.jar",
        "scan\t/opt/app/readme.txt"
      ].join("\n")
    );

    expect(candidates).toEqual([
      { source: "process", path: "/app/server.jar" },
      { source: "scan", path: "/opt/saas/tax-workflow-server.war" },
      { source: "scan", path: "/opt/app/helper.jar" },
      { source: "scan", path: "/opt/saas/agent/skywalking-agent.jar" }
    ]);
    expect(sortJarCandidates([{ source: "provided", path: "/x/a.jar" }, { source: "process", path: "/x/b.jar" }])[0]?.source).toBe(
      "provided"
    );
  });

  it("builds remote discovery shell command", () => {
    const command = buildDiscoverJarCommand(["/app"]);

    expect(command).toContain("/proc/[0-9]*/cmdline");
    expect(command).toContain("awk 'prev == \"-jar\"");
    expect(command).toContain("find '/app' -maxdepth 5 -type f \\( -name '*.jar' -o -name '*.war' \\)");
    expect(command).toContain("|| true");
    expect(command.endsWith("exit 0")).toBe(true);
  });

  it("builds top-level archive discovery shell command", () => {
    const command = buildDiscoverTopLevelArchiveCommand(["/opt/saas"]);

    expect(command).toContain("find '/opt/saas' -maxdepth 1 -type f \\( -name '*.jar' -o -name '*.war' \\)");
    expect(command).not.toContain("/proc/[0-9]*/cmdline");
    expect(command.endsWith("exit 0")).toBe(true);
  });

  it("parses dependency search queries and matches jar entries", () => {
    const exact = parseDependencySearchQuery("com.bosssoft:business-reimburse-sdk:1.3.20");
    expect(exact).toMatchObject({
      artifactId: "business-reimburse-sdk",
      version: "1.3.20",
      exactJarName: "business-reimburse-sdk-1.3.20.jar"
    });
    expect(dependencyEntryMatches(exact, "BOOT-INF/lib/business-reimburse-sdk-1.3.20.jar")).toBe(true);
    expect(dependencyEntryMatches(exact, "BOOT-INF/lib/business-reimburse-sdk-1.3.21.jar")).toBe(false);

    const fuzzy = parseDependencySearchQuery("business-reimburse-sdk");
    expect(dependencyEntryMatches(fuzzy, "WEB-INF/lib/business-reimburse-sdk-1.3.20.jar")).toBe(true);
    expect(dependencyEntryMatches(fuzzy, "WEB-INF/classes/application.yml")).toBe(false);

    const artifactOnly = parseDependencySearchQuery("com.bosssoft:business-reimburse-sdk");
    expect(dependencyEntryMatches(artifactOnly, "lib/business-reimburse-sdk-1.4.0.jar")).toBe(true);
  });

  it("builds archive listing command for no-download dependency search", () => {
    const command = buildListArchiveEntriesCommand("/opt/saas/server.war");

    expect(command).toContain("unzip -Z1 '/opt/saas/server.war'");
    expect(command).toContain("jar tf '/opt/saas/server.war'");
    expect(command).toContain("__BOSSCLI_NO_ARCHIVE_LISTER__");
    expect(command.endsWith("exit 0")).toBe(true);
  });

  it("searches dependency entries in a remote archive listing", async () => {
    const execCommand = vi.fn().mockResolvedValue({
      stdout: [
        "BOOT-INF/classes/application.yml",
        "BOOT-INF/lib/business-reimburse-sdk-1.3.20.jar",
        "BOOT-INF/lib/spring-core-6.1.0.jar"
      ].join("\n"),
      stderr: "",
      error: ""
    });

    const hits = await searchDependencyInArchive({
      client: { execCommand } as never,
      target: {
        namespace: "tax-digital",
        pod: "server-xxx",
        container: "container-server"
      },
      archivePath: "/opt/saas/server.war",
      query: parseDependencySearchQuery("business-reimburse-sdk")
    });

    expect(hits).toEqual([
      {
        archivePath: "/opt/saas/server.war",
        entry: "BOOT-INF/lib/business-reimburse-sdk-1.3.20.jar"
      }
    ]);
    expect(execCommand).toHaveBeenCalledWith(
      expect.objectContaining({
        command: expect.arrayContaining(["sh", "-lc"])
      })
    );
  });

  it("parses class search queries and matches class entries", () => {
    const dotted = parseDependencyClassSearchQuery("com.bosssoft.demo.SomeClass");
    expect(dotted).toEqual({
      raw: "com.bosssoft.demo.SomeClass",
      classEntry: "com/bosssoft/demo/SomeClass.class"
    });
    expect(dependencyClassEntryMatches(dotted, "BOOT-INF/classes/com/bosssoft/demo/SomeClass.class")).toBe(true);
    expect(dependencyClassEntryMatches(dotted, "com/bosssoft/demo/OtherClass.class")).toBe(false);

    const slash = parseDependencyClassSearchQuery("java.lang.NoClassDefFoundError: com/bosssoft/demo/SomeClass");
    expect(slash.classEntry).toBe("com/bosssoft/demo/SomeClass.class");

    const classNotFound = parseDependencyClassSearchQuery(
      "java.lang.ClassNotFoundException: com.bosssoft.demo.SomeClass"
    );
    expect(classNotFound.classEntry).toBe("com/bosssoft/demo/SomeClass.class");
  });

  it("builds class search command for app and nested dependency jars", () => {
    const command = buildSearchClassInArchiveCommand("/opt/saas/server.war", "com/bosssoft/demo/SomeClass.class");

    expect(command).toContain("unzip -Z1 \"$1\"");
    expect(command).toContain("unzip -l \"$1\"");
    expect(command).toContain("jar tf \"$archive\"");
    expect(command).toContain("WEB-INF/lib");
    expect(command).toContain("BOOT-INF/lib");
    expect(command).toContain("LIB\\t");
    expect(command).toContain("__BOSSCLI_NO_ARCHIVE_LISTER__");
    expect(command.endsWith("exit 0")).toBe(true);
  });

  it("searches class entries in app and dependency archives", async () => {
    const execCommand = vi.fn().mockResolvedValue({
      stdout: [
        "APP\tBOOT-INF/classes/com/bosssoft/demo/SomeClass.class",
        "LIB\tBOOT-INF/lib/demo-sdk-1.0.0.jar\tcom/bosssoft/demo/SomeClass.class"
      ].join("\n"),
      stderr: "",
      error: ""
    });

    const hits = await searchClassInArchive({
      client: { execCommand } as never,
      target: {
        namespace: "tax-digital",
        pod: "server-xxx",
        container: "container-server"
      },
      archivePath: "/opt/saas/server.war",
      query: parseDependencyClassSearchQuery("com.bosssoft.demo.SomeClass")
    });

    expect(hits).toEqual([
      {
        archivePath: "/opt/saas/server.war",
        scope: "app",
        entry: "/opt/saas/server.war",
        classEntry: "BOOT-INF/classes/com/bosssoft/demo/SomeClass.class"
      },
      {
        archivePath: "/opt/saas/server.war",
        scope: "dependency",
        entry: "BOOT-INF/lib/demo-sdk-1.0.0.jar",
        classEntry: "com/bosssoft/demo/SomeClass.class"
      }
    ]);
  });

  it("uses top-level archive discovery before full recursive discovery", async () => {
    const execCommand = vi.fn().mockResolvedValue({
      stdout: "scan\t/opt/saas/tax-invoice-business-server.war\n",
      stderr: "",
      error: ""
    });

    const candidates = await discoverJarCandidates(
      { execCommand } as never,
      {
        namespace: "tax-digital",
        pod: "tax-invoice-business-server-xxx",
        container: "container-tax-invoice-business-server"
      }
    );

    expect(candidates).toEqual([{ source: "scan", path: "/opt/saas/tax-invoice-business-server.war" }]);
    expect(execCommand).toHaveBeenCalledTimes(1);
    expect(execCommand.mock.calls[0]?.[0].command[2]).toContain("-maxdepth 1");
  });

  it("retries transient read-only exec socket resets", async () => {
    let attempts = 0;
    const result = await runReadOnlyExecWithRetry(
      async () => {
        attempts += 1;
        if (attempts < 3) {
          throw new Error("socket hang up");
        }
        return "ok";
      },
      { attempts: 3, delayMs: 0 }
    );

    expect(result).toBe("ok");
    expect(attempts).toBe(3);
  });

  it("falls back when direct dependency download is truncated", async () => {
    const tempDir = await fsp.mkdtemp(path.join(os.tmpdir(), "bosscli-deps-"));
    const outputPath = path.join(tempDir, "app.war");
    const fullContent = Buffer.from("complete application archive");
    const partialContent = fullContent.subarray(0, 8);
    let usedFallback = false;
    const progressSnapshots: Array<{ currentBytes: number; totalBytes?: number; method: string }> = [];

    const client = {
      execCommand: vi.fn().mockResolvedValue({
        stdout: `${fullContent.length}\n`,
        stderr: "",
        error: ""
      }),
      streamExecOutput: vi.fn(async (options: { onStdout: (chunk: Buffer) => Promise<void> }) => {
        await options.onStdout(partialContent);
      }),
      streamInteractiveShell: vi.fn(async (options: { inputLines: string[]; onStdout: (chunk: Buffer) => Promise<void> }) => {
        usedFallback = true;
        const command = options.inputLines[0] ?? "";
        const token = command.match(/BEGIN_%s__\\n' ([a-f0-9]+)/)?.[1];
        expect(token).toBeTruthy();
        await options.onStdout(Buffer.from(`\n__BOSSCLI_BEGIN_${token}__\n`));
        await options.onStdout(Buffer.from(fullContent.toString("base64")));
        await options.onStdout(Buffer.from(`\n__BOSSCLI_END_${token}__:0\n`));
      })
    };

    await downloadRemoteFile({
      client: client as never,
      target: {
        namespace: "tax-digital",
        pod: "server-xxx",
        container: "container-server"
      },
      remotePath: "/opt/saas/server.war",
      outputPath,
      onProgress: (progress) => {
        progressSnapshots.push(progress);
      }
    });

    await expect(fsp.readFile(outputPath)).resolves.toEqual(fullContent);
    expect(usedFallback).toBe(true);
    expect(progressSnapshots).toContainEqual({
      currentBytes: 0,
      totalBytes: fullContent.length,
      method: "direct"
    });
    expect(progressSnapshots).toContainEqual({
      currentBytes: 0,
      totalBytes: fullContent.length,
      method: "stable"
    });
    expect(progressSnapshots.at(-1)).toEqual({
      currentBytes: fullContent.length,
      totalBytes: fullContent.length,
      method: "stable"
    });
  });

  it("does not retry non-transient read-only exec errors", async () => {
    let attempts = 0;

    await expect(
      runReadOnlyExecWithRetry(
        async () => {
          attempts += 1;
          throw new Error("permission denied");
        },
        { attempts: 3, delayMs: 0 }
      )
    ).rejects.toThrow("permission denied");
    expect(attempts).toBe(1);
  });

  it("builds dependency output directories", () => {
    expect(
      buildDependencyOutputDir("/home/me", { namespace: "tax-digital", workload: "tax invoice/server" }, new Date(2026, 6, 1, 9, 8, 7))
    ).toBe(path.join("/home/me", "Downloads", "bosscli", "dependencies", "tax-digital", "tax_invoice_server", "20260701_090807"));
  });

  it("parses pom.properties Maven coordinates", () => {
    expect(
      parsePomProperties(
        [
          "#Generated by Maven",
          "groupId=org.springframework.boot",
          "artifactId=spring-boot",
          "version=2.7.18"
        ].join("\n")
      )
    ).toEqual({
      groupId: "org.springframework.boot",
      artifactId: "spring-boot",
      version: "2.7.18"
    });
  });

  it("formats dependency manifests for human-readable output", () => {
    const dependency: DependencyJarInfo = {
      fileName: "spring-boot.jar",
      path: path.join(os.tmpdir(), "spring-boot.jar"),
      size: 2048,
      sha256: "abc",
      groupId: "org.springframework.boot",
      artifactId: "spring-boot",
      version: "2.7.18"
    };
    const manifest = buildDependencyManifest({
      target: {
        namespace: "tax-digital",
        workload: "tax-api-proxy-server",
        pod: "tax-api-proxy-server-xxx",
        container: "container-tax-api-proxy-server"
      },
      remoteJarPath: "/app/server.jar",
      appJarPath: path.join(os.tmpdir(), "server.jar"),
      appJarFileName: "server.jar",
      appStats: { size: 4096, sha256: "def" },
      dependencies: [dependency]
    });

    expect(manifest.remoteJarPath).toBe("/app/server.jar");
    expect(manifest.dependencies).toHaveLength(1);
    expect(formatDependenciesText(manifest)).toContain("org.springframework.boot:spring-boot:2.7.18");
  });
});
