// Interacts with the browser
console.log("Starting content script")

const nextButtonSelector = ".next-button"
const prevButtonSelector = ".previous-button"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message);
  let actionButton
  if (message == "next") {
    actionButton = document.querySelector(nextButtonSelector)
  } else if (message = "prev") {
    actionButton = document.querySelector(prevButtonSelector)
  }

  if (actionButton) {
    actionButton.click()
  }
});
