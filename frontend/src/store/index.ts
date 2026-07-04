import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  user: any | null;
  setUser: (user: any | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark', // Default OS theme is Dark Mode
  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },
  user: null,
  setUser: (user) => set({ user }),
}));
