import { create } from 'zustand'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  loading: true,
  supabase: createClientComponentClient(),

  initialize: async () => {
    const supabase = createClientComponentClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      set({ user, profile, loading: false })
    } else {
      set({ user: null, profile: null, loading: false })
    }
  },

  signOut: async () => {
    const supabase = createClientComponentClient()
    await supabase.auth.signOut()
    set({ user: null, profile: null })
  },

  updateProfile: (profile) => {
    set((state) => ({ profile: { ...state.profile, ...profile } }))
  }
}))

export default useAuthStore 