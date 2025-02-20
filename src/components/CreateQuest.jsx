import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CreateQuest({ onSave, isEditing, quests }) {
  const navigate = useNavigate();
  const { questId } = useParams();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });

  useEffect(() => {
    if (isEditing && questId) {
      const quest = quests.find((q) => q.id === parseInt(questId));
      if (quest) {
        setTitle(quest.title);
        setIsPublic(quest.isPublic);
        setQuestions(quest.questions);
        setStep(2);
      }
    }
  }, [isEditing, questId, quests]);

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (title) {
      setStep(2);
    }
  };

  const addQuestion = () => {
    if (
      currentQuestion.question &&
      currentQuestion.options.every((opt) => opt)
    ) {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      });
    }
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const editQuestion = (index) => {
    setCurrentQuestion(questions[index]);
    removeQuestion(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && questions.length > 0) {
      if (isEditing) {
        onSave({ id: parseInt(questId), title, isPublic, questions });
      } else {
        onSave({ title, isPublic, questions });
      }
      navigate("/my-quests");
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {isEditing ? "Edit Quest" : "Create New Quest"}
        </h1>
        <form onSubmit={handleInitialSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quest Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quest Visibility
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Public</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  checked={!isPublic}
                  onChange={() => setIsPublic(false)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Private</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={!title}
          >
            Continue to Questions
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full  mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Add Questions</h1>
        <button
          onClick={() => setStep(1)}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit Quest Details
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
  <div className="flex flex-col md:flex-row md:justify-between gap-6">
    {/* Left section: Input fields */}
    <div className="space-y-4 w-full md:w-1/2">
      <input
        type="text"
        value={currentQuestion.question}
        onChange={(e) =>
          setCurrentQuestion({ ...currentQuestion, question: e.target.value })
        }
        placeholder="Enter question"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
      />
      {currentQuestion.options.map((option, index) => (
        <div key={index} className="flex items-center space-x-3">
          <input
            type="text"
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          />
          <input
            type="radio"
            name="correctAnswer"
            checked={currentQuestion.correctAnswer === index}
            onChange={() =>
              setCurrentQuestion({ ...currentQuestion, correctAnswer: index })
            }
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addQuestion}
        className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
        disabled={
          !currentQuestion.question ||
          !currentQuestion.options.every((opt) => opt)
        }
      >
        Add Question
      </button>
    </div>

    {/* Right section: Added questions */}
    <div className="space-y-4 w-full md:w-1/2">
      <h3 className="text-lg font-medium">Added Questions ({questions.length})</h3>
      {questions.map((q, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded shadow relative">
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              type="button"
              onClick={() => editQuestion(index)}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => removeQuestion(index)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
          <p className="font-medium mb-2">{q.question}</p>
          <ul className="ml-4">
            {q.options.map((opt, i) => (
              <li key={i} className={i === q.correctAnswer ? "text-green-600 font-semibold" : ""}>
                {opt}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
  
  {/* Submit button */}
  <button
    type="submit"
    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
    disabled={!title || questions.length === 0}
  >
    {isEditing ? "Update Quest" : "Save Quest"}
  </button>
</form>

    </div>
  );
}

export default CreateQuest;
