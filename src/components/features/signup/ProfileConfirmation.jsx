'use client'

import { useEffect } from 'react'
import useSignupStore from '@/store/signup'
import { supabase } from '@/lib/supabase'

export default function ProfileConfirmation() {
  const { profileData, setCurrentStep } = useSignupStore()

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('사용자 인증 정보를 찾을 수 없습니다.')

      // 프로필 데이터를 Supabase에 저장
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profileData,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      // 프로필 저장 성공 후 다음 단계로
      alert('프로필이 성공적으로 저장되었습니다!')
      // 여기서 매칭 페이지로 리다이렉트하거나 다음 단계로 진행
    } catch (error) {
      console.error('프로필 저장 에러:', error.message)
      alert('프로필 저장 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-xl font-semibold">입력하신 정보를 확인해주세요</h2>
      
      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <h3 className="font-medium">기본 정보</h3>
          <div className="mt-2 space-y-2">
            <p>성별: {profileData.gender === 'male' ? '남성' : '여성'}</p>
            <p>생년월일: {profileData.birthDate}</p>
            <p>거주지역: {profileData.location}</p>
            <p>직업: {profileData.occupation}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium">선호도 정보</h3>
          <div className="mt-2 space-y-2">
            <p>선호 나이대: {profileData.preferredAgeRange}세</p>
            <p>선호 지역: {profileData.preferredLocation}</p>
            <p>관심사: {profileData.interests.join(', ')}</p>
            <p>선호하는 성격: {profileData.preferences.personality.join(', ')}</p>
            <p>선호하는 외모: {profileData.preferences.appearance.join(', ')}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(1)}
          className="px-6 py-2 border rounded-lg"
        >
          처음으로
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          프로필 등록 완료
        </button>
      </div>
    </div>
  )
} 