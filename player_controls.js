// Listens for input from the browser
console.log("Loading player controls")

const nextButton = document.getElementById("next-song")
const prevButton = document.getElementById("prev-song")

function sendAction(action) {
  console.log("Sending request to browser manager")
  chrome.runtime.sendMessage(action, (response) => {
    console.log(response)
  })  
}

nextButton.addEventListener("click", () => sendAction("next"))
prevButton.addEventListener("click", () => sendAction("prev"))
