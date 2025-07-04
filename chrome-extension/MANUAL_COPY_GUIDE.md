# 🛠️ Chrome拡張機能 手動ファイル作成ガイド

## 📋 作成手順

### ステップ1: ローカルフォルダの準備
```bash
# ローカル環境で実行
mkdir chrome-extension-webllm
cd chrome-extension-webllm
mkdir icons
```

### ステップ2: 必要ファイル一覧

以下のファイルを順番に作成してください：

1. ✅ `manifest.json` (891 bytes)
2. ✅ `popup.html` (10KB)
3. ⚠️ `popup.js` (5.3MB - 大きなファイル)
4. ✅ `background.js` (6KB)
5. ✅ `content.js` (3KB)
6. ✅ アイコンファイル (3個)

### ステップ3: ファイル作成の注意点

**重要**: `popup.js`は5.3MBと非常に大きなファイルです（WebLLMライブラリを含むため）
- 手動コピーは現実的でない可能性があります
- 代替案も用意しています

## 🎯 実行戦略

**推奨**: 小さなファイルから開始して、popup.jsの問題を後で解決

次のメッセージで、各ファイルの内容を順番に提供します。