document.addEventListener("DOMContentLoaded", () => {
    const emailContentDiv = document.getElementById("email-content");

    // Send a message to the content script to get the email body
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(
            activeTab.id,
            { action: "getSummary" },
            (response) => {
                if (response && response.summary) {
                    emailContentDiv.innerHTML = response.summary; // Use innerHTML
                } else {
                    emailContentDiv.innerText = "Failed to summarize.";
                }
            }
        );
    });
});