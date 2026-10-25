# Vibe Project

一个零依赖、零构建的静态站点：**一个 HTML 文件、一份样式表、一小段脚本**。
没有 `node_modules`，没有打包步骤，双击 `index.html` 就能看，推送到远端就能发布。

## 结构

```
.
├── index.html          # 全部内容
├── assets/
│   ├── styles.css      # 样式（浅色 / 深色主题，响应式）
│   └── app.js          # 主题切换、年份、仓库链接（全部可选）
├── .gitignore          # 忽略凭证、虚拟环境、数据库与本地数据
└── README.md
```

## 本地预览

直接打开 `index.html` 即可。若想用更接近线上的方式（相对路径、缓存头）：

```bash
# 任选其一
python -m http.server 8000
npx serve .
```

然后访问 <http://localhost:8000>。

## 部署

静态站点可以放在任何能发文件的地方：

| 方式 | 说明 |
| --- | --- |
| GitHub Pages | 仓库 Settings → Pages，选分支 `main`、目录 `/`（根目录）。公开仓库可用免费版 Pages。 |
| Netlify / Vercel | 拖入文件夹或连接仓库，无需构建命令，发布目录填 `.` |
| 自有服务器 | 把整个目录丢给 nginx / Caddy 的静态根目录即可。 |

### GitHub Pages 注意

- Pages 对**私有仓库**需要 GitHub Pro 及以上；免费账号需要仓库为公开。
- 仓库里放了 `.nojekyll`，避免 Jekyll 处理以 `_` 开头的路径。
- 发布后地址形如 `https://<用户名>.github.io/<仓库名>/`，通常 1–3 分钟生效。

## 维护

- 改文案：直接编辑 `index.html`。
- 换配色：编辑 `assets/styles.css` 顶部的 CSS 变量，浅色/深色各一份。
- 加内容：复制 `section` 块即可；导航栏在 `header .nav-links`。

## 安全

`.gitignore` 已排除 `.env*`、私钥、`venv/`、数据库文件和本地数据目录。
提交前请确保没有任何真实凭证进入版本库；一旦推送到远端，历史里就洗不掉了。
