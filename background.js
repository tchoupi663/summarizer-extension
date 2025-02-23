const API_KEY = 'AIzaSyCjifYfNLu7y7shBMBA4-kPkyqldOBoodk'; // Replace with your actual Gemini API key

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarizeText" && request.text) {
        summarizeText(request.text).then(summary => {
            sendResponse({ summary: summary });

            chrome.runtime.sendMessage({ action: "showSummary", summary: summary });
        }).catch(error => {
            console.error("Error summarizing:", error);
            sendResponse({ summary: "Error summarizing text." });
        });
        return true; // Indica risposta asincrona
    }
});

async function summarizeText(text) {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    const headers = {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY
    };

    const data = {
        contents: [{ parts: [{ text: `Summarize this text while being as concise as possible, with as little information loss as possible: ${text}` }] }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        return result?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available.";
    } catch (error) {
        console.error("API request failed:", error);
        return "Error fetching summary.";
    }
}