import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  user: any | null;
  setUser: (user: any | null) => void;
  legalAdvisor: {
    messages: any[];
    contractText: string | null;
    input: string;
  };
  setLegalAdvisor: (state: Partial<AppState['legalAdvisor']>) => void;
  gtm: {
    linkedinConnected: boolean;
    twitterConnected: boolean;
    instagramConnected: boolean;
  };
  setGtm: (state: Partial<AppState['gtm']>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark', // Default OS theme is Dark Mode
  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },
  user: null,
  setUser: (user) => set({ user }),
  legalAdvisor: {
    messages: [],
    contractText: null,
    input: '',
  },
  setLegalAdvisor: (newState) => set((state) => ({ 
    legalAdvisor: { ...state.legalAdvisor, ...newState } 
  })),
  gtm: {
    linkedinConnected: false,
    twitterConnected: false,
    instagramConnected: false,
  },
  setGtm: (newState) => set((state) => ({
    gtm: { ...state.gtm, ...newState }
  }))
}));
