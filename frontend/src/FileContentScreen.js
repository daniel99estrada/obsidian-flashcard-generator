import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FileContentScreen = () => {
  const { fileName } = useParams(); // Get file name from route params
  const [fileContent, setFileContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate(); // Initialize the navigate function

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
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    setLoading(true); // Set loading to true before starting the API call
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
        <button onClick={() => navigate('/display-files')} style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}>
          Back to Display Files
        </button>
        {loading ? (
          <p>Loading...</p> // Display progress indicator while loading
        ) : fileContent.length > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', margin: '20px' }}>
            <p>{`${currentIndex + 1} / ${fileContent.length}`}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          </div>
        ) : (
          <p>No content available.</p>
        )}
      </header>
    </div>
  );
};

export default FileContentScreen;
