# 🔍 distフォルダの場所とアクセス方法

## 📁 現在のフォルダ構成

✅ **distフォルダは存在しています！** 

正確なパス: `/app/chrome-extension/dist`

## 📋 フォルダの内容確認

```
/app/chrome-extension/dist/
├── manifest.json (891 bytes)
├── popup.html (10KB)  
├── popup.js (5.3MB - WebLLM統合)
├── background.js (6KB)
├── content.js (3KB)
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── その他ソースマップファイル
```

## 🚀 Chrome拡張機能インストール手順（詳細版）

### 手順1: Chromeを開く
- Google Chromeブラウザを起動

### 手順2: 拡張機能管理画面にアクセス
以下のいずれかの方法で：

**方法A: アドレスバー直接入力**
```
chrome://extensions/
```

**方法B: メニューから**
1. 右上の ⋮ (3点メニュー)をクリック
2. 「その他のツール」→「拡張機能」

### 手順3: 開発者モードを有効化
- 右上の「開発者モード」トグルをクリック
- トグルが青色になることを確認

### 手順4: 拡張機能を読み込む

**重要**: 「パッケージ化されていない拡張機能を読み込む」をクリック

### 手順5: フォルダを選択

この画面で以下のパスのフォルダを選択：
```
/app/chrome-extension/dist
```

**注意**: `dist`フォルダ自体を選択してください（親フォルダではありません）

## 🖥️ ローカル環境でのアクセス方法

もしDockerコンテナ内で作業している場合：

### オプション1: フォルダをホスト環境にコピー
```bash
# ホスト環境で実行
docker cp <container_id>:/app/chrome-extension/dist ./chrome-extension-dist
```

### オプション2: 圧縮ファイルを使用
既に作成済みの圧縮ファイルを展開：
```bash
tar -xzf /app/chrome-extension/ai-assistant-webllm.tar.gz
```

## 🔧 トラブルシューティング

### 問題1: フォルダが選択できない
**原因**: ファイルを選択しようとしている
**解決**: フォルダ全体を選択する

### 問題2: 権限エラー
**原因**: フォルダの権限問題
**解決**: 
```bash
chmod -R 755 /app/chrome-extension/dist
```

### 問題3: ファイルが見つからない
**確認コマンド**:
```bash
ls -la /app/chrome-extension/dist/
```

## 🎯 確認チェックリスト

拡張機能読み込み前に以下を確認：

- [ ] `/app/chrome-extension/dist` フォルダが存在
- [ ] `manifest.json` が含まれている
- [ ] `popup.html` が含まれている  
- [ ] `popup.js` が含まれている（5.3MB）
- [ ] `background.js` が含まれている
- [ ] `icons/` フォルダが含まれている

## 🚀 成功の確認方法

拡張機能が正常に読み込まれると：

1. ✅ 拡張機能一覧に「AI Assistant - WebLLM」が表示
2. ✅ Chromeツールバーにアイコンが追加  
3. ✅ アイコンクリックでポップアップが開く

現在のdistフォルダは完全に準備できているので、上記手順でインストールできるはずです！