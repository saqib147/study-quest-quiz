import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import CreateQuest from './components/CreateQuest';
import MyQuests from './components/MyQuests';
import PlayQuest from './components/PlayQuest';

function App() {
  const [quests, setQuests] = useState([]);

  const addQuest = (quest) => {
    setQuests([...quests, { ...quest, id: Date.now() }]);
  };

  const updateQuest = (updatedQuest) => {
    setQuests(quests.map(quest => 
      quest.id === updatedQuest.id ? updatedQuest : quest
    ));
  };

  const deleteQuest = (questId) => {
    setQuests(quests.filter(quest => quest.id !== questId));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div className="flex items-center py-4">
                  <span className="font-semibold text-gray-500 text-lg">Quest Quiz</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Link to="/" className="py-4 px-2 text-gray-500 hover:text-gray-900">Home</Link>
                  <Link to="/my-quests" className="py-4 px-2 text-gray-500 hover:text-gray-900">My Quests</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home quests={quests.filter(quest => quest.isPublic)} />} />
            <Route path="/create" element={<CreateQuest onSave={addQuest} />} />
            <Route path="/edit/:questId" element={<CreateQuest onSave={updateQuest} isEditing={true} quests={quests} />} />
            <Route path="/my-quests" element={<MyQuests quests={quests} onDelete={deleteQuest} />} />
            <Route path="/play/:questId" element={<PlayQuest quests={quests} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;