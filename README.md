# Bookmarklet Tab Opener

[简体中文](#简体中文) | [English](#english)

---

## 简体中文

一个极简的 Edge / Chrome 浏览器扩展，用于将多个网址打包生成一个 JavaScript 书签（Bookmarklet）。点击生成的书签，即可一键批量打开所有预设的网页。

### ✨ 功能特性
- **批量打开**：输入多个网址，生成一个专属书签，左键点击瞬间全部弹出。
- **书签解析与覆盖**：支持读取浏览器现有书签，智能解析你之前生成的网页组，修改后原地覆盖更新。
- **防拦截延迟**：由于浏览器安全机制，一次性打开过多标签页会被拦截。内置延迟选项，让网页逐个弹出，绕过拦截。
- **自定义前缀**：支持为生成的书签添加自定义前缀（默认 `▶ `），方便与普通书签区分。
- **网址缩写**：可选功能，自动去除 `https://`、`www.` 等冗余字符，节省书签长度。
- **独立窗口**：输入面板为独立窗口，点击外部不会自动关闭，方便你随时复制其他标签页的网址。
- **纯本地运行**：不收集、不上传任何用户数据，代码完全开源。

### 🚀 安装方式
由于尚未上架官方扩展商店，您可以使用“开发者模式”加载：
1. 点击本仓库右上角的 `Code` -> `Download ZIP`，下载并解压。
2. 打开 Edge 浏览器，地址栏输入 `edge://extensions/` 并回车。
3. 开启左下角的 **“开发人员模式”**。
4. 点击 **“加载解压缩的扩展”**，选择你刚才解压的文件夹即可。

### 📖 使用方法
1. 点击扩展栏图标，在独立窗口中输入书签名称和网址列表（每行一个）。
2. 按需调整延迟、前缀等选项。
3. 点击“生成并保存到书签栏”。
4. 在浏览器书签栏找到刚才生成的书签，左键点击即可。

---

## English

A minimalist Edge / Chrome browser extension that packs multiple URLs into a JavaScript bookmarklet. Simply click the generated bookmark to open all preset web pages in new tabs simultaneously.

### ✨ Features
- **Batch Open**: Input multiple URLs to generate a dedicated bookmark. Left-click it and all pages pop up instantly.
- **Parse & Overwrite**: Search and read existing bookmarks, intelligently parse your previously generated web groups, and update them in place.
- **Anti-popup Blocker Delay**: Browser security may block opening too many tabs at once. The built-in delay option opens pages one by one to bypass this.
- **Custom Prefix**: Add a custom prefix (default `▶ `) to the generated bookmark to distinguish it from regular bookmarks.
- **URL Shortening**: Optional feature to remove redundant characters like `https://` and `www.`, saving bookmark length.
- **Standalone Window**: The input panel is a standalone window that won't close when you click outside, making it easy to copy URLs from other tabs.
- **100% Local & Private**: Does not collect or transmit any user data. Fully open source.

### 🚀 Installation
Since it's not yet available on the official extension store, use "Developer Mode" to load it:
1. Click `Code` -> `Download ZIP` at the top right of this repo, then extract it.
2. Open Edge browser, type `edge://extensions/` in the address bar.
3. Turn on **"Developer mode"** in the bottom left corner.
4. Click **"Load unpacked"** and select the extracted folder.

### 📖 Usage
1. Click the extension icon and fill in the bookmark name and URL list (one per line) in the standalone window.
2. Adjust settings like delay or prefix as needed.
3. Click "Generate and save to bookmarks".
4. Find the generated bookmark in your bookmarks bar and left-click it.

---

## 📄 License
[MIT License](LICENSE)