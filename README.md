# 论文网页版（GitHub Pages）

本目录是论文《Tracing biological priors in cancer drug response prediction》／《癌症药物响应预测中生物先验的作用路径》的静态网页版，内容由 `paper_v2` 的
LaTeX 稿自动生成，图表编号、公式编号与引文编号均与正式 PDF 一致。配套代码仓库：
<https://github.com/TonyWu1201/GDGN>。

## 目录结构

```
index.html        英文页面
zh/index.html     中文页面
assets/css/       样式
assets/js/        公式渲染与目录高亮
assets/figures/   矢量图（SVG，由 figures/*.pdf 转换）
assets/pdf/       正式 PDF（来自 release/）
assets/source/    可独立编译的 LaTeX 源码包
assets/vendor/    KaTeX（本地化，离线可用）
.nojekyll         关闭 GitHub Pages 的 Jekyll 处理
```

## 本地预览

在本目录运行任意静态服务器即可，例如：

```bash
python3 -m http.server 8000
```

然后访问 <http://localhost:8000/>。直接双击 `index.html` 也能阅读，但建议以
HTTP 方式打开。

## 发布到 GitHub Pages

最简方式是把本目录内容作为独立仓库的根目录发布：

1. 新建 GitHub 仓库（例如 `GDGN-paper`）；
2. 在本目录初始化并推送：

   ```bash
   git init
   git add -A
   git commit -m "Publish paper website"
   git branch -M main
   git remote add origin git@github.com:<用户名>/GDGN-paper.git
   git push -u origin main
   ```

3. 打开仓库 Settings → Pages，Build and deployment 选择
   “Deploy from a branch”，Branch 选 `main`、目录选 `/ (root)`，保存；
4. 稍候访问 `https://<用户名>.github.io/GDGN-paper/`。

如果论文网站需要保留在更大的仓库中，可改用 GitHub Actions，在仓库根目录添加
`.github/workflows/pages.yml`，把本目录作为 Pages 构件上传：

```yaml
name: Deploy paper site
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/checkout@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: publish
      - uses: actions/deploy-pages@v4
```

随后在 Settings → Pages 中选择 “GitHub Actions” 作为 Source。

## 重新生成

论文修改后，在 `paper_v2` 根目录运行：

```bash
python3 scripts/build_publish.py
```

脚本会重新解析 `manuscript_en`、`manuscript_zh`、`tables/`、`main.bbl` 与
`release/` 中的产物并覆盖本目录内容（`assets/vendor` 中的 KaTeX 会复用，不会
重复下载）。若离线，可加 `--offline` 参数，此时公式渲染改用 CDN。
