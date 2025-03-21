from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS

# Get OpenAI API key from environment variable
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/generate-response', methods=['POST'])
def generate_response():
    data = request.json
    email_content = data['emailContent']
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that generates professional email responses."},
            {"role": "user", "content": f"Generate a professional email response to the following email:\n\n{email_content}"}
        ],
        max_tokens=150
    )
    
    response_text = response.choices[0].message['content'].strip()
    return jsonify({'responseText': response_text})

if __name__ == '__main__':
    app.run(port=5001)