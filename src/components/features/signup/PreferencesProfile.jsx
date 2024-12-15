'use client'

import { useEffect } from 'react'
import useSignupStore from '@/store/signup'

export default function PreferencesProfile() {
  const { 
    currentSubStep, 
    profileData, 
    setProfileData, 
    nextStep, 
    prevStep 
  } = useSignupStore()

  const ageRanges = [
    '20-25', '26-30', '31-35', '36-40', '41-45'
  ]

  const locations = [
    '서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종',
    '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'
  ]

  const interests = [
    '여행', '운동', '음악', '영화', '독서', '요리', '게임', '반려동물',
    '카페', '와인', '공연', '전시', '사진', '패션', '투자'
  ]

  const renderSubStep = () => {
    switch(currentSubStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">선호하는 나이대를 선택해주세요</h2>
            <div className="grid grid-cols-2 gap-3">
              {ageRanges.map((range) => (
                <button
                  key={range}
                  className={`py-3 px-4 rounded-lg border ${
                    profileData.preferredAgeRange === range
                      ? 'bg-blue-500 text-white'
                      : 'border-gray-300'
                  }`}
                  onClick={() => {
                    setProfileData({ preferredAgeRange: range })
                    nextStep()
                  }}
                >
                  {range}세
                </button>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">선호하는 지역을 선택해주세요</h2>
            <div className="grid grid-cols-3 gap-3">
              {locations.map((location) => (
                <button
                  key={location}
                  className={`py-3 px-4 rounded-lg border ${
                    profileData.preferredLocation === location
                      ? 'bg-blue-500 text-white'
                      : 'border-gray-300'
                  }`}
                  onClick={() => {
                    setProfileData({ preferredLocation: location })
                    nextStep()
                  }}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">관심사를 선택해주세요 (최대 5개)</h2>
            <div className="grid grid-cols-3 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  className={`py-3 px-4 rounded-lg border ${
                    profileData.interests.includes(interest)
                      ? 'bg-blue-500 text-white'
                      : 'border-gray-300'
                  }`}
                  onClick={() => {
                    const newInterests = profileData.interests.includes(interest)
                      ? profileData.interests.filter(i => i !== interest)
                      : [...profileData.interests, interest].slice(0, 5)
                    setProfileData({ interests: newInterests })
                  }}
                >
                  {interest}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={prevStep}
                className="px-6 py-2 border rounded-lg"
              >
                이전
              </button>
              <button
                onClick={nextStep}
                disabled={profileData.interests.length === 0}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
              >
                다음
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">선호하는 성격/외모를 선택해주세요</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg mb-3">성격 (최대 3개)</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['차분한', '활발한', '다정한', '지적인', '유머러스한', '진지한'].map((trait) => (
                    <button
                      key={trait}
                      className={`py-3 px-4 rounded-lg border ${
                        profileData.preferences.personality.includes(trait)
                          ? 'bg-blue-500 text-white'
                          : 'border-gray-300'
                      }`}
                      onClick={() => {
                        const newTraits = profileData.preferences.personality.includes(trait)
                          ? profileData.preferences.personality.filter(t => t !== trait)
                          : [...profileData.preferences.personality, trait].slice(0, 3)
                        setProfileData({
                          preferences: {
                            ...profileData.preferences,
                            personality: newTraits
                          }
                        })
                      }}
                    >
                      {trait}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg mb-3">외모 (최대 3개)</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['키가 큰', '귀여운', '지적인', '세련된', '자연스러운', '운동을 좋아하는'].map((trait) => (
                    <button
                      key={trait}
                      className={`py-3 px-4 rounded-lg border ${
                        profileData.preferences.appearance.includes(trait)
                          ? 'bg-blue-500 text-white'
                          : 'border-gray-300'
                      }`}
                      onClick={() => {
                        const newTraits = profileData.preferences.appearance.includes(trait)
                          ? profileData.preferences.appearance.filter(t => t !== trait)
                          : [...profileData.preferences.appearance, trait].slice(0, 3)
                        setProfileData({
                          preferences: {
                            ...profileData.preferences,
                            appearance: newTraits
                          }
                        })
                      }}
                    >
                      {trait}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="px-6 py-2 border rounded-lg"
              >
                이전
              </button>
              <button
                onClick={nextStep}
                disabled={
                  profileData.preferences.personality.length === 0 ||
                  profileData.preferences.appearance.length === 0
                }
                className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
              >
                다음
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {renderSubStep()}
    </div>
  )
} 