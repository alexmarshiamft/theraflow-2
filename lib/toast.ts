import { create } from 'zustand';

interface ToastState {
  message: string | null;
  type: 'info' | 'success' | 'warning' | 'error';
  showToast: (msg: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const useToast = create<ToastState>((set) => ({
  message: null,
  type: 'info',
  showToast: (msg, type = 'info') => {
    set({ message: msg, type });
    setTimeout(() => set({ message: null }), 3000);
  },
}));
