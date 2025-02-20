import { Link } from 'react-router-dom';

function Home({ quests }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Available Quests</h1>
        <Link
          to="/create"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Create Quest</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quests.map((quest) => (
          <div key={quest.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{quest.title}</h2>
              <p className="text-gray-600 mb-4">{quest.questions.length} questions</p>
              <Link
                to={`/play/${quest.id}`}
                className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-center"
              >
                Play Quest
              </Link>
            </div>
          </div>
        ))}
        {quests.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No public quests available yet!</p>
            <Link
              to="/create"
              className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Create Your First Quest</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;