import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflowStore } from '../stores/workflowStore';
import { mockWorkflowApi } from '../api/mock';

const ChatbotWidget: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addToHistory, reset } = useWorkflowStore();

  const generateWorkflow = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const workflow = await mockWorkflowApi.generateWorkflow({
        name: "Generated Workflow",
        description: prompt,
        prompt: prompt,
        context: {
          toolPreferences: ["Salesforce", "HubSpot", "Calendly", "Vidyard", "Asana"]
        }
      });

      reset(); // Reset the workflow state before adding new steps
      addToHistory(workflow.steps);
      navigate(`/workflow/${encodeURIComponent(prompt)}`);
    } catch (error) {
      console.error('Failed to generate workflow:', error);
      setError('Failed to generate workflow. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await generateWorkflow(input.trim());
    setInput('');
  };

  const handleRetry = () => {
    if (input.trim()) {
      generateWorkflow(input.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[400px] w-full">
      <form
        onSubmit={handleSend}
        className="flex flex-col items-center w-full max-w-md mx-auto mt-auto mb-auto gap-4"
      >
        <div className="flex items-center w-full rounded-full border border-gray-400 bg-transparent focus-within:ring-2 focus-within:ring-indigo-500 transition">
          <input
            type="text"
            className="h-12 flex-1 px-4 py-0 rounded-l-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            placeholder="Ask anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={handleRetry}
            className={`h-12 px-4 py-0 bg-gray-200 dark:bg-gray-700 border-l border-gray-400 rounded-r-full text-gray-800 dark:text-white hover:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors flex items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="material-icons !text-2xl !leading-none animate-spin">refresh</span>
            ) : (
              <span className="material-icons !text-2xl !leading-none">arrow_forward</span>
            )}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
            <span className="material-icons !text-lg">error_outline</span>
            {error}
            <button
              onClick={handleRetry}
              className="ml-2 px-3 py-1 text-sm font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center gap-1"
            >
              {isLoading ? (
                <>
                  <span className="material-icons !text-sm animate-spin">sync</span>
                  Retrying...
                </>
              ) : (
                <>
                  <span className="material-icons !text-sm">refresh</span>
                  Retry
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChatbotWidget; 