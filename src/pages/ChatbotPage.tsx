import React from 'react';
import ChatbotWidget from '../widgets/ChatbotWidget';
import DarkModeToggle from '../widgets/DarkModeToggle';

const ChatbotPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute top-6 right-6">
        <DarkModeToggle />
      </div>
      <div className="w-full max-w-2xl p-4">
        <ChatbotWidget />
      </div>
    </div>
  );
};

export default ChatbotPage; 