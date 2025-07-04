# Chrome Extension - WeTransfer共有用ファイル

## 📁 ファイル構成
- `part1.txt` (5.4MB) - 分割されたファイルの1番目
- `part2.txt` (2.2MB) - 分割されたファイルの2番目  
- `reconstruct.py` - 再組み立てスクリプト

## 🚀 使用手順

### 1. ファイルダウンロード
すべてのファイル（part1.txt, part2.txt, reconstruct.py）をダウンロード

### 2. ファイル再組み立て
```bash
python3 reconstruct.py
```

### 3. Chrome拡張機能の解凍
```bash
tar -xzf ai-assistant-webllm.tar.gz
```

### 4. Chrome拡張機能インストール
1. `chrome://extensions/` を開く
2. 「デベロッパーモード」を有効化
3. 「パッケージ化されていない拡張機能を読み込む」
4. `dist` フォルダを選択

## 🔧 機能
- ✅ チャットインターフェース（Phi-4 Mini統合）
- ✅ テキスト分析・要約
- ✅ 選択テキストの日本語翻訳
- ✅ WebLLM統合済み（5.3MB bundled）

## 📝 注意
- 初回起動時、Phi-4 Miniモデルのダウンロードに時間がかかる場合があります
- WebLLMは約1.8GBのモデルをブラウザにキャッシュします