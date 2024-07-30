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

      // Navigate to the file content screen with file name in URL
      navigate(`/file-content/${encodeURIComponent(fileName)}`);
    } catch (error) {
      console.error('Error submitting file name:', error);
      alert('Error submitting file name');
    }
  };

  const handleBackButtonClick = () => {
    // Navigate back to the folder selector screen
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
    <div className="App">
      <header className="App-header">
        <h1>File Upload App - Display Files</h1>
        <button onClick={handleBackButtonClick}>Back to Folder Selector</button>
        <button onClick={handleRandomFileButtonClick} style={{ marginTop: '20px' }}>
          Select Random File
        </button>
        <ul>
          {fileNames.map((file, index) => (
            <li key={index}>
              <button onClick={() => handleFileButtonClick(file.name)}>
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
