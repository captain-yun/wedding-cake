import { create } from 'zustand'

const useSignupStore = create((set) => ({
  currentStep: 1,
  currentSubStep: 1,
  steps: {
    1: { name: '소셜 로그인', subSteps: 1 },
    2: { 
      name: '기본 정보',
      subSteps: 4,
      subStepNames: ['성별', '생년월일', '거주지역', '직업']
    },
    3: {
      name: '선호도 정보',
      subSteps: 4,
      subStepNames: ['선호 나이대', '선호 지역', '관심사', '외모/성격 선호도']
    },
    4: { name: '프로필 확인', subSteps: 1 }
  },
  profileData: {
    // 기본 프로필 정보
    gender: '',
    birthDate: '',
    location: '',
    occupation: '',
    // 선호도 정보
    preferredAgeRange: '',
    preferredLocation: '',
    interests: [],
    preferences: {
      appearance: [],
      personality: []
    }
  },
  setCurrentStep: (step) => set({ currentStep: step, currentSubStep: 1 }),
  setCurrentSubStep: (subStep) => set({ currentSubStep: subStep }),
  setProfileData: (data) => set((state) => ({
    profileData: { ...state.profileData, ...data }
  })),
  nextStep: () => set((state) => {
    const currentStepData = state.steps[state.currentStep]
    if (state.currentSubStep < currentStepData.subSteps) {
      return { currentSubStep: state.currentSubStep + 1 }
    }
    return { 
      currentStep: state.currentStep + 1,
      currentSubStep: 1
    }
  }),
  prevStep: () => set((state) => {
    if (state.currentSubStep > 1) {
      return { currentSubStep: state.currentSubStep - 1 }
    }
    if (state.currentStep > 1) {
      const prevStepData = state.steps[state.currentStep - 1]
      return { 
        currentStep: state.currentStep - 1,
        currentSubStep: prevStepData.subSteps
      }
    }
    return state
  })
}))

export default useSignupStore 