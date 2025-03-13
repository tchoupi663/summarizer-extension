# Synthesia Extension

Synthesia is a Chrome extension designed to summarize email content from Gmail, as well as making it easy to paste in long texts and get a summary directly.

## Features

- Extracts email body text from Gmail.
- Summarizes the email content, highlighting company names, dates, and times.
- Displays the summary in a popup.
- If not on an email page, propose to paste in text

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/synthesia-extension.git
    ```
4. Load the extension in Chrome:
    - Open Chrome and navigate to `chrome://extensions/`.
    - Enable "Developer mode" by clicking the toggle switch in the top right corner.
    - Click the "Load unpacked" button and select the project directory.

## Usage

1. Open Gmail in Chrome.
2. Click on the Synthesia extension icon.
3. The extension will summarize the email content using Gemini and display it in the popup.
4. If the user just opened a PDF file, show a textbox where the user can paste in the text and get a summary

## Files

- `background.js`: Handles background tasks and API communication.
- `content-script.js`: Extracts email body text or pasted-in text and formats the summary.
- `popup.js`: Manages the popup interface and communicates with the content script.
- `popup.html`: The HTML structure for the popup.
- `styles/popup.css`: Styles for the popup.
- `manifest.json`: Configuration file for the Chrome extension.
- `.env`: Contains the API key for the Gemini API (not included in the repository).

## API

This extension uses the Gemini API to generate summaries. You need to provide your own API key in the `.env` file.

## Screenshots

![Screenshot of Synthesia Extension if user opened Gmail](/images/email_popup.png)

![Screenshot of Synthesia Extension if user opened a PDF ](/images/pdf_popup.png)

## License

This project is licensed under the MIT License.