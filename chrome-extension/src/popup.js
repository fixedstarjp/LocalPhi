// WebLLM関連のモック実装（実際のWebLLMは後で実装）
class MockWebLLM {
    constructor() {
        this.isLoaded = false;
        this.loadingProgress = 0;
    }

    async loadModel() {
        // モデル読み込みのシミュレーション
        for (let i = 0; i <= 100; i += 10) {
            this.loadingProgress = i;
            await this.sleep(200);
            this.updateLoadingProgress(i);
        }
        this.isLoaded = true;
        this.updateModelStatus(true);
    }

    async chat(message) {
        if (!this.isLoaded) {
            throw new Error('モデルが読み込まれていません');
        }
        
        // 簡単なモック応答
        await this.sleep(1000);
        return `こんにちは！「${message}」についてお答えします。これはモックの応答です。実際のPhi-4 miniモデルが実装されると、より高度な応答が可能になります。`;
    }

    async analyze(text) {
        if (!this.isLoaded) {
            throw new Error('モデルが読み込まれていません');
        }
        
        await this.sleep(1500);
        return `テキスト分析結果：\n\n文字数: ${text.length}\n単語数: ${text.split(/\s+/).length}\n\n主なトピック: ${text.substring(0, 100)}...\n\nこれはモックの分析結果です。実際のPhi-4 miniモデルでは、より詳細な分析が可能になります。`;
    }

    async translate(text) {
        if (!this.isLoaded) {
            throw new Error('モデルが読み込まれていません');
        }
        
        await this.sleep(1200);
        return `翻訳結果：\n\n元のテキスト: ${text}\n\n翻訳: [${text}の日本語翻訳]\n\nこれはモックの翻訳結果です。実際のPhi-4 miniモデルでは、より正確な翻訳が可能になります。`;
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
            statusText.textContent = 'Phi-4 Mini 準備完了';
            this.enableButtons();
        } else {
            statusDot.classList.remove('loaded');
            statusText.textContent = 'モデル読み込み中...';
            this.disableButtons();
        }
    }

    enableButtons() {
        document.getElementById('sendButton').disabled = false;
        document.getElementById('analyzePageButton').disabled = false;
        document.getElementById('summarizePageButton').disabled = false;
        document.getElementById('translateSelectedButton').disabled = false;
    }

    disableButtons() {
        document.getElementById('sendButton').disabled = true;
        document.getElementById('analyzePageButton').disabled = true;
        document.getElementById('summarizePageButton').disabled = true;
        document.getElementById('translateSelectedButton').disabled = true;
    }
}

// グローバル変数
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
        console.log('モデルの読み込みが完了しました');
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
        document.getElementById('sendButton').disabled = false;
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
        // 現在のページのテキストを取得
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const result = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                return document.body.innerText.substring(0, 5000); // 最初の5000文字
            }
        });
        
        const pageText = result[0].result;
        const analysis = await webLLM.analyze(pageText);
        
        document.getElementById('analysisResult').textContent = analysis;
    } catch (error) {
        showError('ページの分析に失敗しました: ' + error.message, 'analysisResult');
    }
}

async function summarizePage() {
    showLoading('analysisResult');
    
    try {
        // 現在のページのテキストを取得
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const result = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                return document.body.innerText.substring(0, 3000); // 最初の3000文字
            }
        });
        
        const pageText = result[0].result;
        const summary = await webLLM.chat(`次のテキストを要約してください：\n\n${pageText}`);
        
        document.getElementById('analysisResult').textContent = summary;
    } catch (error) {
        showError('ページの要約に失敗しました: ' + error.message, 'analysisResult');
    }
}

async function translateSelected() {
    showLoading('translationResult');
    
    try {
        // 選択されたテキストを取得
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const result = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                return window.getSelection().toString();
            }
        });
        
        const selectedText = result[0].result;
        
        if (!selectedText) {
            throw new Error('テキストが選択されていません');
        }
        
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

function showSuccess(message, elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = `<div class="success">${message}</div>`;
}