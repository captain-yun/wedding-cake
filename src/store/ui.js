import { create } from 'zustand'

const useUIStore = create((set) => ({
  isLoading: false,
  error: null,
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null })
}))

export default useUIStore; 