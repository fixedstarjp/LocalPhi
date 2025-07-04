// Tab switching
document.addEventListener('DOMContentLoaded', function() {
    console.log('Popup loaded');
    
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            console.log('Tab clicked:', tab.getAttribute('data-tab'));
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Event listeners for buttons
    const sendButton = document.getElementById('sendButton');
    const analyzeButton = document.getElementById('analyzeButton');
    const translateButton = document.getElementById('translateButton');
    const chatInput = document.getElementById('chatInput');
    
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    
    if (analyzeButton) {
        analyzeButton.addEventListener('click', analyzeText);
    }
    
    if (translateButton) {
        translateButton.addEventListener('click', translateText);
    }
    
    // Handle Enter key in chat
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Mock AI responses (to be replaced with WebLLM)
const mockResponses = [
    "これは興味深い質問ですね。WebLLMが統合されると、より詳細な回答を提供できます。",
    "申し訳ありませんが、現在はデモモードです。実際のAI機能は後日追加されます。",
    "良い質問です！Phi-4 Miniモデルが読み込まれると、より正確な回答が可能になります。",
    "現在モックデータで動作しています。WebLLM統合後、リアルタイムでAIが応答します。"
];

function sendMessage() {
    console.log('Send message called');
    const input = document.getElementById('chatInput');
    const container = document.getElementById('chatContainer');
    const message = input.value.trim();
    
    if (!message) return;
    
    console.log('Sending message:', message);
    
    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-message';
    userDiv.textContent = message;
    container.appendChild(userDiv);
    
    // Clear input
    input.value = '';
    
    // Add mock AI response after delay
    setTimeout(() => {
        const aiDiv = document.createElement('div');
        aiDiv.className = 'message ai-message';
        aiDiv.textContent = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        container.appendChild(aiDiv);
        container.scrollTop = container.scrollHeight;
    }, 1000);
    
    container.scrollTop = container.scrollHeight;
}

function analyzeText() {
    console.log('Analyze text called');
    const text = document.getElementById('analysisText').value;
    const result = document.getElementById('analysisResult');
    
    if (!text.trim()) {
        result.innerHTML = '<p style="color: red;">テキストを入力してください。</p>';
        return;
    }
    
    // Mock analysis
    result.innerHTML = `
        <h4>分析結果 (モック)</h4>
        <p><strong>文字数:</strong> ${text.length}</p>
        <p><strong>単語数:</strong> ${text.split(/\s+/).length}</p>
        <p><strong>要約:</strong> WebLLM統合後、AIによる高度な分析が可能になります。</p>
        <p><strong>感情:</strong> 中性的</p>
    `;
}

function translateText() {
    console.log('Translate text called');
    const text = document.getElementById('translateText').value;
    const result = document.getElementById('translateResult');
    
    if (!text.trim()) {
        result.innerHTML = '<p style="color: red;">翻訳するテキストを入力してください。</p>';
        return;
    }
    
    // Mock translation
    result.innerHTML = `
        <h4>翻訳結果 (モック)</h4>
        <p><strong>原文:</strong> ${text}</p>
        <p><strong>日本語訳:</strong> [WebLLM統合後、実際の翻訳が表示されます]</p>
        <p style="color: #666; font-size: 12px;">※ 現在はデモモードです</p>
    `;
}