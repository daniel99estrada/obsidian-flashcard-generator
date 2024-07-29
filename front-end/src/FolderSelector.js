import React from 'react';
import axios from 'axios';

const FolderSelector = () => {
  const handleFolderSelect = async () => {
    try {
      const folderHandle = await window.showDirectoryPicker();
      const files = [];

      for await (const entry of folderHandle.values()) {
        if (entry.kind === 'file') {
          const file = await entry.getFile();
          files.push(file);
        }
      }

      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });

      await axios.post('/upload_files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Files uploaded successfully!');
    } catch (error) {
      console.error('Error selecting folder:', error);
    }
  };

  return (
    <div>
      <button onClick={handleFolderSelect}>Select Folder</button>
    </div>
  );
};

export default FolderSelector;
