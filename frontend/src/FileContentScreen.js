import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FileContentScreen = () => {
  const { fileName } = useParams(); // Get file name from route params
  const [fileContent, setFileContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get_file_content', {
          params: { name: fileName }
        });
        setFileContent(response.data); // Update to handle list of questions and answers
      } catch (error) {
        console.error('Error fetching file content:', error);
        alert('Error fetching file content');
      }
    };

    fetchFileContent();
  }, [fileName]);

  const toggleFlashcard = () => {
    setShowAnswer(!showAnswer);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % fileContent.length);
    setShowAnswer(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + fileContent.length) % fileContent.length);
    setShowAnswer(false);
  };

  return (
    <div>
      <header>
        <h1>File Content</h1>
        {fileContent.length > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
            <button onClick={goToPrevious} style={{ margin: '0 10px', padding: '10px', fontSize: '20px' }}>←</button>
            <div
              onClick={toggleFlashcard}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '20px',
                width: '300px',
                cursor: 'pointer',
                backgroundColor: '#f9f9f9',
                textAlign: 'center',
              }}
            >
              <h2>{showAnswer ? 'Answer' : 'Question'}</h2>
              <p>{showAnswer ? fileContent[currentIndex].answer : fileContent[currentIndex].question}</p>
            </div>
            <button onClick={goToNext} style={{ margin: '0 10px', padding: '10px', fontSize: '20px' }}>→</button>
          </div>
        ) : (
          <p>Loading content.</p>
        )}
      </header>
    </div>
  );
};

export default FileContentScreen;
