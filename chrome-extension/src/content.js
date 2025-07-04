// Content Script for AI Assistant Extension

// メッセージリスナーの設定
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSelection') {
        const selectedText = window.getSelection().toString();
        sendResponse({ text: selectedText });
    }
    
    if (request.action === 'getPageText') {
        const pageText = document.body.innerText;
        sendResponse({ text: pageText });
    }
    
    if (request.action === 'showTranslation') {
        showOverlay('翻訳結果', request.result);
    }
    
    if (request.action === 'showAnalysis') {
        showOverlay('分析結果', request.result);
    }
    
    return true;
});

// オーバーレイの表示
function showOverlay(title, content) {
    // 既存のオーバーレイを削除
    const existingOverlay = document.getElementById('ai-assistant-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // オーバーレイの作成
    const overlay = document.createElement('div');
    overlay.id = 'ai-assistant-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 350px;
        max-height: 400px;
        background: white;
        border: 2px solid #667eea;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        overflow: hidden;
        animation: slideIn 0.3s ease;
    `;
    
    // アニメーションの追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // ヘッダーの作成
    const header = document.createElement('div');
    header.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    titleElement.style.cssText = `
        margin: 0;
        font-size: 16px;
        font-weight: 600;
    `;
    
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
    `;
    
    closeButton.addEventListener('click', () => {
        overlay.remove();
    });
    
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.backgroundColor = 'rgba(255,255,255,0.2)';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.backgroundColor = 'transparent';
    });
    
    header.appendChild(titleElement);
    header.appendChild(closeButton);
    
    // コンテンツの作成
    const contentElement = document.createElement('div');
    contentElement.style.cssText = `
        padding: 20px;
        max-height: 300px;
        overflow-y: auto;
        line-height: 1.6;
        font-size: 14px;
        color: #333;
    `;
    contentElement.textContent = content;
    
    // オーバーレイの組み立て
    overlay.appendChild(header);
    overlay.appendChild(contentElement);
    
    // ページに追加
    document.body.appendChild(overlay);
    
    // 5秒後に自動的に閉じる
    setTimeout(() => {
        if (overlay && overlay.parentNode) {
            overlay.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
        }
    }, 5000);
    
    // slideOutアニメーションの追加
    style.textContent += `
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
}

// ページの読み込み完了後に実行
document.addEventListener('DOMContentLoaded', () => {
    console.log('AI Assistant content script loaded');
});

// 動的に読み込まれたコンテンツにも対応
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('AI Assistant content script loaded');
    });
} else {
    console.log('AI Assistant content script loaded');
}