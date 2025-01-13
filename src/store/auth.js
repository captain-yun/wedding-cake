import { create } from 'zustand'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { jsonDb } from '@/lib/jsonDb'

const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  idealType: null,
  
  initialize: async () => {
    const supabase = createClientComponentClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session?.user) {
      const user = session.user
      
      // JSON DB에서 프로필과 이상형 데이터 조회
      const profile = await jsonDb.findFirst('profiles', 'profiles', {
        where: { userId: user.id }
      })
      
      const idealType = await jsonDb.findFirst('idealTypes', 'idealTypes', {
        where: { userId: user.id }
      })

      set({ user, profile, idealType })
    }
  },

  updateProfile: async (profileData) => {
    const { user } = get()
    if (!user) return

    const updatedProfile = await jsonDb.upsert('profiles', 'profiles', {
      where: { userId: user.id },
      data: {
        ...profileData,
        userId: user.id,
        updatedAt: new Date().toISOString()
      }
    })

    set({ profile: updatedProfile })
  },

  updateIdealType: async (idealTypeData) => {
    const { user } = get()
    if (!user) return

    const updatedIdealType = await jsonDb.upsert('idealTypes', 'idealTypes', {
      where: { userId: user.id },
      data: {
        ...idealTypeData,
        userId: user.id,
        updatedAt: new Date().toISOString()
      }
    })

    set({ idealType: updatedIdealType })
  }
}))

export default useAuthStore 