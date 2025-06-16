import React from 'react';

export const TypingIndicator: React.FC = () => (
  <div className="flex space-x-1 items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
); 