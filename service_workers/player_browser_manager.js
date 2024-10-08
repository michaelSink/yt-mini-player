// Manages the player and handles requests from player to the browser
console.log("Starting service worker player_browser_manager.js")

chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  console.log("Received message from player: ", message)

  chrome.tabs.query({url: "https://music.youtube.com/*"}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, message)
  })
})

chrome.action.onClicked.addListener(() => {
  console.log("Opening new player window")
  chrome.windows.create({
    url: '../player_controls.html',
    type: 'popup',
    width: 300,
    height: 130
  });
});
