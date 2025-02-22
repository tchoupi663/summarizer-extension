document.addEventListener("DOMContentLoaded", () => {
    const contentDiv = document.getElementById("content");

    // Send a message to the content script to get the page content (email or PDF)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(
            activeTab.id,
            { action: "getSummary" },
            (response) => {
                if (response && response.summary) {
                    contentDiv.innerHTML = response.summary;
                } else {
                    contentDiv.innerText = "Failed to summarize.";
                }
            }
        );
    });
});
