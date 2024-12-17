import { create } from 'zustand'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  currentStep: 1,
  stepStatus: {
    1: { completed: false, name: '회원가입' },
    2: { completed: false, name: '프로필 작성' },
    3: { completed: false, name: '이상형 작성' },
    4: { completed: false, name: '본인인증' },
    5: { completed: false, name: '멤버십 결제' },
    6: { completed: false, name: '매칭 진행' },
    7: { completed: false, name: '매칭 성사' },
    8: { completed: false, name: '피드백' },
    9: { completed: false, name: '성사 완료' }
  },

  initialize: async () => {
    const supabase = createClientComponentClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      const currentStep = determineCurrentStep(profile)
      const completedSteps = determineCompletedSteps(profile)
      
      set({ 
        user, 
        profile, 
        currentStep,
        stepStatus: {
          ...get().stepStatus,
          ...completedSteps
        }
      })
    }
  },

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setCurrentStep: (step) => set({ currentStep: step }),
  completeStep: (step) => set((state) => ({
    stepStatus: {
      ...state.stepStatus,
      [step]: { ...state.stepStatus[step], completed: true }
    }
  }))
}))

function determineCurrentStep(profile) {
  if (!profile) return 2
  if (!profile.profile_completed) return 2
  if (!profile.ideal_type_completed) return 3
  if (!profile.verification_completed) return 4
  if (!profile.membership_completed) return 5
  if (!profile.matching_completed) return 6
  if (!profile.matched_completed) return 7
  if (!profile.feedback_completed) return 8
  if (!profile.success_completed) return 9
  return 9
}

function determineCompletedSteps(profile) {
  if (!profile) return { 1: { completed: true, name: '회원가입' } }

  const completedSteps = {
    1: { completed: true, name: '회원가입' }
  }

  if (profile.profile_completed) 
    completedSteps[2] = { completed: true, name: '프로필 작성' }
  if (profile.ideal_type_completed) 
    completedSteps[3] = { completed: true, name: '이상형 작성' }
  if (profile.verification_completed) 
    completedSteps[4] = { completed: true, name: '본인인증' }
  if (profile.membership_completed) 
    completedSteps[5] = { completed: true, name: '멤버십 결제' }
  if (profile.matching_completed) 
    completedSteps[6] = { completed: true, name: '매칭 진행' }
  if (profile.matched_completed) 
    completedSteps[7] = { completed: true, name: '매칭 성사' }
  if (profile.feedback_completed) 
    completedSteps[8] = { completed: true, name: '피드백' }
  if (profile.success_completed) 
    completedSteps[9] = { completed: true, name: '성사 완료' }

  return completedSteps
}

export default useAuthStore 