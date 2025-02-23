document.addEventListener("DOMContentLoaded", () => {
    const summaryDiv = document.getElementById("summary");
    const inputBox = document.getElementById("input-text");
    const summarizeButton = document.getElementById("summarize-btn");
    const emailSummarizeButton = document.getElementById("email-summarize-btn");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].url.includes("mail.google.com")) {
            console.log("User is on Gmail. Showing email summary button.");

            summaryDiv.style.display = "block";
            inputBox.style.display = "none";
            summarizeButton.style.display = "none";
            emailSummarizeButton.style.display = "block";

            emailSummarizeButton.addEventListener("click", () => {
                console.log("Summarizing email...");
                chrome.tabs.sendMessage(tabs[0].id, { action: "extractEmail" }, (response) => {
                    if (response && response.text) {
                        console.log("Email extracted:", response.text);
                        chrome.runtime.sendMessage({ action: "summarizeText", text: response.text }, (res) => {
                            console.log("Summary received:", res.summary);
                            summaryDiv.innerText = res.summary || "No summary available.";
                        });
                    } else {
                        console.log("No email text found.");
                        summaryDiv.innerText = "No email text found.";
                    }
                });
            });

        } else {
            console.log("User is NOT on Gmail. Showing manual summary input.");
            summaryDiv.style.display = "none";
            inputBox.style.display = "block";
            summarizeButton.style.display = "block";
            emailSummarizeButton.style.display = "none";
        }
    });

    summarizeButton.addEventListener("click", () => {
        const text = inputBox.value.trim();
        if (!text) return;

        console.log("Summarizing manual input...");
        chrome.runtime.sendMessage({ action: "summarizeText", text: text }, (response) => {
            console.log("Manual summary received:", response);
            summaryDiv.innerText = response.summary || "No summary available.";
            summaryDiv.style.display = "block";
        });
    });
});
