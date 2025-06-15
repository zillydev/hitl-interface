import { create } from 'zustand';

// Get initial state from the DOM
const getInitialState = () => {
  return document.documentElement.classList.contains('dark');
};

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: getInitialState(), // Use the state from the DOM
  toggleTheme: () => set((state) => {
    const newIsDark = !state.isDark;
    const root = window.document.documentElement;
    if (newIsDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    return { isDark: newIsDark };
  }),
  setTheme: (isDark: boolean) => set(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    return { isDark };
  }),
})); 