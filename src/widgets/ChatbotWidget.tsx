import React, { useState } from 'react';

const ChatbotWidget: React.FC = () => {
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for send logic
    setInput('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-[400px] w-full">
      <form
        onSubmit={handleSend}
        className="flex items-center w-full max-w-md mx-auto mt-auto mb-auto rounded-full border border-gray-400 bg-transparent focus-within:ring-2 focus-within:ring-indigo-500 transition"
      >
        <input
          type="text"
          className="h-12 flex-1 px-4 py-0 rounded-l-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          placeholder="Ask anything..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="h-12 px-4 py-0 bg-gray-200 dark:bg-gray-700 border-l border-gray-400 rounded-r-full text-gray-800 dark:text-white hover:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors flex items-center"
        >
          <span className="material-icons !text-2xl !leading-none">arrow_forward</span>
        </button>
      </form>
    </div>
  );
};

export default ChatbotWidget; 