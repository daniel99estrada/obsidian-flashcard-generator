import React, { useState } from 'react';
import './Flashcard.css';

function Flashcard({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleToggle = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="flashcard">
      <div className="question">
        <strong>Question:</strong> {question}
      </div>
      {showAnswer && (
        <div className="answer">
          <strong>Answer:</strong> {answer}
        </div>
      )}
      <button onClick={handleToggle} className="toggle-button">
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </button>
    </div>
  );
}

export default Flashcard;
