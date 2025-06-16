import React from 'react';

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
  isRetrying: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry, isRetrying }) => (
  <div className="flex items-center gap-2 px-3 py-2 mt-2 text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg animate-shake">
    <span className="material-icons !text-lg">error_outline</span>
    {error}
    <button
      type="button"
      onClick={onRetry}
      className="ml-2 px-3 py-1 text-sm font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-all duration-300 flex items-center gap-1"
    >
      {isRetrying ? (
        <>
          <span className="material-icons !text-sm animate-spin">sync</span>
          Retrying...
        </>
      ) : (
        <>
          <span className="material-icons !text-sm transition-transform duration-300 hover:scale-110">refresh</span>
          Retry
        </>
      )}
    </button>
  </div>
); 