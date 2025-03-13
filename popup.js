document.addEventListener("DOMContentLoaded", () => {
    const summaryDiv = document.getElementById("summary");
    const inputBox = document.getElementById("input-text");
    const summarizeButton = document.getElementById("summarize-btn");
    const emailSummarizeButton = document.getElementById("email-summarize-btn");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].url.includes("mail.google.com")) {

            summaryDiv.style.display = "block";
            inputBox.style.display = "none";
            summarizeButton.style.display = "none";
            emailSummarizeButton.style.display = "block";

            emailSummarizeButton.addEventListener("click", () => {
                chrome.tabs.sendMessage(tabs[0].id, { action: "extractEmail" }, (response) => {
                    if (response && response.text) {
                        chrome.runtime.sendMessage({ action: "summarizeText", text: response.text }, (res) => {
                            summaryDiv.innerText = res.summary || "pas de sommaire dispo.";
                        });
                    } else {
                        summaryDiv.innerText = "pas de texte email trouvé.";
                    }
                });
            });

        } else {
            summaryDiv.style.display = "none";
            inputBox.style.display = "block";
            summarizeButton.style.display = "block";
            emailSummarizeButton.style.display = "none";
        }
    });

    summarizeButton.addEventListener("click", () => {
        const text = inputBox.value.trim();
        if (!text) return;

        chrome.runtime.sendMessage({ action: "summarizeText", text: text }, (response) => {
            summaryDiv.innerText = response.summary || "pas de sommaire dispo.";
            summaryDiv.style.display = "block";
        });
    });
});
