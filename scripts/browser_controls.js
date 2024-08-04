// Interacts with the browser
console.log("Starting content script")

const NEXT = 0;
const PREV = 1;
const PLAY_PAUSE = 2;

const ACTIONS = Object.freeze({
  [PLAY_PAUSE]: {
    name: "Play/Pause",
    browser_selector: "#play-pause-button"
  },
  [NEXT]: {
    name: "Next",
    browser_selector: ".next-button"
  },
  [PREV]: {
    name: "Previous",
    browser_selector: ".previous-button"
  }
})

chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  console.log("Message received in content script:", message);
  
  if (!ACTIONS.hasOwnProperty(message)) {
    console.log("Failed to find related action for message: ", message)
    return;
  }

  let action = ACTIONS[message]
  console.log("Found action from message: ", action.name)
  
  let actionElement = document.querySelector(action.browser_selector)
  if (!actionElement) {
    console.log("Failed to find element on browser using selector: ", action.browser_selector)
    return;
  }
  
  if (typeof(actionElement.click) !== 'function') {
    console.log(`Element found on screen does not have a click function for action: ${action.name}/${action.browser_selector}`)
    return;
  }
  
  actionElement.click()
});
