# 华炎魔方官网

- cn：<https://www.steedos.cn/>
- com：<https://www.steedos.com/>
- beta：<https://beta.steedos.cn/>

静态站点，基于 [Astro](https://astro.build)，框架与 [www.objectos.ai](https://www.objectos.ai) 一致。
所有内容都在仓库里，构建和运行时不再依赖云端 CMS。

## 目录

| 路径 | 内容 |
|---|---|
| `content/resources/<知识库>/<文档>.md` | 资源中心文档，URL 为 `/resources/<知识库>/<slug>` |
| `content/resources/_blogs.json` | 知识库列表 |
| `content/videos.json` | 视频合集与视频，URL 为 `/videos/<slug>`、`/embed/videos/<slug>` |
| `cms-export/pages/` | 从 Builder6 原样迁移的页面（HTML + 编译好的 Tailwind CSS），由 `src/pages/[...page].astro` 渲染 |
| `cms-export/urls.csv` | 旧站全部 URL 清单（含线上状态码、标题、描述），用于验收 |
| `src/pages/` | 路由：首页、资源中心、视频、应用商店（amis）、迁移页面 |
| `src/lib/site.ts` | 导航、页脚、站点常量 |
| `redirects.json` | 旧 URL 的 301 跳转规则，构建时生成 nginx 配置 |

## 开发

```sh
pnpm install
pnpm dev
```

## 构建与验收

```sh
pnpm check
pnpm build
pnpm verify:urls
```

`pnpm verify:urls` 会对照 `cms-export/urls.csv` 检查：旧站返回 200 的 URL 新站都有页面，旧站的跳转新站跳到同一个地方，并列出标题/描述的变化。
部署后也可以对线上环境做同样的检查：`node scripts/verify-urls.mjs --base https://beta.steedos.cn`。

## 从 CMS 重新导出内容

内容迁移期间如果 Builder6 里有修改，可以重新导出（只读，不会改动 CMS）：

```sh
npm i --prefix scripts   # 首次：安装图片压缩用的 sharp
pnpm export:cms
```

需要 `.env` 里的 `B6_CLOUD_PROJECT_SECRET`。原图缓存在 `cms-export/.cache/`（不提交），压缩后的 WebP 在 `public/images/cms/`。

## 部署

`Dockerfile` 先构建静态站点，再用 nginx 在 3000 端口提供服务（`docker/nginx.conf`），k8s 配置见 `deployment-k8s.yaml`。
页面以 `/a/b.html` 输出、以 `/a/b` 访问，URL 与旧站完全一致（无结尾斜杠）。

```sh
docker build -t steedos/steedos.com:latest .
```
