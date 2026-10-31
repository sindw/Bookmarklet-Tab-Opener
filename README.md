# Bookmarklet Tab Opener

一个轻量级的 Edge / Chrome 扩展。将多个网址打包生成一个 JavaScript 书签。点击该标签即可一次性打开所有预设网页。

## 功能
- **批量打开**：点击生成的标签，一次性打开所有设定的网页。
- **读取修改**：搜索并读取浏览器现有书签（包括之前生成的网页组），修改后可原地覆盖。
- **防拦截延迟**：可设置间隔时间逐个打开网页，防止被浏览器拦截。
- **自定义前缀**：为书签添加文本前缀，以便与普通书签区分。
- **网址缩写**：可选去除 `https://` 和 `www.` 等字符，节省书签长度。
- **独立窗口**：输入面板为独立窗口，点击外部不会关闭。纯本地运行，不收集任何数据。

## 安装
1. 下载或 Clone 本仓库并解压。
2. 在 Edge 地址栏输入 `edge://extensions/` 并回车。
3. 打开左下角的“开发人员模式”。
4. 点击“加载解压缩的扩展”，选择解压后的文件夹。

## 使用
1. 点击扩展图标打开面板。
2. 输入书签名称和网址（每行一个）。
3. 点击“生成并保存到书签栏”。
4. 在浏览器书签栏找到对应书签，左键点击运行。

---
---

# Bookmarklet Tab Opener

A lightweight Edge / Chrome extension that packs multiple URLs into a single JavaScript bookmarklet. Click the generated bookmark to open all preset web pages at once.

## Features
- **Batch Open**: Click the generated bookmark to open all configured web pages simultaneously.
- **Parse & Overwrite**: Search and read existing browser bookmarks (including previously generated web groups) and overwrite them directly after editing.
- **Anti-popup Delay**: Set an interval to open pages one by one to bypass browser popup blockers.
- **Custom Prefix**: Add a text prefix to the bookmark to distinguish it from regular ones.
- **URL Shortening**: Optionally remove `https://` and `www.` to save bookmark length.
- **Standalone Window**: The input panel is a standalone window that won't close when you click outside. Runs completely locally and collects no data.

## Installation
1. Download or clone this repository and extract it.
2. Go to `edge://extensions/` in your browser.
3. Turn on "Developer mode" in the bottom left.
4. Click "Load unpacked" and select the extracted folder.

## Usage
1. Click the extension icon to open the panel.
2. Enter a bookmark name and URLs (one per line).
3. Click "Generate and save to bookmarks bar".
4. Find the bookmark on your bookmarks bar and left-click it.

## License
[MIT](LICENSE)