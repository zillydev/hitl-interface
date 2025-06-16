import React, { useRef, useEffect, RefObject } from 'react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isComplete: boolean;
  isClarifying: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  onSubmit,
  isLoading,
  isComplete,
  isClarifying,
  inputRef
}) => {
  const localInputRef = useRef<HTMLInputElement>(null);
  const effectiveInputRef = inputRef || localInputRef;

  useEffect(() => {
    effectiveInputRef.current?.focus();
  }, [effectiveInputRef]);

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col w-full gap-4 transition-all duration-500 ease-in-out ${isClarifying ? 'animate-slide-up' : 'flex-1 justify-center'}`}
    >
      <div className="flex items-center w-full rounded-full border border-gray-400 bg-transparent focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-300 hover:border-indigo-500">
        <input
          ref={effectiveInputRef}
          type="text"
          className="h-12 flex-1 px-4 py-0 rounded-l-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
          placeholder={isComplete ? "Generating workflow..." : "Ask anything..."}
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isComplete}
        />
        <button
          type="submit"
          className={`h-12 px-4 py-0 bg-gray-200 dark:bg-gray-700 border-l border-gray-400 rounded-r-full text-gray-800 dark:text-white hover:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-300 flex items-center ${(isLoading || isComplete) ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading || isComplete}
          onClick={() => effectiveInputRef.current?.focus()}
        >
          {isLoading ? (
            <span className="material-icons !text-2xl !leading-none animate-spin">refresh</span>
          ) : (
            <span className="material-icons !text-2xl !leading-none transition-transform duration-300 hover:scale-110">arrow_forward</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatInput; 