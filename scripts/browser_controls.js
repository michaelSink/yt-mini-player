// Interacts with the browser
console.log("Starting content script")

const NEXT = 0;
const PREV = 1;
const PLAY_PAUSE = 2;
const VOLUME_CHANGE = 3;

const ACTIONS = Object.freeze({
  [PLAY_PAUSE]: {
    name: "Play/Pause",
    browser_selector: "#play-pause-button",
  },
  [NEXT]: {
    name: "Next",
    browser_selector: ".next-button",
  },
  [PREV]: {
    name: "Previous",
    browser_selector: ".previous-button",
  },
  [VOLUME_CHANGE] : {
    name : "Volume Change",
    browser_selector: "#volume-slider",
  }
})

chrome.runtime.onMessage.addListener((actionRequest, _sender, _sendResponse) => {
  console.log("Message received in content script:", actionRequest);
 
  if (typeof(actionRequest) != 'object') {
    console.log("Received message in not an object.")
    return;
  }

  if (!actionRequest.hasOwnProperty("action-id")) {
    console.log("Received action does not have an ID.")
    return
  }

  let actionId = actionRequest['action-id']
  if (!ACTIONS.hasOwnProperty(actionId)) {
    console.log("Failed to find related action.")
    return;
  }

  let action = ACTIONS[actionId]
  console.log("Found action from message: ", action.name)
  
  let actionElement = document.querySelector(action.browser_selector)
  if (!actionElement) {
    console.log("Failed to find element on browser using selector: ", action.browser_selector)
    return;
  }

  switch (actionId) {
    case NEXT:
    case PREV:
    case PLAY_PAUSE:
      performClickAction(actionElement)
    case VOLUME_CHANGE:
      performVolumeChangeAction(actionElement, actionRequest)
  }

});

function performClickAction(actionElement) {
  if (typeof(actionElement.click) !== 'function') {
    console.log(`Element found on screen does not have a click function for action: ${actionElement}`)
    return;
  }

  actionElement.click()
}

function performVolumeChangeAction(actionElement, actionRequest) {
  let volumeChangeEvent = new Event('change')
    
  if (!actionRequest.hasOwnProperty('volume')) {
    console.log("Change colume request did not contain a new volume.")
    return;
  }

  let volume = Number.parseInt(actionRequest.volume)

  if (!Number.isInteger(volume)) {
    console.log("Requested volume is not an integer.")
    return;
  }

  actionElement.setAttribute('value', volume)
  actionElement.dispatchEvent(new Event('change'))
}