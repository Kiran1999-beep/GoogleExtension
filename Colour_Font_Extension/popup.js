document.getElementById('start-picker').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;
      if (url.startsWith('http://') || url.startsWith('https://')) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js']
        });
      } else {
        alert('This extension cannot run on this page.');
      }
    });
  });
  
  // Close the popup when the close button is clicked
  document.getElementById('close-popup').addEventListener('click', () => {
    window.close();
  });
  