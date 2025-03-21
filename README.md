# Gmail Auto Responder

This project consists of a Chrome extension and a Flask server to automate email responses on Gmail.

## Setup

### 1. Chrome Extension
1. Open Chrome and go to `chrome://extensions/`.
2. Enable "Developer mode" (toggle in the top right corner).
3. Click "Load unpacked" and select the `extension/` folder.

### 2. Flask Server
1. Install Python dependencies:
   ```bash
   pip install flask flask-cors openai python-dotenv

### 3. OpenAI Key
Create a .env file in the root directory with your OpenAI API key:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run Server
   ```bash
   python server/server.py



