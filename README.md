# kslog

KubeSphere 日志下载命令行工具。它在本机终端登录 KubeSphere Console，加载 namespace、工作负载、Pod 和容器，然后下载 Kubernetes 当前保留的容器日志，或通过 exec 从 `/opt/saas-logs` 抽取历史日志。

## 一行安装

```bash
curl -fsSL https://raw.githubusercontent.com/justdoswift/kslog/main/install.sh | bash
```

默认安装到：

```text
~/.kslog/cli
~/.kslog/bin/kslog
```

如果安装后终端找不到 `kslog`，把下面这行加入 `~/.zshrc`：

```bash
export PATH="$HOME/.kslog/bin:$PATH"
```

验证安装：

```bash
kslog --version
kslog --help
```

自定义安装目录：

```bash
curl -fsSL https://raw.githubusercontent.com/justdoswift/kslog/main/install.sh | \
  KSLOG_INSTALL_DIR="$HOME/.local/share/kslog" \
  KSLOG_BIN_DIR="$HOME/.local/bin" \
  KSLOG_REF="main" \
  bash
```

升级：

```bash
curl -fsSL https://raw.githubusercontent.com/justdoswift/kslog/main/install.sh | bash
```

卸载程序文件：

```bash
rm -rf ~/.kslog/cli ~/.kslog/bin/kslog
```

卸载不会删除 `~/.kslog/profiles.json`，避免误删已保存的环境账号。

## 本地开发

```bash
npm install
npm run build
```

开发运行：

```bash
npm run dev
```

构建后运行：

```bash
node dist/cli.js
```

注册成全局命令：

```bash
npm link
kslog --help
```

取消全局命令：

```bash
npm unlink -g kslog
```

## 使用

完整交互流程：

```bash
kslog
```

启动后会先选择已保存环境，或者选择“新增环境”。新增环境需要填写 `name/url/username/password`，登录成功后会自动保存并设为默认环境。

验证登录：

```bash
kslog login-check --url http://192.168.7.191:30880 --username admin
```

下载指定工作负载日志：

```bash
kslog download \
  --url http://192.168.7.191:30880 \
  --username admin \
  --namespace tax-digital \
  --workload tax-invoice-business-server
```

如果不传 `--namespace`，交互列表会默认选中 `tax-digital`。如果不传 `--workload`，会直接展示全部工作负载供选择。旧参数 `--service` 仍可使用，会按工作负载名称处理。

下载当前容器日志：

```bash
kslog current \
  --url http://192.168.7.191:30880 \
  --username admin \
  --namespace tax-digital \
  --workload tax-invoice-business-server \
  --tail-lines 1000
```

下载历史日志，按日志内容日期抽取匹配行：

```bash
kslog history \
  --url http://192.168.7.191:30880 \
  --username admin \
  --namespace tax-digital \
  --workload tax-invoice-business-server \
  --date 2026-06-24
```

如果已知远端历史日志文件，可以直接指定，避免进入多选：

```bash
kslog history \
  --url http://192.168.7.191:30880 \
  --username admin \
  --namespace tax-digital \
  --workload tax-invoice-business-server \
  --date 2026-06-24 \
  --history-file /opt/saas-logs/tax-invoice-business-server-xxx.log
```

保存环境配置：

```bash
kslog profile add
kslog profile list
kslog profile use 测试环境
kslog --profile 测试环境
```

环境配置保存到：

```text
~/.kslog/profiles.json
```

按需求，`name/url/username/password` 会明文保存到这个 JSON 文件中，文件权限会设置为 `0600`。

下载时会显示进度信息。当前容器日志接口通常没有总大小，所以显示已下载大小、速度和耗时；历史日志会优先读取源文件大小，并显示已处理大小、总大小、速度和耗时。

默认保存到：

```text
~/Downloads/kubesphere-logs
```

不使用 `profile add` 时，密码、token、refreshToken 都只保存在当前进程内存里。
