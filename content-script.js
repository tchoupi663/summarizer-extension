const pdfjsLib = window.pdfjsLib || (() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.min.js";
    document.head.appendChild(script);
})();

// Function to extract the email body text
function extractEmailBody() {
    const emailBodyElement = document.querySelector(".ii.gt div");
    if (emailBodyElement) {
        return emailBodyElement.innerText.trim();
    }
    return "No email content found.";
}


function formatSummary(summary) {
    if (!summary) return "No summary available.";

    let headerLevel = 2;
    let formattedSummary = "";
    const lines = summary.split('\n');

    for (const line of lines) {
        if (line.startsWith("**")) {
            const headerText = line.replace(/^\*\*\s*/, ''); // Remove ** and leading spaces
            formattedSummary += `<h${headerLevel}>${headerText}</h${headerLevel}>`;
            headerLevel = Math.min(headerLevel + 1, 6); // Increment header level, max h6
        } else {
            formattedSummary += `<p>${line}</p>`;
        }
    }

    return formattedSummary;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSummary") {
        const emailBody = extractEmailBody();
        chrome.runtime.sendMessage({ action: 'summarizeText', text: emailBody }, response => {
            sendResponse({ summary: response.summary || "No summary generated" });
        });
    }
    return true;
});

