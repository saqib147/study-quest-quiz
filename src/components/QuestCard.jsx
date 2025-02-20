import React from 'react';
import { Link } from 'react-router-dom';

const QuestCard = ({ quest }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">{quest.title}</h3>
      <p className="text-gray-600">{quest.questions.length} Questions</p>
      <Link
        to={`/play/${quest.title}`}
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Play Quiz
      </Link>
    </div>
  );
};

export default QuestCard;