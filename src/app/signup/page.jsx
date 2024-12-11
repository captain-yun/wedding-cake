'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import useSignupStore from '@/store/signup'
import BasicProfile from '@/components/signup/BasicProfile'
import PreferencesProfile from '@/components/signup/PreferencesProfile'
import ProfileConfirmation from '@/components/signup/ProfileConfirmation'
import ProgressBar from '@/components/common/ProgressBar'

export default function SignupPage() {
  const { currentStep, totalSteps } = useSignupStore()
  const [isLoading, setIsLoading] = useState(false)

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return <KakaoLogin />
      case 2:
        return <BasicProfile />
      case 3:
        return <PreferencesProfile />
      case 4:
        return <ProfileConfirmation />
      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ProgressBar 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
      />
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        renderStep()
      )}
    </div>
  )
} 