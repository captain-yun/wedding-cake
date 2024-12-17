import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useSignupStore = create(
  persist(
    (set) => ({
      currentProfileStep: 1,
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
        interests: []
      },
      currentIdealTypeStep: 1,
      idealTypeData: {
        ageRange: { min: '', max: '' },
        heightRange: { min: '', max: '' },
        education: [],
        locations: [],
        occupations: [],
        bodyTypes: [],
        smoking: undefined,
        drinking: undefined,
        religion: undefined,
        marriageHistory: undefined,
        childrenPlan: undefined,
        personalities: [],
        lifestyle: undefined,
        hobbies: [],
        dateStyle: undefined
      },
      setCurrentProfileStep: (step) => set({ currentProfileStep: step }),
      setFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),
      setCurrentIdealTypeStep: (step) => set({ currentIdealTypeStep: step }),
      setIdealTypeData: (data) => set((state) => ({
        idealTypeData: { ...state.idealTypeData, ...data }
      })),
      resetForm: () => set({
        currentProfileStep: 1,
        formData: {
          birthdate: { year: '', month: '', day: '' },
          gender: '',
          education: '',
          marriageStatus: '',
          location: { cityId: '', cityName: '', district: '' },
          occupation: { category: '', detail: '' },
          height: '',
          bodyType: '',
          smoking: '',
          drinking: '',
          religion: '',
          marriagePlan: '',
          childPlan: '',
          mbti: '',
          hobbies: [],
          interests: []
        },
        currentIdealTypeStep: 1,
        idealTypeData: {
          ageRange: { min: '', max: '' },
          heightRange: { min: '', max: '' },
          education: [],
          locations: [],
          occupations: [],
          bodyTypes: [],
          smoking: undefined,
          drinking: undefined,
          religion: undefined,
          marriageHistory: undefined,
          childrenPlan: undefined,
          personalities: [],
          lifestyle: undefined,
          hobbies: [],
          dateStyle: undefined
        }
      })
    }),
    {
      name: 'signup-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useSignupStore 