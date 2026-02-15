---
title: "VSCode Cheatsheet"
date: 2026-02-15
tags: 
  - "Cheatsheet/vscode"
---
Microsoft restricts its official Marketplace to its own products (the official VS Code, VS Code Insiders, and Azure Data Studio).

By default, `code-server` uses **Open VSX**, an open-source alternative registry. While many extensions are there, some Microsoft-owned ones are legally or technically barred from being hosted on it.

Here are the three ways to get those extensions working:

### 1. Manual Installation (.VSIX)

This is the most reliable "legal" method. You download the extension file directly and upload it to your container.

1. Go to the [VS Code Marketplace](https://marketplace.visualstudio.com/vscode).
2. Search for the extension (e.g., Python).
3. On the right-hand side, look for the **Download Extension** link (usually under "Resources").
4. In your `code-server` browser interface:
* Go to the **Extensions** tab.
* Click the **three dots (...)** in the top right of the extension pane.
* Select **Install from VSIX...** and upload the file you just downloaded.



### 2. Point to the Microsoft Marketplace (Environment Variable)

You can technically force `code-server` to use Microsoft’s gallery by setting an environment variable in your container.

> **Note:** This may technically violate Microsoft’s Terms of Service, so use it for personal labs only.

If you are using **Docker**, add this environment variable to your `docker run` command or `docker-compose.yml`:

```yaml
# In docker-compose.yml
environment:
  - EXTENSIONS_GALLERY={"serviceUrl":"https://marketplace.visualstudio.com/_apis/public/gallery","cacheUrl":"https://vscode.blob.core.windows.net/gallery/index","itemUrl":"https://marketplace.visualstudio.com/items"}

```

### 3. Use "OpenVSX" as a Fallback

Check [open-vsx.org](https://open-vsx.org/) first. Many popular community-maintained versions of Microsoft tools are published there. If you find the extension there but it's not showing up in your search, you might need to update your `code-server` to the latest version.

---

### Comparison of Methods

| Method | Ease of Use | Legality/TOS | Reliability |
| --- | --- | --- | --- |
| **Manual .VSIX** | Medium | ✅ Safe | High |
| **Open VSX** (Default) | High | ✅ Safe | Medium (Missing some MS tools) |
| **Gallery Variable** | High | ⚠️ Grey Area | High |

**Would you like me to show you how to automate the installation of specific extensions in your Dockerfile so they are there every time you rebuild the container?**