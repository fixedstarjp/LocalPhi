# 📁 ファイル1: manifest.json

ローカル環境で `manifest.json` ファイルを作成してください：

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
**作成方法**: テキストエディタで上記内容をコピー＆ペーストして保存

---

次のメッセージで `popup.html` を提供します。