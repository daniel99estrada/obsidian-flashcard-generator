import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SelectFolderScreen = () => {
  const navigate = useNavigate();

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <header className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text--600 mb-4">Obsidian Flashcards</h1>
        <p className="text-s text--600 mb-2">Always learning</p>
        <button
          onClick={handleFolderSelect}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Select Folder
        </button>
      </header>
    </div>
  );
};

export default SelectFolderScreen;
