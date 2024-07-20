import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [files, setFiles] = useState([]);
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/list-files')
      .then(response => {
        setFiles(response.data.files);
      })
      .catch(error => {
        console.error('There was an error fetching the files!', error);
      });
  }, []);

  const handleButtonClick = () => {
    axios.get('http://localhost:5000/api/get-flashcards')
      .then(response => {
        setFlashcards(response.data.flashcards);
      })
      .catch(error => {
        console.error('There was an error fetching the flashcards!', error);
      });
  };

  return (
    <div className="App">
      <h1>Files in Directory</h1>
      <div>
        {files.map((file, index) => (
          <button key={index} onClick={handleButtonClick}>{file}</button>
        ))}
      </div>
      {flashcards.length > 0 && (
        <div>
          <h2>Flashcards</h2>
          <ul>
            {flashcards.map((flashcard, index) => (
              <li key={index}>
                <div>
                  <strong>Question:</strong> {flashcard.question}
                </div>
                <div>
                  <strong>Answer:</strong> {flashcard.answer}
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
