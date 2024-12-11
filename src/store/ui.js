import { create } from 'zustand'

export const useUIStore = create((set) => ({
  isMenuOpen: false,
  theme: 'light',
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setTheme: (theme) => set({ theme })
})) 