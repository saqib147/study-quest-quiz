import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PlayQuest({ quests }) {
  const { questId } = useParams();
  const navigate = useNavigate();
  const [currentQuest, setCurrentQuest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const quest = quests.find(q => q.id === parseInt(questId));
    if (quest) {
      setCurrentQuest(quest);
    } else {
      navigate('/');
    }
  }, [questId, quests, navigate]);

  if (!currentQuest) return null;

  const currentQuestion = currentQuest.questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setIsCorrect(answerIndex === currentQuestion.correctAnswer);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < currentQuest.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8">Quest Complete!</h1>
        <p className="text-xl mb-4">
          Your score: {score} out of {currentQuest.questions.length}
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto relative">
      <h1 className="text-3xl font-bold mb-8">{currentQuest.title}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {currentQuest.questions.length}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && handleAnswerSelect(index)}
              disabled={showFeedback}
              className={`w-full text-left p-3 rounded ${
                selectedAnswer === index
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Feedback Overlay */}
      {showFeedback && (
        <div
          onClick={handleContinue}
          className={`fixed inset-0 flex flex-col items-center justify-center cursor-pointer ${
            isCorrect ? 'bg-green-500' : 'bg-red-500'
          }`}
          style={{ zIndex: 1000 }}
        >
          <div className="text-white text-center">
            <h2 className="text-6xl font-bold mb-4">
              {isCorrect ? 'Correct!' : 'Wrong!'}
            </h2>
            {!isCorrect && (
              <p className="text-2xl mb-8">
                Correct answer: {currentQuestion.options[currentQuestion.correctAnswer]}
              </p>
            )}
            <p className="text-xl">Click anywhere to continue</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayQuest;