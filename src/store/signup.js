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
    location: '',
    occupation: '',
    education: '',
    marriageStatus: '',
    children: null,
    height: '',
    bodyType: '',
  },
  setCurrentStep: (step) => set({ currentStep: step }),
  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),
  setBirthdate: (type, value) => set((state) => ({
    formData: {
      ...state.formData,
      birthdate: {
        ...state.formData.birthdate,
        [type]: value
      }
    }
  })),
  reset: () => set({
    currentStep: 1,
    formData: {
      birthdate: {
        year: '',
        month: '',
        day: ''
      },
      gender: '',
      location: '',
      occupation: '',
      education: '',
      marriageStatus: '',
      children: null,
      height: '',
      bodyType: '',
    }
  })
}))

export default useSignupStore 