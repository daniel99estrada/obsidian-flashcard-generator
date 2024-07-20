from flask import Flask, jsonify, request
import os
from flask_cors import CORS
from bard import generate_flashcards

app = Flask(__name__)
CORS(app)

@app.route('/api/list-files', methods=['GET'])
def list_files():
    directory = r'C:\Users\PILDO\iCloudDrive\iCloud~md~obsidian\Tree of Ideas'
    try:
        files = os.listdir(directory)
        return jsonify({'files': files})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/get-flashcards', methods=['GET'])
def get_flashcards():
    flashcards = generate_flashcards("hello")
    return jsonify({'flashcards': flashcards})

@app.route('/')
def Home():
    return "hi"

if __name__ == '__main__':
    app.run(debug=True)
