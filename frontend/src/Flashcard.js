import React from 'react';

const Flashcard = ({ question, answer, showAnswer, toggleFlashcard, goToPrevious, goToNext }) => {
  return (
    <div className="flex items-center justify-center my-6">
      <button
        onClick={goToPrevious}
        className="mx-2 px-4 py-2 text-xl font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition"
      >
        ←
      </button>
      <div
        onClick={toggleFlashcard}
        className="border border-gray-300 rounded-lg p-6 w-80 cursor-pointer bg-gray-100 text-center shadow-lg"
      >
        <h2 className="text-xl font-bold mb-2">
          {showAnswer ? 'Answer' : 'Question'}
        </h2>
        <p className="text-lg">
          {showAnswer ? answer : question}
        </p>
      </div>
      <button
        onClick={goToNext}
        className="mx-2 px-4 py-2 text-xl font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition"
      >
        →
      </button>
    </div>
  );
};

export default Flashcard;
