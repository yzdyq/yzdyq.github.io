# YZDYQ 的博客

这是一个使用 Hugo 和 Reimu 主题构建的中文个人静态博客。本文也是项目交接说明：接手任务前，请先阅读“接手任务指南”和“当前项目状态”，再根据需要查阅[项目文件说明](./项目文件说明.md)。

## 接手任务指南

1. 确认当前工作目录是仓库根目录 `D:\code\web\start`，先检查 Git 状态和已有改动；保留用户未提交的修改，不要覆盖或回滚。
2. 先阅读本 README 和[项目文件说明](./项目文件说明.md)，再核对与任务直接相关的源文件及主题配置；不要仅凭旧笔记推断当前状态。
3. 只修改完成任务所需的源文件。文章在 `content/`，站点配置在 `hugo.yaml`，Reimu 参数在 `config/_default/params.yml`，自有图片在 `static/`。
4. 修改后运行适当的 Hugo 构建或预览命令，报告验证结果和未能验证的事项。不要直接改生成目录。
5. 未经用户明确要求，不要提交或推送更改，不要执行主题升级、删除子模块或其他大范围清理。

## 项目概况

- **站点名称：**YZDYQ 的博客
- **技术栈：**Hugo Extended + Reimu Hugo 主题
- **主要语言：**简体中文
- **正式站点地址：**<https://yzdyq.pages.dev/>
- **内容地址格式：**文章使用 `/posts/:slug/`，当前首篇文章地址为 `/posts/hello-world/`
- **主题管理：**Git 子模块；当前选用 `themes/reimu`。`themes/PaperMod` 是未启用的旧主题子模块。
- **发布方式：**配置为推送 GitHub `main` 分支后由 Cloudflare Pages 构建和发布。实际部署状态应以 Cloudflare 控制台及最新部署记录为准。

## 当前项目状态

- 当前有一篇正式文章：`content/post/hello-world.md`。其 `slug: hello-world` 和 Giscus 的 `pathname` 评论映射共同维持现有文章 URL 与评论关联；改 slug 前要先确认迁移需求。
- 新文章模板位于 `archetypes/default.md`，默认 `draft: false`、`comments: true`。新建文章后请检查标题、日期、草稿状态、评论开关和 slug。
- Giscus 已在主题参数中启用，实际参数位于 `config/_default/params.yml`，评论关联 GitHub Discussions。不要猜测或随意改动 `repoId`、`categoryId`。
- 头像和首页/默认封面使用项目自有 SVG，分别位于 `static/avatar/avatar.svg` 和 `static/images/site-cover.svg`。默认封面列表在 `data/covers.yml`。
- APlayer 当前关闭，尚无音轨。搜索页 `content/search.md` 是占位页，不代表搜索功能已完成。
- `my_site/新建文本文档.html` 是独立练习文件，不属于 Hugo 内容，不会自动发布为博客页面。
- 根目录的 `明日继续.md` 是本机续作笔记，可能记录较早的主题或部署状态。若与当前配置、本文档或线上实际情况冲突，不要照旧笔记执行。

## 目录速览

| 路径 | 用途 |
| --- | --- |
| `hugo.yaml` | Hugo 站点设置：站点地址、标题、语言、当前主题、文章 URL 和输出格式 |
| `config/_default/params.yml` | Reimu 外观、菜单、侧栏、Giscus、播放器等主题参数 |
| `content/post/` | 博客文章和文章分区元数据 |
| `content/archives/` | 归档页元数据 |
| `content/search.md` | 搜索占位页 |
| `archetypes/default.md` | `hugo new content` 创建内容时使用的默认模板 |
| `static/` | 原样复制到站点根路径的自有静态文件，如图片 |
| `data/covers.yml` | Reimu 默认封面候选图片列表 |
| `themes/reimu/` | 当前启用的 Reimu 主题 Git 子模块 |
| `themes/PaperMod/` | 未启用的 PaperMod 主题 Git 子模块 |
| `public/` | Hugo 构建输出，已忽略，不要手工编辑或提交 |
| `resources/` | Hugo 资源处理缓存，已忽略，不要手工编辑或提交 |
| `项目文件说明.md` | 仓库自有文件的详细用途、修改范围及注意事项 |

主题是独立的上游代码。除非任务明确要求修改主题，否则优先使用配置；确需覆盖模板或样式时，在项目自己的 `layouts/` 或 `assets/` 中实现，不要直接改主题子模块文件。

## 本地开发

需要 **Hugo Extended 0.158.0 或更高版本**。仓库配置的 Cloudflare 版本是 `HUGO_VERSION=0.170.0`；本地和线上构建版本应尽量保持一致。首次检出或主题目录为空时，先初始化子模块：

```powershell
Set-Location 'D:\code\web\start'
git submodule update --init --recursive
```

本地预览（包含草稿）：

```powershell
hugo server -D
```

生产构建检查：

```powershell
hugo --gc --minify
```

构建结果写入 `public/`。若构建失败，先确认安装的是 Hugo **Extended** 版本、主题子模块已检出，再根据错误信息处理；不要通过修改 `public/` 绕过源文件问题。

## 常见修改

### 新建文章

```powershell
hugo new content post/my-post.md
```

检查生成文件中的 front matter，再编写正文。`draft: true` 的文章是草稿；正式发布应确认设为 `false`。设置 `slug` 会决定文章固定 URL，删除或更改现有文章的 slug 可能影响旧链接和按 pathname 关联的 Giscus 评论。

### 添加图片

- 文章图片或站点图片放在 `static/images/`，例如 `static/images/photo.webp` 对应站点路径 `/images/photo.webp`。
- 头像放在 `static/avatar/`，并同步修改 `config/_default/params.yml` 中的 `avatar`。
- 更改首页横幅或默认封面时，检查 `params.yml` 的 `banner`、`cover` 以及 `data/covers.yml` 是否需要同步。

### 修改评论设置

Giscus 配置在 `config/_default/params.yml`，不是 `hugo.yaml`。更改仓库或 Discussions 分类前，先从 Giscus 的真实设置确认仓库、分类和 ID；文章评论是否显示还受文章 front matter 中 `comments` 控制。

## 部署

仓库记录的 Cloudflare Pages 预期配置：

- Production branch：`main`
- Root directory：仓库根目录
- Build command：`git submodule update --init --recursive && hugo --gc --minify`
- Build output directory：`public`
- Environment variable：`HUGO_VERSION=0.170.0`（使用 Extended 版本）

`hugo.yaml` 中的 `baseURL` 当前为 `https://yzdyq.pages.dev/`。若站点域名或 Cloudflare 项目配置发生变化，应核实线上实际设置，并相应更新 `baseURL` 和本文档。推送到 `main` 会按 Cloudflare 配置触发部署；除非用户要求，不要替用户提交或推送。

## 文件说明与协作约定

更细的逐文件说明见[项目文件说明](./项目文件说明.md)。README 是项目协作和交接入口，不会作为文章发布。新增或移除主要目录、改变构建/部署方式、评论设置或新文章流程时，请同步更新本文档及相关说明。
