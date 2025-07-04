// Background script for AI Assistant Chrome Extension
/* global chrome */

chrome.runtime.onInstalled.addListener(() => {
    console.log('AI Assistant Extension installed');
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSelectedText') {
        // Forward selected text to popup if needed
        sendResponse({status: 'received'});
    }
});