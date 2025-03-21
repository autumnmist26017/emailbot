console.log("Content script loaded");

function autoRespond(responseText) {
    const replyButton = document.querySelector('div[aria-label="Reply"]');
    if (replyButton) {
      replyButton.click();
      setTimeout(() => {
        const emailBody = document.querySelector('div[aria-label="Message Body"]');
        if (emailBody) {
          emailBody.innerHTML = responseText;
          const sendButton = document.querySelector('div[aria-label="Send ‪(Ctrl-Enter)‬"]');
          if (sendButton) {
            sendButton.click();
          }
        }
      }, 1000);
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "respondToEmail") {
      fetch('http://localhost:5001/generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({emailContent: request.emailContent})
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        autoRespond(data.responseText);
        sendResponse({status: "Email responded"});
      })
      .catch(error => {
        console.error('Fetch error:', error);
        sendResponse({status: "Error responding to email"});
      });
      return true;
    }
});