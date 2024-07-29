from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sqlite3
import pandas as pd

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

        from bard import generate_flashcards

        flashcards = generate_flashcards(file_content) 
        print(flashcards)

        return jsonify(flashcards)
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
@app.route('/')
def home():
    return 'Home!'

if __name__ == '__main__':
    app.run(debug=True)
