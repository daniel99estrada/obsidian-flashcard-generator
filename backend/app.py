from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sqlite3
import pandas as pd
import requests

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

conn = sqlite3.connect('obsidian_files.db', check_same_thread=False)
cursor = conn.cursor()

# Create table if it doesn't exist
cursor.execute("""
    CREATE TABLE IF NOT EXISTS file (
        name TEXT PRIMARY KEY,
        content TEXT
    )
""")
conn.commit()

def generate_flashcards(text):
    API_KEY = "AIzaSyBfk-JaTBKYVmKzj-MSuXhAhQaY4QPZoHI"
    inquiry = ("Hi, I would like you to create a series of questions based on a given topic. "
               "I will provide a paragraph describing what I know about the subject. Your task is to generate questions "
               "that can be used to create flashcards, with the answers drawn from the information provided in the paragraph. "
               "The questions should cover key points, concepts, and details mentioned in the paragraph. Additionally, craft more questions "
               "on related topics that are not covered in the paragraph and provide the answers. Return your response in this format: "
               "Question: Question about the topic. Answer: Answer about the topic. Here is the paragraph:")
    prompt = f"{inquiry} {text}"

    # Construct the request body
    request_body = {
        "contents": [
            {"role": "user", "parts": [{"text": prompt}]}
        ]
    }

    # Build the URL with the API key
    url = f"https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key={API_KEY}"

    # Set headers for content type
    headers = {"Content-Type": "application/json"}

    # Send the POST request
    response = requests.post(url, headers=headers, json=request_body)

    # Check for successful response
    if response.status_code == 200:
        # Parse the JSON response
        data = response.json()
        text_content = data['candidates'][0]['content']['parts'][0]['text']

        # Split the text content into lines
        lines = text_content.split('\n')

        questions_and_answers = []

        for line in lines:
            line = line.strip()
            line = line.replace("*", "")

            if line.startswith('Question:'):
                question = line.split(': ', 1)[1]
                questions_and_answers.append({"question": question})

            elif line.startswith('Answer:'):
                answer = line.split(': ', 1)[1]
                questions_and_answers[-1]["answer"] = answer

        return questions_and_answers
    else:
        print(f"Error: API call failed with status code {response.status_code}")
        return None

@app.route('/upload_files', methods=['POST'])
def upload_files():
    try:
        file_contents = request.get_json()
        if not file_contents:
            return jsonify({'message': 'No data in the request'}), 400

        for file in file_contents:
            filename = file['name']
            content = file['content']

            # Use parameterized queries to prevent SQL injection
            cursor.execute("INSERT OR REPLACE INTO file (name, content) VALUES (?, ?)", (filename, content))

        conn.commit()

        query = """
            SELECT * FROM file
            LIMIT 5;
        """
        df = pd.read_sql_query(query, conn)
        print(df.head())

        return jsonify({'message': 'Files uploaded successfully!'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/get_file_names', methods=['GET'])
def get_file_names():
    try:
        query = """
            SELECT name FROM file;
        """
        df = pd.read_sql_query(query, conn)
        # Convert DataFrame to JSON and ensure it's in the correct format
        file_names = df.to_dict(orient='records')
        return jsonify(file_names)
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/submit_file_name', methods=['POST'])
def submit_file_name():
    try:
        data = request.get_json()
        file_name = data.get('name')
        
        if not file_name:
            return jsonify({'message': 'No file name provided'}), 400
        
        # Use parameterized queries to prevent SQL injection
        query = "SELECT name, content FROM file WHERE name = ?"
        df = pd.read_sql_query(query, conn, params=(file_name,))
        
        file_names = df.to_dict(orient='records')
        return jsonify(file_names)
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/get_file_content', methods=['GET'])
def get_file_content():
    try:
        file_name = request.args.get('name')
        
        if not file_name:
            return jsonify({'message': 'No file name provided'}), 400
        
        # Use parameterized queries to prevent SQL injection
        query = "SELECT content FROM file WHERE name = ?"
        df = pd.read_sql_query(query, conn, params=(file_name,))
        
        if df.empty:
            return jsonify({'message': 'File not found'}), 404
        
        file_content = df.iloc[0]['content']

        flashcards = generate_flashcards(file_content)
        print(f"Flashcards: {flashcards}")

        return jsonify(flashcards)
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
@app.route('/')
def home():
    return 'Home!'

if __name__ == '__main__':
    app.run(debug=True)
