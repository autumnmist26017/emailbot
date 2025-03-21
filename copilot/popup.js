document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('respondButton').addEventListener('click', () => {
      const emailContent = document.getElementById('emailContent').value;
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        console.log("Sending message to content script");
        chrome.tabs.sendMessage(tabs[0].id, {action: "respondToEmail", emailContent: emailContent}, (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          } else if (response && response.status) {
            console.log(response.status);
          } else {
            console.error('No response from content script');
          }
        });
      });
    });
});