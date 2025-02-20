import React, { useState } from 'react';

const QuizScreen = ({ quest }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = quest.questions[currentQuestion];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    if (index === question.correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    if (currentQuestion < quest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert('Quiz finished!');
    }
  };

  return (
    <div className="p-4">
      {showResult ? (
        <div
          className={`h-screen flex flex-col justify-center items-center ${
            isCorrect ? 'bg-green-500' : 'bg-red-500'
          }`}
          onClick={handleNextQuestion}
        >
          <h1 className="text-6xl text-white font-bold">
            {isCorrect ? 'Correct!' : 'Wrong!'}
          </h1>
          {!isCorrect && (
            <p className="text-white mt-4">
              Correct Answer: {question.options[question.correctAnswer]}
            </p>
          )}
          <p className="text-white mt-4">Click anywhere to continue</p>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">{quest.title}</h1>
          <h2 className="text-xl mb-4">{question.text}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;