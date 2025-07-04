# 🚀 Chrome拡張機能ファイル提供開始

## 📁 ローカル環境でのフォルダ準備

まず、ローカル環境で以下のフォルダ構造を作成してください：

```bash
mkdir chrome-extension-webllm
cd chrome-extension-webllm
mkdir icons
```

## 📄 ファイル1: manifest.json

以下の内容で `manifest.json` ファイルを作成：

```json
{
  "manifest_version": 3,
  "name": "AI Assistant - WebLLM",
  "version": "1.0.0",
  "description": "AI Assistant with local Phi-4 mini model for chat, text analysis, and translation",
  "permissions": [
    "storage",
    "activeTab",
    "scripting",
    "contextMenus"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_title": "AI Assistant",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ],
  "web_accessible_resources": [
    {
      "resources": ["scripts/*", "models/*"],
      "matches": ["<all_urls>"]
    }
  ],
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

**ファイルサイズ**: 891 bytes

✅ `manifest.json` 作成完了後、次のファイルに進みます。

次は `popup.html` を提供します。