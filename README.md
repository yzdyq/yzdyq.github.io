# 个人博客

基于 Hugo 和 Reimu。主题作为 Git 子模块管理；站点内容、主题配置和自定义素材彼此分开，之后更换主题时可以继续保留文章。

## 本地预览

```powershell
hugo server -D
```

新增文章：

```powershell
hugo new content post/my-post.md
```

需要 Hugo Extended 0.158.0 或更高版本。新文章模板默认设置 `draft: false`；若要先保存草稿，改成 `true`。

图片放在 `static/images/`，文章中使用 `/images/文件名.webp`。头像放在 `static/avatar/`。目前站点使用自制的渐变头像和封面，不使用主题演示图片或文章。

## Giscus

在 GitHub 仓库启用 Discussions 并安装 Giscus App，然后在 giscus.app 中选择仓库和分类，将提供的 `repoId`、`category` 和 `categoryId` 填入 `hugo.yaml`。当前评论映射方式为 `pathname`。

## Cloudflare Pages

- Production branch：`main`
- Framework preset：Hugo
- Root directory：仓库根目录
- Build command：`git submodule update --init --recursive && hugo --gc --minify`
- Build output directory：`public`
- Environment variable：`HUGO_VERSION=0.170.0`（使用 Extended 版本）

`public/` 已加入 `.gitignore`，不会提交到仓库。当前站点地址为 `https://yzdyq.pages.dev/`，并与 `hugo.yaml` 中的 `baseURL` 一致。推送到 GitHub 后由 Cloudflare Pages 自动构建和发布。

## 背景音乐

Reimu 自带 APlayer。拿到可公开使用的音频后，将文件放在 `static/music/`，然后在 `config/_default/params.yml` 中启用播放器并配置音轨。浏览器通常会阻止未经交互的有声自动播放，因此访客可能需要手动点播放。
