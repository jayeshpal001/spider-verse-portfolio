import { create } from 'zustand';

interface AppState {
  isHoveringNode: boolean;
  setHoveringNode: (val: boolean) => void;
  
  // Yeh track karega ki user currently kis project ya section par hai
  activeSection: string;
  setActiveSection: (val: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isHoveringNode: false,
  setHoveringNode: (val) => set({ isHoveringNode: val }),
  
  activeSection: 'hero',
  setActiveSection: (val) => set({ activeSection: val }),
}));