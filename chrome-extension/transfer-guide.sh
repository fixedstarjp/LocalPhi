#!/bin/bash
# Chrome Extension Transfer Script

echo "🔧 Chrome拡張機能ファイル転送スクリプト"
echo "========================================="

# ファイル存在確認
if [ ! -f "ai-assistant-webllm.tar.gz" ]; then
    echo "❌ ai-assistant-webllm.tar.gz が見つかりません"
    exit 1
fi

echo "📁 元ファイル: $(ls -lh ai-assistant-webllm.tar.gz | awk '{print $5}')"

# WeTransfer用の説明
echo ""
echo "🌐 WeTransfer共有手順:"
echo "1. https://wetransfer.com/ にアクセス"
echo "2. このtar.gzファイルをアップロード"
echo "3. 生成されたリンクを相手に送信"
echo ""

# Google Drive用の説明
echo "💾 Google Drive共有手順:"
echo "1. drive.google.com にアクセス"
echo "2. ファイルをアップロード"
echo "3. 共有リンクを生成"
echo ""

# Dropbox用の説明
echo "📦 Dropbox共有手順:"
echo "1. dropbox.com にアクセス"
echo "2. ファイルをアップロード"  
echo "3. 共有リンクを生成"
echo ""

echo "✅ アップロード後、リンクを共有してください！"