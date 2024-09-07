// Listens for input from the browser
console.log("Loading player controls")

const slider = document.getElementById("slider")
const nextButton = document.getElementById("next-button")
const prevButton = document.getElementById("prev-button")
const playPauseButton = document.getElementById("play-pause")

function sendAction(action) {
  console.log("Sending request to browser manager", action)
  chrome.runtime.sendMessage(action)
}

nextButton.addEventListener("click", () => sendAction(NEXT_ACTION))
prevButton.addEventListener("click", () => sendAction(PREV_ACTION))
playPauseButton.addEventListener("click", () => sendAction(PLAY_PAUSE_ACTION))

slider.addEventListener("input", sendVolumeChangeRequest)

function sendVolumeChangeRequest(event) {
  sendAction(createVolumeChangeAction(event.target.value))
}


// Actions
const NEXT_ACTION = {
  "action-id" : 0
}

const PREV_ACTION = {
  "action-id" : 1
}

const PLAY_PAUSE_ACTION = {
  "action-id" : 2
}

const VOLUME_CHANGE_ACTION = {
  "action-id" : 3,
  "volume" : 50
}

function createVolumeChangeAction(volume) {
  let action = VOLUME_CHANGE_ACTION
  action.volume = volume

  return action
}
