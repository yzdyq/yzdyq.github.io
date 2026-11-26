# 个人博客

基于 Hugo 和 PaperMod。主题作为 Git 子模块管理。

## 本地预览

```powershell
hugo server -D
```

新增文章：

```powershell
hugo new content posts/my-post.md
```

默认文章 front matter 为 `draft: false`。

## Giscus

在 GitHub 仓库启用 Discussions 并安装 Giscus App，然后在 giscus.app 中选择仓库和分类，将提供的 `repoId`、`category` 和 `categoryId` 填入 `hugo.yaml`。当前评论映射方式为 `pathname`。

## Cloudflare Workers

Worker 使用 Wrangler 托管 Hugo 生成的静态文件。`wrangler.toml` 中的 `[build]` 会按 `HUGO_VERSION` 下载并运行 Hugo，`[assets]` 将 `./public` 指定为静态资源目录；`keep_vars = true` 可保留控制台中配置的 Worker 变量。

```powershell
npx wrangler deploy
```

`public/` 已加入 `.gitignore`，不会提交到仓库。`HUGO_VERSION=0.170.0` 同时作为 Worker 变量写入 Wrangler 配置，并由构建脚本用于下载对应的 Hugo 版本。
