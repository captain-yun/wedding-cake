import { create } from 'zustand'

const useSignupStore = create((set) => ({
  currentStep: 1,
  formData: {
    birthdate: {
      year: '',
      month: '',
      day: ''
    },
    gender: '',
    education: '',
    marriageStatus: '',
    location: {
      cityId: '',
      cityName: '',
      district: ''
    },
    occupation: {
      category: '',
      detail: ''
    },
    height: '',
    bodyType: '',
    smoking: '',
    drinking: '',
    religion: '',
    marriagePlan: '',
    childPlan: '',
    mbti: '',
    hobbies: [],
    interests: [],
    idealTypes: [],
  },
  setCurrentStep: (step) => set({ currentStep: step }),
  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),
  resetForm: () => set({
    currentStep: 1,
    formData: {
      birthdate: {
        year: '',
        month: '',
        day: ''
      },
      gender: '',
      education: '',
      marriageStatus: '',
      location: {
        cityId: '',
        cityName: '',
        district: ''
      },
      occupation: {
        category: '',
        detail: ''
      },
      height: '',
      bodyType: '',
      smoking: '',
      drinking: '',
      religion: '',
      marriagePlan: '',
      childPlan: '',
      mbti: '',
      hobbies: [],
      interests: [],
      idealTypes: [],
    }
  })
}))

export default useSignupStore 