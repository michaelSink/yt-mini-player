// Listens for input from the browser
console.log("Loading player controls")

const nextButton = document.getElementById("next-button")
const prevButton = document.getElementById("prev-button")
const playPauseButton = document.getElementById("play-pause")

function sendAction(action) {
  console.log("Sending request to browser manager")
  chrome.runtime.sendMessage(action)  
}

nextButton.addEventListener("click", () => sendAction(0))
prevButton.addEventListener("click", () => sendAction(1))
playPauseButton.addEventListener("click", () => sendAction(2))
