#!/bin/bash

# Chrome拡張機能のテストスクリプト

echo "🧪 Chrome拡張機能 テスト開始"
echo "=================================="

# 1. ファイル構造の確認
echo "📁 ファイル構造確認:"
cd /app/chrome-extension/dist
ls -la

echo ""
echo "📊 ファイルサイズ:"
du -h popup.js
du -h background.js
du -h content.js
du -h manifest.json

# 2. manifest.jsonの検証
echo ""
echo "📋 Manifest検証:"
if command -v jq &> /dev/null; then
    echo "✅ manifest.jsonの構文チェック:"
    jq . manifest.json > /dev/null && echo "   - JSON構文: OK" || echo "   - JSON構文: ERROR"
    
    echo "📝 基本情報:"
    echo "   - 名前: $(jq -r '.name' manifest.json)"
    echo "   - バージョン: $(jq -r '.version' manifest.json)"
    echo "   - Manifest Version: $(jq -r '.manifest_version' manifest.json)"
    
    echo "🔐 権限:"
    jq -r '.permissions[]' manifest.json | sed 's/^/   - /'
else
    echo "⚠️ jqが利用できません。基本的な確認のみ:"
    head -5 manifest.json
fi

# 3. 必須ファイルの存在確認
echo ""
echo "✅ 必須ファイル確認:"
files=("manifest.json" "popup.html" "popup.js" "background.js" "content.js")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file - OK"
    else
        echo "   ❌ $file - MISSING"
    fi
done

# 4. アイコンファイルの確認
echo ""
echo "🎨 アイコンファイル確認:"
icon_sizes=("16" "48" "128")
for size in "${icon_sizes[@]}"; do
    icon_file="icons/icon${size}.png"
    if [ -f "$icon_file" ]; then
        file_size=$(du -h "$icon_file" | cut -f1)
        echo "   ✅ icon${size}.png - $file_size"
    else
        echo "   ❌ icon${size}.png - MISSING"
    fi
done

# 5. JavaScript構文の基本チェック
echo ""
echo "📝 JavaScript構文チェック:"
if command -v node &> /dev/null; then
    # background.jsのチェック
    echo "   Background Script:"
    if node -c background.js 2>/dev/null; then
        echo "   ✅ background.js - 構文OK"
    else
        echo "   ❌ background.js - 構文エラー"
    fi
    
    # content.jsのチェック
    echo "   Content Script:"
    if node -c content.js 2>/dev/null; then
        echo "   ✅ content.js - 構文OK"
    else
        echo "   ❌ content.js - 構文エラー"
    fi
else
    echo "   ⚠️ Node.jsが利用できません"
fi

echo ""
echo "🚀 Chrome拡張機能インストール準備完了！"
echo "=================================="
echo ""
echo "📖 次のステップ:"
echo "1. Chromeで chrome://extensions/ を開く"
echo "2. 「開発者モード」を有効にする"
echo "3. 「パッケージ化されていない拡張機能を読み込む」をクリック"
echo "4. このフォルダを選択: $(pwd)"
echo ""
echo "⚠️  注意事項:"
echo "- WebGPU対応ブラウザが必要"
echo "- 初回起動時はモデルダウンロードで時間がかかります"
echo "- インターネット接続が必要（初回のみ）"