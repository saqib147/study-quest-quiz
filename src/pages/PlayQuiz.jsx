import React from 'react';
import { useParams } from 'react-router-dom';
import QuizScreen from '../components/QuizScreen';

const PlayQuiz = () => {
  const { questId } = useParams();

  // Dummy data for quests (replace with actual data)
  const quests = [
    {
      title: 'Trivia about Star Wars',
      questions: [
        {
          text: 'What is the name of Luke Skywalker’s home planet?',
          options: ['Tatooine', 'Hoth', 'Endor', 'Coruscant'],
          correctAnswer: 0,
        },
        {
          text: 'Who is Darth Vader’s son?',
          options: ['Luke Skywalker', 'Han Solo', 'Obi-Wan Kenobi', 'Yoda'],
          correctAnswer: 0,
        },
      ],
    },
  ];

  const quest = quests.find((q) => q.title === questId);

  if (!quest) {
    return <div className="p-4 text-red-500">Quest not found!</div>;
  }

  return <QuizScreen quest={quest} />;
};

export default PlayQuiz;