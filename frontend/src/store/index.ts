import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  user: any | null;
  setUser: (user: any | null) => void;
  
  hirepanel: {
    candidates: any[];
  };
  setHirepanel: (state: Partial<AppState['hirepanel']>) => void;

  legalAdvisor: {
    messages: any[];
    contractText: string | null;
    input: string;
    uploadedContracts: { name: string, status: string }[];
  };
  setLegalAdvisor: (state: Partial<AppState['legalAdvisor']>) => void;
  
  gtm: {
    linkedinConnected: boolean;
    twitterConnected: boolean;
    instagramConnected: boolean;
    publishedCampaigns: { topic: string, platforms: string[], date: string }[];
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
  
  hirepanel: {
    candidates: [],
  },
  setHirepanel: (newState) => set((state) => ({ 
    hirepanel: { ...state.hirepanel, ...newState } 
  })),

  legalAdvisor: {
    messages: [],
    contractText: null,
    input: '',
    uploadedContracts: [],
  },
  setLegalAdvisor: (newState) => set((state) => ({ 
    legalAdvisor: { ...state.legalAdvisor, ...newState } 
  })),
  
  gtm: {
    linkedinConnected: false,
    twitterConnected: false,
    instagramConnected: false,
    publishedCampaigns: [],
  },
  setGtm: (newState) => set((state) => ({
    gtm: { ...state.gtm, ...newState }
  }))
}));
