import React, { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';
import Tooltip from '../components/Tooltip';

const DarkModeToggle: React.FC = () => {
  const { isDark, toggleTheme, setTheme } = useThemeStore();

  // Listen for system preference changes
  useEffect(() => {
    const onMedia = (e: MediaQueryListEvent) => {
      setTheme(e.matches);
    };

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', onMedia);

    return () => {
      mq.removeEventListener('change', onMedia);
    };
  }, [setTheme]);

  return (
    <Tooltip label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
      <button
        onClick={toggleTheme}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
        )}
      </button>
    </Tooltip>
  );
};

export default DarkModeToggle; 