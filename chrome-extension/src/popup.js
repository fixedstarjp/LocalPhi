// WebLLM実装 - @mlc-ai/web-llm を使用してPhi-4 miniモデルを実装
import { CreateMLCEngine } from '@mlc-ai/web-llm';

class WebLLMEngine {
    constructor() {
        this.engine = null;
        this.isLoaded = false;
        this.loadingProgress = 0;
        this.modelId = "Phi-4-Mini-3.8B-Instruct-q4f32_1-MLC";
    }

    async loadModel() {
        try {
            console.log('WebLLMエンジンを初期化中...');
            
            // WebLLMエンジンの作成
            this.engine = await CreateMLCEngine(
                this.modelId,
                {
                    initProgressCallback: (progress) => {
                        this.loadingProgress = progress.progress * 100;
                        this.updateLoadingProgress(this.loadingProgress);
                        console.log(`モデル読み込み進捗: ${this.loadingProgress.toFixed(1)}%`);
                    }
                }
            );
            
            this.isLoaded = true;
            this.updateModelStatus(true);
            console.log('WebLLMエンジンの初期化が完了しました');
            
        } catch (error) {
            console.error('WebLLMエンジンの初期化に失敗:', error);
            this.updateModelStatus(false);
            throw error;
        }
    }

    async chat(message) {
        if (!this.isLoaded || !this.engine) {
            throw new Error('WebLLMエンジンが初期化されていません');
        }

        try {
            const messages = [
                { role: 'user', content: message }
            ];

            const response = await this.engine.chat.completions.create({
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000
            });

            return response.choices[0].message.content;
        } catch (error) {
            console.error('チャット応答の生成に失敗:', error);
            throw error;
        }
    }

    async analyze(text) {
        const systemPrompt = `あなたは優秀なテキスト分析者です。与えられたテキストを分析し、以下の項目について詳細にレポートしてください：
1. 主要なトピック
2. 文章の感情とトーン
3. 重要なキーワード
4. 文章の構造と特徴
5. 要約`;

        return await this.chatWithSystem(`次のテキストを分析してください：\n\n${text}`, systemPrompt);
    }

    async translate(text) {
        const systemPrompt = `あなたは優秀な翻訳者です。与えられたテキストを自然で正確な日本語に翻訳してください。
文脈を考慮し、適切な敬語レベルを使用してください。`;

        return await this.chatWithSystem(`次のテキストを日本語に翻訳してください：\n\n${text}`, systemPrompt);
    }

    async chatWithSystem(message, systemPrompt) {
        if (!this.isLoaded || !this.engine) {
            throw new Error('WebLLMエンジンが初期化されていません');
        }

        try {
            const messages = [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ];

            const response = await this.engine.chat.completions.create({
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000
            });

            return response.choices[0].message.content;
        } catch (error) {
            console.error('システムプロンプト付きチャット応答の生成に失敗:', error);
            throw error;
        }
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
    webLLM = new WebLLMEngine();
    
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