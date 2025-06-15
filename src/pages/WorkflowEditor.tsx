import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DarkModeToggle from '../widgets/DarkModeToggle';

const WorkflowEditor: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const decodedTitle = decodeURIComponent(title || '');

  return (
    <div className="min-h-screen">
      <div className="w-full p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label="Go back"
              >
                <span className="material-icons !text-xl">arrow_back</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {decodedTitle}
              </h1>
            </div>
            <DarkModeToggle />
          </div>
          {/* Workflow editor content will go here */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 min-h-[600px]">
            <p className="text-gray-600 dark:text-gray-300">
              Workflow editor content coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowEditor; 