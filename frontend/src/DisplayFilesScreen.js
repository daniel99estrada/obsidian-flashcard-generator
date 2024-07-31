import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayFilesScreen = () => {
  const [fileNames, setFileNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFileNames = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get_file_names');
        setFileNames(response.data);
      } catch (error) {
        console.error('Error fetching file names:', error);
        alert('Error fetching file names');
      }
    };

    fetchFileNames();
  }, []);

  const handleFileButtonClick = async (fileName) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/submit_file_name', {
        name: fileName
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert(response.data.message);
      navigate(`/file-content/${encodeURIComponent(fileName)}`);
    } catch (error) {
      console.error('Error submitting file name:', error);
      alert('Error submitting file name');
    }
  };

  const handleBackButtonClick = () => {
    navigate('/');
  };

  const handleRandomFileButtonClick = () => {
    if (fileNames.length === 0) {
      alert('No files available to select.');
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * fileNames.length);
    const randomFileName = fileNames[randomIndex].name;

    handleFileButtonClick(randomFileName);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <header className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-4 text-center">
          Obsidian Vault
        </h1>
        <div className="flex flex-row justify-center space-x-4 mb-4">
          <button
            onClick={handleBackButtonClick}
            className="bg-blue-500 text-white py-2 text-sm mb-2 rounded hover:bg-blue-600 transition"
          >
            Back to Folder Selector
          </button>
          <button
            onClick={handleRandomFileButtonClick}
            className="bg-green-500 text-white font-semibold py-2 text-sm mb-2 px-4 rounded hover:bg-green-600 transition"
          >
            Select Random File
          </button>
        </div>
        <ul className="list-disc pl-6">
          {fileNames.map((file, index) => (
            <li key={index} className="mb-2">
              <button
                onClick={() => handleFileButtonClick(file.name)}
                className="bg-slate-100 text-black font-semibold py-2 px-4 rounded hover:bg-blue-500 transition"
              >
                {file.name}
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default DisplayFilesScreen;
