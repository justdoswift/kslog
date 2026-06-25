# workctl

日常工作工具集 CLI。当前支持在本机终端登录 KubeSphere Console，加载 namespace、工作负载、Pod 和容器，然后下载 Kubernetes 当前保留的容器日志，或通过 exec 从 `/opt/saas-logs` 抽取历史日志。

## 一行安装

```bash
curl -fsSL https://raw.githubusercontent.com/justdoswift/workctl/main/install.sh | bash
```

默认安装到：

```text
~/.workctl/cli
~/.workctl/bin/workctl
```

如果安装后终端找不到 `workctl`，把下面这行加入 `~/.zshrc`：

```bash
export PATH="$HOME/.workctl/bin:$PATH"
```

验证安装：

```bash
workctl --version
workctl --help
```

自定义安装目录：

```bash
curl -fsSL https://raw.githubusercontent.com/justdoswift/workctl/main/install.sh | \
  WORKCTL_INSTALL_DIR="$HOME/.local/share/workctl" \
  WORKCTL_BIN_DIR="$HOME/.local/bin" \
  WORKCTL_REF="main" \
  bash
```

升级：

```bash
curl -fsSL https://raw.githubusercontent.com/justdoswift/workctl/main/install.sh | bash
```

卸载程序文件：

```bash
rm -rf ~/.workctl/cli ~/.workctl/bin/workctl
```

卸载不会删除 `~/.workctl/profiles.json`，避免误删已保存的环境账号。

从旧版 `kslog` 升级时，安装脚本会删除旧程序文件 `~/.kslog/cli` 和 `~/.kslog/bin/kslog`，但不会删除 `~/.kslog/profiles.json`。首次读取配置时，如果 `~/.workctl/profiles.json` 不存在，会自动从旧 profile 复制迁移。

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
workctl --help
```

取消全局命令：

```bash
npm unlink -g workctl
```

## 使用

完整交互流程：

```bash
workctl
```

启动后会先选择功能：

- K8s 日志
- 乐企接口

进入 K8s 日志时，会选择已保存环境，或者选择“新增环境”。新增环境需要填写 `name/url/username/password`，登录成功后会自动保存并设为默认环境。

验证登录：

```bash
workctl login-check --url http://192.168.7.191:30880 --username admin
```

下载指定工作负载日志：

```bash
workctl download \
  --url http://192.168.7.191:30880 \
  --username admin \
  --namespace tax-digital \
  --workload tax-invoice-business-server
```

如果不传 `--namespace`，交互列表会默认选中 `tax-digital`。如果不传 `--workload`，会直接展示全部工作负载供选择。旧参数 `--service` 仍可使用，会按工作负载名称处理。

下载当前容器日志：

```bash
workctl current \
  --url http://192.168.7.191:30880 \
  --username admin \
  --namespace tax-digital \
  --workload tax-invoice-business-server \
  --tail-lines 1000
```

下载历史日志，按日志内容日期抽取匹配行：

```bash
workctl history \
  --url http://192.168.7.191:30880 \
  --username admin \
  --namespace tax-digital \
  --workload tax-invoice-business-server \
  --date 2026-06-24
```

如果已知远端历史日志文件，可以直接指定，避免进入多选：

```bash
workctl history \
  --url http://192.168.7.191:30880 \
  --username admin \
  --namespace tax-digital \
  --workload tax-invoice-business-server \
  --date 2026-06-24 \
  --history-file /opt/saas-logs/tax-invoice-business-server-xxx.log
```

## 乐企接口

进入乐企接口工具：

```bash
workctl leqi
```

接口列表从 `tax_leqi_api_info` 读取，默认库连接信息为：

```text
host: 192.168.7.195
port: 3306
user: root
database: lxzsdb
```

数据库密码不会写进仓库。可以通过环境变量传入，或运行时按提示输入：

```bash
export WORKCTL_LEQI_DB_PASSWORD="..."
workctl leqi
```

选择接口后会填写 `taxPayerNo/testMode/reqDTO`，默认操作是导出可复制 curl。也可以直达：

```bash
workctl leqi \
  --api 200000001 \
  --tax-payer-no 91150100397352740W \
  --req-dto '{"ptbh":"1fc4107f168694d1efb5","nsrsbh":"91150100397352740W","sqlx":"1","sqed":20000000}' \
  --action curl
```

如果选择直接调用，工具会登录 KubeSphere，并默认进入 `tax-digital` 下的 `tax-api-proxy-server` Pod 执行集群内 curl。可用参数覆盖：

```bash
workctl leqi \
  --api 200000001 \
  --tax-payer-no 91150100397352740W \
  --req-dto '{"sqed":20000000}' \
  --action call \
  --profile 仿真环境 \
  --namespace tax-digital \
  --runner-workload tax-api-proxy-server
```

保存环境配置：

```bash
workctl profile add
workctl profile list
workctl profile use 测试环境
workctl --profile 测试环境
```

环境配置保存到：

```text
~/.workctl/profiles.json
```

按需求，`name/url/username/password` 会明文保存到这个 JSON 文件中，文件权限会设置为 `0600`。

下载时会显示进度信息。当前容器日志接口通常没有总大小，所以显示已下载大小、速度和耗时；历史日志会优先读取源文件大小，并显示已处理大小、总大小、速度和耗时。

默认保存到：

```text
~/Downloads/workctl/kubesphere-logs
```

不使用 `profile add` 时，密码、token、refreshToken 都只保存在当前进程内存里。
