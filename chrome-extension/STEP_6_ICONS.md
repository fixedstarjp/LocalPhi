# 📄 ファイル6: アイコンファイル

## ⚠️ アイコンファイルサイズの問題

**各アイコンファイル**: 約613KB (画像が最適化されていない)

## 🎯 代替案: シンプルなアイコンの作成

### 方法1: オンラインアイコン生成
1. [Favicon.io](https://favicon.io/emoji-favicons/) を訪問
2. 🤖 絵文字を選択
3. サイズ16, 48, 128pxでダウンロード
4. `icon16.png`, `icon48.png`, `icon128.png` として保存

### 方法2: 単色アイコンの作成
任意の画像編集ソフトで以下のサイズの青い正方形を作成：
- `icon16.png`: 16x16px, 青色 (#667eea)
- `icon48.png`: 48x48px, 青色 (#667eea)  
- `icon128.png`: 128x128px, 青色 (#667eea)

### 方法3: 一時的にアイコンを無効化
`manifest.json`からアイコン設定を削除：

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
    "default_title": "AI Assistant"
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
  ]
}
```

## 🚀 テスト準備完了

アイコンファイル対応後、以下の構成でテスト可能：

```
chrome-extension-webllm/
├── manifest.json
├── popup.html  
├── popup.js (簡略版)
├── background.js
├── content.js
└── icons/ (optional)
    ├── icon16.png
    ├── icon48.png  
    └── icon128.png
```

## 🎯 Chrome拡張機能インストール手順

1. **Chrome拡張機能ページ**: `chrome://extensions/`
2. **開発者モード**: 右上のトグルをON
3. **読み込み**: 「パッケージ化されていない拡張機能を読み込む」
4. **フォルダ選択**: 作成した`chrome-extension-webllm`フォルダを選択

## ✅ 基本動作テスト

1. 拡張機能アイコンをクリック
2. ポップアップが表示されることを確認
3. 「モデル読み込み中...」→「簡略版モデル 準備完了」
4. 各タブ(チャット、分析、翻訳)の切り替え
5. チャット機能でメッセージ送信

成功すれば、基本的なChrome拡張機能として動作します！

## 🔄 完全版への移行

基本動作確認後、完全版の`popup.js` (5.5MB) を取得して実際のWebLLM機能をテストできます。