function extractEmailBody() {
    let emailBodyElement = document.querySelector(".ii.gt div");

    if (!emailBodyElement) {
        console.log("Trying alternate selector...");
        emailBodyElement = document.querySelector('[role="listitem"] div[dir="ltr"]');
    }

    return emailBodyElement ? emailBodyElement.innerText.trim() : "";
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extractEmail") {
        console.log("Extracting email body...");
        const emailText = extractEmailBody();
        sendResponse({ text: emailText });
    }
});
