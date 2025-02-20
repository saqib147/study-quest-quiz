import React from 'react';

const QuestionCard = ({ question, index, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-bold mb-2">Question {index + 1}</h3>
      <p className="text-gray-700 mb-2">{question.text}</p>
      <div className="grid grid-cols-1 gap-2">
        {question.options.map((option, idx) => (
          <div key={idx} className="flex items-center">
            <span className="mr-2">{idx + 1}.</span>
            <span>{option}</span>
            {idx === question.correctAnswer && (
              <span className="ml-2 text-green-500">(Correct Answer)</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onEdit(index)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(index)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;