# 📄 ファイル3: background.js

以下の内容で `background.js` ファイルを作成：

```javascript
// Background Service Worker for AI Assistant Extension

// 拡張機能のインストール時
chrome.runtime.onInstalled.addListener(() => {
    console.log('AI Assistant Extension installed');
    
    // コンテキストメニューの作成
    chrome.contextMenus.create({
        id: 'translateText',
        title: 'このテキストを翻訳',
        contexts: ['selection']
    });
    
    chrome.contextMenus.create({
        id: 'analyzeText',
        title: 'このテキストを分析',
        contexts: ['selection']
    });
});

// コンテキストメニューのクリック処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'translateText') {
        handleTranslateRequest(info.selectionText, tab);
    } else if (info.menuItemId === 'analyzeText') {
        handleAnalyzeRequest(info.selectionText, tab);
    }
});

// 翻訳リクエストの処理
async function handleTranslateRequest(text, tab) {
    try {
        console.log('Translation request:', text);
        
        // 結果をコンテンツスクリプトに送信
        chrome.tabs.sendMessage(tab.id, {
            action: 'showTranslation',
            text: text,
            result: `翻訳結果: ${text}の日本語翻訳`
        });
    } catch (error) {
        console.error('Translation error:', error);
    }
}

// 分析リクエストの処理
async function handleAnalyzeRequest(text, tab) {
    try {
        console.log('Analysis request:', text);
        
        // 結果をコンテンツスクリプトに送信
        chrome.tabs.sendMessage(tab.id, {
            action: 'showAnalysis',
            text: text,
            result: `分析結果: ${text}の詳細分析`
        });
    } catch (error) {
        console.error('Analysis error:', error);
    }
}

// ポップアップからのメッセージ処理
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getActiveTab') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            sendResponse({ tab: tabs[0] });
        });
        return true; // 非同期レスポンスを示す
    }
    
    if (request.action === 'getSelectedText') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'getSelection' }, (response) => {
                sendResponse(response);
            });
        });
        return true;
    }
    
    if (request.action === 'getPageText') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'getPageText' }, (response) => {
                sendResponse(response);
            });
        });
        return true;
    }
});

// WebLLMの初期化（簡略版）
class WebLLMManager {
    constructor() {
        this.isInitialized = false;
        this.model = null;
    }
    
    async initialize() {
        try {
            console.log('Initializing WebLLM...');
            // 簡略版では初期化のみシミュレート
            this.isInitialized = true;
            console.log('WebLLM initialized successfully');
        } catch (error) {
            console.error('WebLLM initialization failed:', error);
            throw error;
        }
    }
    
    async chat(message) {
        if (!this.isInitialized) {
            throw new Error('WebLLM not initialized');
        }
        
        // 簡略版では固定レスポンス
        return `AI Response: ${message}`;
    }
}

// WebLLMマネージャーのインスタンス
const webLLMManager = new WebLLMManager();

// 拡張機能の起動時にWebLLMを初期化
chrome.runtime.onStartup.addListener(async () => {
    try {
        await webLLMManager.initialize();
    } catch (error) {
        console.error('Failed to initialize WebLLM on startup:', error);
    }
});
```

**ファイルサイズ**: 約3KB

✅ `background.js` 作成完了後、次のファイルに進みます。