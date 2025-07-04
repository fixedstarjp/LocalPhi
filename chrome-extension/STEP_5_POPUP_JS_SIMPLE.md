# 📄 ファイル5: popup.js (簡略版)

⚠️ **重要**: 完全版のpopup.jsは5.5MBです。まず簡略版で基本動作を確認してから、完全版の対処法を説明します。

以下の内容で `popup.js` ファイルを作成：

```javascript
// 簡略版 popup.js - 基本的なUI動作のみ

// WebLLM簡易モック（完全版では実際のWebLLMを使用）
class MockWebLLM {
    constructor() {
        this.isLoaded = false;
        this.loadingProgress = 0;
    }

    async loadModel() {
        // モデル読み込みのシミュレーション
        for (let i = 0; i <= 100; i += 20) {
            this.loadingProgress = i;
            await this.sleep(300);
            this.updateLoadingProgress(i);
        }
        this.isLoaded = true;
        this.updateModelStatus(true);
    }

    async chat(message) {
        if (!this.isLoaded) {
            throw new Error('モデルが読み込まれていません');
        }
        
        await this.sleep(1000);
        return `[簡略版] こんにちは！「${message}」についてお答えします。\n\n※これは簡略版です。完全版では実際のPhi-4 miniモデルが動作します。`;
    }

    async analyze(text) {
        if (!this.isLoaded) {
            throw new Error('モデルが読み込まれていません');
        }
        
        await this.sleep(1500);
        return `[簡略版] テキスト分析結果：\n\n文字数: ${text.length}\n単語数: ${text.split(/\s+/).length}\n\n主なトピック: ${text.substring(0, 100)}...\n\n※これは簡略版です。完全版では実際のPhi-4 miniモデルが詳細な分析を行います。`;
    }

    async translate(text) {
        if (!this.isLoaded) {
            throw new Error('モデルが読み込まれていません');
        }
        
        await this.sleep(1200);
        return `[簡略版] 翻訳結果：\n\n元のテキスト: ${text}\n\n翻訳: [${text}の日本語翻訳]\n\n※これは簡略版です。完全版では実際のPhi-4 miniモデルが高精度な翻訳を行います。`;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    updateLoadingProgress(progress) {
        const progressBar = document.getElementById('loadingProgress');
        const loadingBar = document.getElementById('loadingBar');
        
        if (progress > 0) {
            progressBar.style.display = 'block';
            loadingBar.style.width = `${progress}%`;
        } else {
            progressBar.style.display = 'none';
        }
    }

    updateModelStatus(isLoaded) {
        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');
        
        if (isLoaded) {
            statusDot.classList.add('loaded');
            statusText.textContent = '簡略版モデル 準備完了';
            this.enableButtons();
        } else {
            statusDot.classList.remove('loaded');
            statusText.textContent = 'モデル読み込み中...';
            this.disableButtons();
        }
    }

    enableButtons() {
        const buttons = [
            'sendButton',
            'analyzePageButton', 
            'summarizePageButton',
            'translateSelectedButton'
        ];
        
        buttons.forEach(id => {
            const button = document.getElementById(id);
            if (button) button.disabled = false;
        });
    }

    disableButtons() {
        const buttons = [
            'sendButton',
            'analyzePageButton',
            'summarizePageButton', 
            'translateSelectedButton'
        ];
        
        buttons.forEach(id => {
            const button = document.getElementById(id);
            if (button) button.disabled = true;
        });
    }
}

let webLLM;
let currentTab = 'chat';

// 初期化
document.addEventListener('DOMContentLoaded', async () => {
    webLLM = new MockWebLLM();
    
    // イベントリスナーの設定
    setupEventListeners();
    
    // モデル読み込み開始
    try {
        await webLLM.loadModel();
        console.log('簡略版モデルの読み込みが完了しました');
    } catch (error) {
        console.error('モデルの読み込みに失敗:', error);
        showError('モデルの読み込みに失敗しました: ' + error.message);
    }
});

function setupEventListeners() {
    // チャット機能
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    
    chatInput.addEventListener('input', () => {
        // 自動リサイズ
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 80) + 'px';
    });
    
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    sendButton.addEventListener('click', sendMessage);
    
    // 分析機能
    document.getElementById('analyzePageButton').addEventListener('click', analyzePage);
    document.getElementById('summarizePageButton').addEventListener('click', summarizePage);
    
    // 翻訳機能
    document.getElementById('translateSelectedButton').addEventListener('click', translateSelected);
}

function switchTab(tabName) {
    // タブの切り替え
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    currentTab = tabName;
}

async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // ユーザーメッセージを追加
    addMessage(message, 'user');
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    // 送信ボタンを無効化
    document.getElementById('sendButton').disabled = true;
    
    try {
        // AIからの応答を取得
        const response = await webLLM.chat(message);
        addMessage(response, 'ai');
    } catch (error) {
        addMessage('エラーが発生しました: ' + error.message, 'ai');
    } finally {
        // 送信ボタンを有効化
        if (webLLM.isLoaded) {
            document.getElementById('sendButton').disabled = false;
        }
    }
}

function addMessage(text, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function analyzePage() {
    showLoading('analysisResult');
    
    try {
        // 現在のページのテキストを取得（簡略版では固定テキスト）
        const pageText = 'サンプルページテキスト';
        const analysis = await webLLM.analyze(pageText);
        
        document.getElementById('analysisResult').textContent = analysis;
    } catch (error) {
        showError('ページの分析に失敗しました: ' + error.message, 'analysisResult');
    }
}

async function summarizePage() {
    showLoading('analysisResult');
    
    try {
        const pageText = 'サンプルページテキスト';
        const summary = await webLLM.chat(`次のテキストを要約してください：\n\n${pageText}`);
        
        document.getElementById('analysisResult').textContent = summary;
    } catch (error) {
        showError('ページの要約に失敗しました: ' + error.message, 'analysisResult');
    }
}

async function translateSelected() {
    showLoading('translationResult');
    
    try {
        // 選択されたテキストの取得（簡略版では固定テキスト）
        const selectedText = 'Hello, world!';
        
        const translation = await webLLM.translate(selectedText);
        document.getElementById('translationResult').textContent = translation;
    } catch (error) {
        showError('翻訳に失敗しました: ' + error.message, 'translationResult');
    }
}

function showLoading(elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '<div class="loading"></div> 処理中...';
}

function showError(message, elementId = null) {
    if (elementId) {
        const element = document.getElementById(elementId);
        element.innerHTML = `<div class="error">${message}</div>`;
    } else {
        console.error(message);
    }
}

// Chrome Extension API対応のためのグローバル関数
window.switchTab = switchTab;
```

**ファイルサイズ**: 約10KB (簡略版)

## 🎯 この簡略版でできること

✅ **基本UI動作**: タブ切り替え、ボタンクリック
✅ **モック応答**: 固定的なAI応答のシミュレーション  
✅ **Chrome拡張機能テスト**: インストール・表示確認
✅ **UI確認**: デザインとレイアウトの確認

## ⚠️ 制限事項

❌ **実際のWebLLM**: Phi-4 miniモデルは使用されません
❌ **高度なAI機能**: 実際の推論・分析・翻訳はできません
❌ **ページアクセス**: 実際のウェブページ情報は取得できません

## 🚀 完全版への移行

簡略版でChrome拡張機能の基本動作を確認後、完全版のpopup.js (5.5MB) を取得する方法を説明します。

✅ `popup.js`(簡略版) 作成完了後、アイコンファイルの準備に進みます。