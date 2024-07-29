from flask import Blueprint, request, jsonify
import os
from .file_processing import read_file, modify_file
import logging

main = Blueprint('main', __name__)

@main.route('/api/list-files', methods=['POST'])
def list_files():
    path = request.json.get('path')
    try:
        files = os.listdir(path)
        logging.info(f"Files in {path}: {files}")
        return jsonify({'files': files})
    except Exception as e:
        logging.error(f"Error listing files: {str(e)}")
        return jsonify({'error': str(e)}), 400

@main.route('/api/read-file', methods=['POST'])
def read_file_route():
    file = request.json.get('file')
    try:
        content = read_file(file)
        return jsonify({'content': content})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@main.route('/api/modify-file', methods=['POST'])
def modify_file_route():
    content = request.json.get('content')
    try:
        modified_content = modify_file(content)
        return jsonify({'modifiedContent': modified_content})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
