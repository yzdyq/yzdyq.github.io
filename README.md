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

## Cloudflare Pages

- Production branch：`main`
- Framework preset：Hugo
- Root directory：仓库根目录
- Build command：`git submodule update --init --recursive && hugo --gc --minify`
- Build output directory：`public`
- Environment variable：`HUGO_VERSION=0.170.0`

`public/` 已加入 `.gitignore`，不会提交到仓库。当前站点地址为 `https://yzdyq.pages.dev/`，并与 `hugo.yaml` 中的 `baseURL` 一致。推送到 GitHub 后由 Cloudflare Pages 自动构建和发布。
