import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflowStore } from '../stores/workflowStore';
import { mockWorkflowApi, mockClarificationApi } from '../api/mock';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { ChatMessage } from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import { ErrorMessage } from '../components/chat/ErrorMessage';
import { Message } from '../api/types';
import DarkModeToggle from '../components/DarkModeToggle';

const ChatbotPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isClarifying, setIsClarifying] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
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

      reset();
      addToHistory(workflow.steps);
      navigate(`/workflow/${encodeURIComponent(prompt)}`);
    } catch (error) {
      console.error('Failed to generate workflow:', error);
      setError('Failed to generate workflow. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent, isRetry: boolean = false) => {
    if (!isRetry) {
      e.preventDefault();
    }
    if ((!input.trim() && !isRetry) || isComplete) return;

    let userMessage: string;
    if (isRetry) {
      const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'user');
      if (!lastUserMessage) {
        setError('No message to retry');
        return;
      }
      userMessage = lastUserMessage.content;
    } else {
      userMessage = input.trim();
      setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
      setInput('');
    }

    setIsLoading(true);
    setIsTyping(true);
    setError(null);

    try {
      if (!isClarifying) {
        // Initial prompt - start clarification process
        setIsClarifying(true);
      }

      const response = await mockClarificationApi.getClarificationResponse(userMessage, messages.length + 1);
      setMessages(prev => [...prev, { role: 'assistant', content: response.message }]);

      if (response.isComplete) {
        setIsTyping(false);
        setIsComplete(true);
        await generateWorkflow(userMessage);
      }
    } catch (error) {
      console.error('Error during chat:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    if (isComplete) {
      // If we're in the workflow generation phase, retry the workflow generation
      const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'user');
      if (lastUserMessage) {
        await generateWorkflow(lastUserMessage.content);
      }
    } else {
      // If we're in the clarification phase, retry the last message
      await handleSend(new Event('submit') as any, true);
    }
    setIsRetrying(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="absolute top-6 right-6">
        <DarkModeToggle />
      </div>
      <div className="flex-1 w-full max-w-2xl mx-auto p-4">
        <div className="flex flex-col h-full">
          {isClarifying && (
            <div className="flex-1 overflow-y-auto mt-20 mb-4 space-y-4 px-2">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  content={message.content}
                  role={message.role}
                  index={index}
                />
              ))}
              {isTyping && (
                <div className="flex justify-start animate-slide-in">
                  <TypingIndicator />
                </div>
              )}
            </div>
          )}

          <ChatInput
            input={input}
            setInput={setInput}
            onSubmit={handleSend}
            isLoading={isLoading}
            isComplete={isComplete}
            isClarifying={isClarifying}
            inputRef={inputRef}
          />

          {error && (
            <ErrorMessage
              error={error}
              onRetry={handleRetry}
              isRetrying={isRetrying}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage; 