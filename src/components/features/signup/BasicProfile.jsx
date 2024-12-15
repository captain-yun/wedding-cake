'use client'

import { useEffect } from 'react'
import useSignupStore from '@/store/signup'

export default function BasicProfile() {
  const { 
    currentSubStep, 
    profileData, 
    setProfileData, 
    nextStep, 
    prevStep 
  } = useSignupStore()

  const renderSubStep = () => {
    switch(currentSubStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">성별을 선택해주세요</h2>
            <div className="flex gap-4">
              <button
                className={`flex-1 py-3 px-6 rounded-lg border ${
                  profileData.gender === 'male' 
                    ? 'bg-blue-500 text-white' 
                    : 'border-gray-300'
                }`}
                onClick={() => {
                  setProfileData({ gender: 'male' })
                  nextStep()
                }}
              >
                남성
              </button>
              <button
                className={`flex-1 py-3 px-6 rounded-lg border ${
                  profileData.gender === 'female' 
                    ? 'bg-blue-500 text-white' 
                    : 'border-gray-300'
                }`}
                onClick={() => {
                  setProfileData({ gender: 'female' })
                  nextStep()
                }}
              >
                여성
              </button>
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">생년월일을 입력해주세요</h2>
            <input
              type="date"
              value={profileData.birthDate}
              onChange={(e) => setProfileData({ birthDate: e.target.value })}
              className="w-full p-3 border rounded-lg"
            />
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-2 border rounded-lg"
              >
                이전
              </button>
              <button
                onClick={nextStep}
                disabled={!profileData.birthDate}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
              >
                다음
              </button>
            </div>
          </div>
        )

      // case 3, 4는 비슷한 패턴으로 구현...
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {renderSubStep()}
    </div>
  )
} 