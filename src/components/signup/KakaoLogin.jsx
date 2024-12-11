'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import useSignupStore from '@/store/signup'

export default function KakaoLogin() {
  const { setCurrentStep } = useSignupStore()

  const handleKakaoLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error
      
      // 로그인 성공 후 다음 단계로
      setCurrentStep(2)
    } catch (error) {
      console.error('카카오 로그인 에러:', error.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h1 className="text-2xl font-bold mb-8">회원가입</h1>
      <button
        onClick={handleKakaoLogin}
        className="bg-[#FEE500] text-[#000000] px-6 py-3 rounded-lg font-medium"
      >
        카카오톡으로 시작하기
      </button>
    </div>
  )
} 