const API_KEY = 'AIzaSyCjifYfNLu7y7shBMBA4-kPkyqldOBoodk'; // Replace with your actual Gemini API key

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'summarizeText' && request.text) {
        console.log("Background received text:", request.text);
        summarizeText(request.text)
            .then((summary) => {
                sendResponse({ summary: summary });
            })
            .catch((error) => {
                console.error("Error summarizing text:", error);
                sendResponse({ summary: "Error summarizing text." });
            });
        return true; // Indicate asynchronous response
    }
});


async function summarizeText(text) {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    const headers = {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY
    };

    const data = {
        contents: [{
            parts: [
                {
                    text: `Summarize the text, highlighting any company name, any dates and times. This 
                    is the text: ${text}`
                }
            ]
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts[0].text) {
            return result.candidates[0].content.parts[0].text;
        } else {
            throw new Error("Unexpected API response: " + JSON.stringify(result));
        }


    } catch (error) {
        console.error("Error during fetch:", error);
        throw error; // Re-throw to be caught by the caller
    }
}