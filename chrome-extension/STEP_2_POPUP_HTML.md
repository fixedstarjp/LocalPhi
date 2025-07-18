# 📄 ファイル2: popup.html

以下の内容で `popup.html` ファイルを作成：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Assistant</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            width: 400px;
            min-height: 500px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            overflow-x: hidden;
        }

        .header {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .header h1 {
            color: white;
            font-size: 24px;
            margin-bottom: 8px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .model-status {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 10px;
        }

        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #ff6b6b;
            transition: all 0.3s ease;
        }

        .status-dot.loaded {
            background: #51cf66;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }

        .status-text {
            color: white;
            font-size: 12px;
            opacity: 0.9;
        }

        .loading-progress {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            overflow: hidden;
            margin-top: 10px;
            display: none;
        }

        .loading-bar {
            height: 100%;
            background: linear-gradient(90deg, #51cf66, #40c057);
            border-radius: 2px;
            transition: width 0.3s ease;
            width: 0%;
        }

        .tabs {
            display: flex;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
        }

        .tab {
            flex: 1;
            padding: 12px;
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
            border-bottom: 2px solid transparent;
        }

        .tab.active {
            color: white;
            border-bottom-color: #51cf66;
            background: rgba(255, 255, 255, 0.1);
        }

        .tab:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
        }

        .tab-content {
            display: none;
            padding: 20px;
            background: white;
            min-height: 350px;
        }

        .tab-content.active {
            display: block;
        }

        .chat-container {
            display: flex;
            flex-direction: column;
            height: 350px;
        }

        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 10px 0;
            margin-bottom: 15px;
            max-height: 250px;
        }

        .message {
            margin-bottom: 15px;
            padding: 12px;
            border-radius: 12px;
            max-width: 90%;
            word-wrap: break-word;
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .message.user {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            margin-left: auto;
            border-bottom-right-radius: 4px;
        }

        .message.ai {
            background: #f8f9fa;
            color: #333;
            border: 1px solid #e9ecef;
            border-bottom-left-radius: 4px;
        }

        .chat-input-container {
            display: flex;
            gap: 10px;
            align-items: flex-end;
        }

        .chat-input {
            flex: 1;
            padding: 12px;
            border: 2px solid #e9ecef;
            border-radius: 20px;
            resize: none;
            font-family: inherit;
            font-size: 14px;
            transition: all 0.3s ease;
            max-height: 80px;
        }

        .chat-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .send-button {
            padding: 12px 16px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
        }

        .send-button:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .send-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .feature-section {
            margin-bottom: 20px;
        }

        .feature-title {
            font-size: 16px;
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
        }

        .feature-button {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
            margin-bottom: 10px;
        }

        .feature-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .feature-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .result-area {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 12px;
            margin-top: 10px;
            min-height: 100px;
            white-space: pre-wrap;
            font-size: 14px;
            line-height: 1.5;
        }

        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 2px solid #f3f3f3;
            border-top: 2px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .error {
            color: #dc3545;
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            padding: 10px;
            border-radius: 4px;
            margin-top: 10px;
            font-size: 14px;
        }

        .success {
            color: #155724;
            background: #d4edda;
            border: 1px solid #c3e6cb;
            padding: 10px;
            border-radius: 4px;
            margin-top: 10px;
            font-size: 14px;
        }

        .scroll-smooth {
            scroll-behavior: smooth;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🤖 AI Assistant</h1>
        <div class="model-status">
            <div class="status-dot" id="statusDot"></div>
            <span class="status-text" id="statusText">モデル読み込み中...</span>
        </div>
        <div class="loading-progress" id="loadingProgress">
            <div class="loading-bar" id="loadingBar"></div>
        </div>
    </div>

    <div class="tabs">
        <button class="tab active" onclick="switchTab('chat')">チャット</button>
        <button class="tab" onclick="switchTab('analysis')">分析</button>
        <button class="tab" onclick="switchTab('translation')">翻訳</button>
    </div>

    <div id="chat" class="tab-content active">
        <div class="chat-container">
            <div class="chat-messages scroll-smooth" id="chatMessages">
                <div class="message ai">
                    こんにちは！AI アシスタントです。何かお手伝いできることはありますか？
                </div>
            </div>
            <div class="chat-input-container">
                <textarea class="chat-input" id="chatInput" placeholder="メッセージを入力してください..." rows="1"></textarea>
                <button class="send-button" id="sendButton" disabled>
                    ➤
                </button>
            </div>
        </div>
    </div>

    <div id="analysis" class="tab-content">
        <div class="feature-section">
            <h3 class="feature-title">ウェブページ分析</h3>
            <button class="feature-button" id="analyzePageButton" disabled>
                現在のページを分析する
            </button>
            <button class="feature-button" id="summarizePageButton" disabled>
                現在のページを要約する
            </button>
            <div class="result-area" id="analysisResult">
                分析結果がここに表示されます...
            </div>
        </div>
    </div>

    <div id="translation" class="tab-content">
        <div class="feature-section">
            <h3 class="feature-title">テキスト翻訳</h3>
            <button class="feature-button" id="translateSelectedButton" disabled>
                選択したテキストを翻訳する
            </button>
            <div class="result-area" id="translationResult">
                翻訳結果がここに表示されます...
            </div>
        </div>
    </div>

    <script src="popup.js"></script>
</body>
</html>
```

**ファイルサイズ**: 10,324 bytes (約10KB)

✅ `popup.html` 作成完了後、次のファイルに進みます。