// src/components/FileContentScreen.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Flashcard from './Flashcard'; // Import the Flashcard component

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
        <h1>Flash Cards on {decodeURIComponent(fileName)}</h1>
        {fileContent.length > 0 ? (
          <Flashcard
            question={fileContent[currentIndex].question}
            answer={fileContent[currentIndex].answer}
            showAnswer={showAnswer}
            toggleFlashcard={toggleFlashcard}
            goToPrevious={goToPrevious}
            goToNext={goToNext}
          />
        ) : (
          <p>Loading content.</p>
        )}
      </header>
    </div>
  );
};

export default FileContentScreen;
