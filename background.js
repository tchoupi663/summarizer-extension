const API_KEY = 'AIzaSyCjifYfNLu7y7shBMBA4-kPkyqldOBoodk';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarizeText" && request.text) {
        summarizeText(request.text).then(summary => {
            sendResponse({ summary: summary });

            chrome.runtime.sendMessage({ action: "showSummary", summary: summary });
        }).catch(error => {
            console.error("Erreur synthetisation:", error);
            sendResponse({ summary: "Erreur synthetisation." });
        });
        return true;
    }
});

async function summarizeText(text) {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    const headers = {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY
    };

    const data = {
        contents: [{ parts: [{ text: `Summarize this text while being as concise as possible, with as little information loss as possible, in the same language as the text: ${text}` }] }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`Erreur HTTP! status: ${response.status}`);

        const result = await response.json();
        return result?.candidates?.[0]?.content?.parts?.[0]?.text || "Pas de sommaire dispo.";
    } catch (error) {
        console.error("Erreur API:", error);
        return "Erreur API.";
    }
}