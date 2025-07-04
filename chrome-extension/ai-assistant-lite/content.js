// Content script for text selection
/* global chrome */

// Listen for text selection
document.addEventListener('mouseup', function() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        // Store selected text for popup to access
        chrome.storage.local.set({selectedText: selectedText});
    }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSelectedText') {
        const selectedText = window.getSelection().toString().trim();
        sendResponse({text: selectedText});
    }
});