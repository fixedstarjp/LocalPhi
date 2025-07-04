# 🚨 distフォルダアクセス問題の解決方法

## 🔍 問題の原因

**現在の状況**: `/app/chrome-extension/dist` フォルダは**Dockerコンテナ内**に存在
**問題**: ローカルのChromeブラウザからコンテナ内のファイルにアクセスできない

## 💡 解決方法

### 方法1: 圧縮ファイルをダウンロード・展開（推奨）

既に作成済みの圧縮ファイルを使用：

1. **圧縮ファイルの場所確認**:
   ```bash
   ls -la /app/chrome-extension/ai-assistant-webllm.tar.gz
   ```
   ファイルサイズ: 5.7MB

2. **ローカル環境で展開**:
   ```bash
   # ダウンロード後、ローカルで実行
   tar -xzf ai-assistant-webllm.tar.gz
   cd dist/
   ```

### 方法2: 個別ファイルをコピー

必要なファイルを個別にローカル環境に配置：

#### 必須ファイル一覧
```
chrome-extension-dist/
├── manifest.json
├── popup.html  
├── popup.js
├── background.js
├── content.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### 方法3: 新しいフォルダを作成してビルド

ローカル環境でプロジェクトをセットアップ：

```bash
# ローカル環境で実行
mkdir chrome-extension-webllm
cd chrome-extension-webllm

# 必要ファイルをコピー（Dockerから）
# または手動で作成
```

## 🎯 推奨手順（最も簡単）

### ステップ1: 圧縮ファイルの内容確認
```bash
# Dockerコンテナ内で実行
cd /app/chrome-extension
tar -tzf ai-assistant-webllm.tar.gz
```

### ステップ2: ローカル環境での準備
1. 圧縮ファイル `ai-assistant-webllm.tar.gz` をローカルマシンにダウンロード
2. ローカルで展開：
   ```bash
   tar -xzf ai-assistant-webllm.tar.gz
   ```
3. `dist/` フォルダが作成されることを確認

### ステップ3: Chrome拡張機能インストール
1. Chromeで `chrome://extensions/` を開く
2. 「開発者モード」を有効化
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. **ローカルの `dist/` フォルダ**を選択

## 🔧 代替手段

### 即座にテスト可能な方法

**新しいローカルディレクトリを作成**:

```bash
# ローカル環境で実行
mkdir ~/chrome-extension-test
cd ~/chrome-extension-test
```

そして以下のファイルを手動で作成（既存のものをコピー）:

1. `manifest.json` (891 bytes)
2. `popup.html` (10KB)  
3. `popup.js` (5.3MB)
4. `background.js` (6KB)
5. `content.js` (3KB)
6. `icons/` フォルダとアイコンファイル

## 📁 ファイル転送が必要な理由

**Docker環境の制約**:
- コンテナ内のファイルはホストOSから直接アクセス不可
- Chrome拡張機能はローカルファイルシステムのパスが必要
- セキュリティ上の理由でブラウザはコンテナ内ファイルにアクセス不可

## 🚀 次のステップ

1. **圧縮ファイルダウンロード** → `ai-assistant-webllm.tar.gz` (5.7MB)
2. **ローカル展開** → `tar -xzf ai-assistant-webllm.tar.gz`
3. **Chrome拡張機能インストール** → ローカルの `dist/` フォルダを指定

これで Phi-4 Mini Chrome拡張機能のテストを開始できます！