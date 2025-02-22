# Synthesia Extension

Synthesia is a Chrome extension designed to summarize email content from Gmail. This project is part of a PPE (Projet Personnel Encadré).

## Features

- Extracts email body text from Gmail.
- Summarizes the email content, highlighting company names, dates, and times.
- Displays the summary in a popup.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/synthesia-extension.git
    ```
2. Navigate to the project directory:
    ```sh
    cd synthesia-extension
    ```
3. Install dependencies (if any):
    ```sh
    npm install
    ```
4. Load the extension in Chrome:
    - Open Chrome and navigate to `chrome://extensions/`.
    - Enable "Developer mode" by clicking the toggle switch in the top right corner.
    - Click the "Load unpacked" button and select the project directory.

## Usage

1. Open Gmail in Chrome.
2. Click on the Synthesia extension icon.
3. The extension will summarize the email content and display it in the popup.

## Files

- `background.js`: Handles background tasks and API communication.
- `content-script.js`: Extracts email body text and formats the summary.
- `popup.js`: Manages the popup interface and communicates with the content script.
- `popup.html`: The HTML structure for the popup.
- `styles/popup.css`: Styles for the popup.
- `manifest.json`: Configuration file for the Chrome extension.
- `.env`: Contains the API key for the Gemini API (not included in the repository).

## API

This extension uses the Gemini API to generate summaries. You need to provide your own API key in the `.env` file.

## License

This project is licensed under the MIT License.