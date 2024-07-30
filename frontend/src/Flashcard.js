// src/components/Flashcard.js
import React from 'react';

const Flashcard = ({ question, answer, showAnswer, toggleFlashcard, goToPrevious, goToNext }) => {
  return (
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
        <p className="flashcard-text">
          {showAnswer ? answer : question}
        </p>
      </div>
      <button onClick={goToNext} style={{ margin: '0 10px', padding: '10px', fontSize: '20px' }}>→</button>
    </div>
  );
};

export default Flashcard;
