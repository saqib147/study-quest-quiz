import React, { useState } from 'react';
import QuestCard from '../components/QuestCard';
import CreateQuest from '../components/CreateQuest';

const Home = () => {
  const [quests, setQuests] = useState([]);
  const [showCreateQuest, setShowCreateQuest] = useState(false);

  const addQuest = (quest) => {
    setQuests([...quests, quest]);
    setShowCreateQuest(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quest Quiz App</h1>
      <button
        onClick={() => setShowCreateQuest(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Create Quest
      </button>
      {showCreateQuest && <CreateQuest addQuest={addQuest} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quests.map((quest, index) => (
          <QuestCard key={index} quest={quest} />
        ))}
      </div>
    </div>
  );
};

export default Home;