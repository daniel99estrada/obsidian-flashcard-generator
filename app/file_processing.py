# file_processing.py
def read_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

def modify_file(content):
    # Example modification: Convert content to uppercase
    return content.upper()
