import React from 'react';
import axios from 'axios'; // Ensure this import is present
import { useNavigate } from 'react-router-dom';

const SelectFolderScreen = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleFolderSelect = async () => {
    try {
      const folderHandle = await window.showDirectoryPicker();
      const fileContents = [];

      for await (const entry of folderHandle.values()) {
        if (entry.kind === 'file') {
          const file = await entry.getFile();
          if (file.name.endsWith('.md')) {
            const text = await file.text();  // Read file content as text
            fileContents.push({
              name: file.name,
              content: text
            });
          }
        }
      }

      if (fileContents.length === 0) {
        alert('No Markdown files found in the selected folder.');
        return;
      }

      const response = await axios.post('http://127.0.0.1:5000/upload_files', fileContents, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert(response.data.message);
      navigate('/display-files'); // Navigate to the display files screen

    } catch (error) {
      console.error('Error selecting folder:', error);
      alert('Error uploading files');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>File Upload App - Select Folder</h1>
        <button onClick={handleFolderSelect}>Select Folder</button>
      </header>
    </div>
  );
};

export default SelectFolderScreen;
