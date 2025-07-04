#!/usr/bin/env python3
import base64
import os

def reassemble_file():
    # チャンクファイルを順番に読み込み
    chunks = []
    chunk_files = ['chunk_aa', 'chunk_ab', 'chunk_ac', 'chunk_ad', 
                   'chunk_ae', 'chunk_af', 'chunk_ag', 'chunk_ah']
    
    print("チャンクファイルを読み込み中...")
    for chunk_file in chunk_files:
        if os.path.exists(chunk_file):
            with open(chunk_file, 'r') as f:
                chunks.append(f.read())
            print(f"✓ {chunk_file} 読み込み完了")
        else:
            print(f"✗ {chunk_file} が見つかりません")
            return False
    
    # 全チャンクを結合
    print("チャンクを結合中...")
    combined_base64 = ''.join(chunks)
    
    # Base64デコード
    print("Base64デコード中...")
    try:
        decoded_data = base64.b64decode(combined_base64)
        with open('ai-assistant-webllm.tar.gz', 'wb') as f:
            f.write(decoded_data)
        print("✓ ai-assistant-webllm.tar.gz を作成しました")
        print(f"ファイルサイズ: {len(decoded_data)} bytes")
        return True
    except Exception as e:
        print(f"✗ エラー: {e}")
        return False

if __name__ == "__main__":
    if reassemble_file():
        print("\n成功！次のコマンドで解凍してください:")
        print("tar -xzf ai-assistant-webllm.tar.gz")
    else:
        print("\n失敗しました。全てのチャンクファイルが揃っているか確認してください。")