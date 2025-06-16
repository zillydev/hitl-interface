import React from 'react';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  index: number;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ content, role, index }) => (
  <div
    className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div
      className={`max-w-[80%] rounded-lg px-4 py-2 transform transition-all duration-300 ${role === 'user'
        ? 'bg-indigo-500 text-white hover:bg-indigo-600'
        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
    >
      {content}
    </div>
  </div>
); 