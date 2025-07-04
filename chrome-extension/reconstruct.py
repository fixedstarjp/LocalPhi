#!/usr/bin/env python3
"""
Chrome拡張機能ファイル再構成スクリプト
GitHubからダウンロードした分割ファイルを結合します
"""
import base64
import os

def reconstruct_extension():
    print("🔧 Chrome拡張機能ファイルを再構成中...")
    
    # Base64ファイルを読み込み
    parts = []
    part_files = ['part1.txt', 'part2.txt']
    
    for part_file in part_files:
        if os.path.exists(part_file):
            print(f"📂 {part_file} を読み込み中...")
            with open(part_file, 'r') as f:
                parts.append(f.read().strip())
        else:
            print(f"❌ {part_file} が見つかりません")
            return False
    
    # Base64データを結合
    print("🔗 ファイルパーツを結合中...")
    for i, part in enumerate(parts):
        with open(f'extension_part_a{chr(97+i)}', 'wb') as f:
            f.write(base64.b64decode(part))
    
    # バイナリファイルを結合
    print("📦 最終ファイルを作成中...")
    with open('ai-assistant-webllm.tar.gz', 'wb') as output:
        for i in range(len(parts)):
            part_name = f'extension_part_a{chr(97+i)}'
            with open(part_name, 'rb') as f:
                output.write(f.read())
            # 一時ファイルを削除
            os.remove(part_name)
    
    # ファイルサイズを確認
    size = os.path.getsize('ai-assistant-webllm.tar.gz')
    print(f"✅ 成功! ai-assistant-webllm.tar.gz を作成しました ({size:,} bytes)")
    
    print("\n📋 次のステップ:")
    print("1. tar -xzf ai-assistant-webllm.tar.gz")
    print("2. Chrome拡張機能として dist フォルダを読み込み")
    
    return True

if __name__ == "__main__":
    reconstruct_extension()