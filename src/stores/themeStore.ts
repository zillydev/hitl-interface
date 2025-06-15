import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Get initial state from the DOM
const getInitialState = () => {
  return document.documentElement.classList.contains('dark');
};

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: getInitialState(),
      toggleTheme: () => set((state) => {
        const newIsDark = !state.isDark;
        const root = window.document.documentElement;
        if (newIsDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        return { isDark: newIsDark };
      }),
      setTheme: (isDark: boolean) => set(() => {
        const root = window.document.documentElement;
        if (isDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        return { isDark };
      }),
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ isDark: state.isDark }),
    }
  )
); 