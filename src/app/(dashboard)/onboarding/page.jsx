'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useSignupStore from '@/store/signup';
import useAuthStore from '@/store/auth';
import Progress from '@/components/features/onboarding/Progress';
import BirthdateSelector from '@/components/features/onboarding/BirthdateSelector';
import GenderSelector from '@/components/features/onboarding/GenderSelector';
import LocationSelector from '@/components/features/onboarding/LocationSelector';
import OccupationInput from '@/components/features/onboarding/OccupationInput';
import EducationSelector from '@/components/features/onboarding/EducationSelector';
import MarriageStatusSelector from '@/components/features/onboarding/MarriageStatusSelector';
import PhysicalInfoSelector from '@/components/features/onboarding/PhysicalInfoSelector';

const STEPS = {
  1: { title: '생년월일', component: BirthdateSelector },
  2: { title: '성별', component: GenderSelector },
  3: { title: '학력', component: EducationSelector },
  4: { title: '결혼이력', component: MarriageStatusSelector },
  5: { title: '거주지역', component: LocationSelector },
  6: { title: '직업', component: OccupationInput },
  7: { title: '신체정보', component: PhysicalInfoSelector },
};

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { currentStep, formData, setCurrentStep } = useSignupStore();
  const { user, updateProfile } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleNext = async () => {
    try {
      if (!isCurrentStepValid()) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
      }

      // const { error } = await supabase
      //   .from('profiles')
      //   .upsert({
      //     id: user.id,
      //     ...getProfileData(),
      //     onboarding_step: currentStep + 1
      //   });

      // if (error) throw error;ㄴ
      
      if (currentStep === Object.keys(STEPS).length) {
        router.push('/dashboard');
      } else {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.birthdate.year && formData.birthdate.month && formData.birthdate.day;
      case 2:
        return formData.gender;
      case 3:
        return formData.education;
      case 4:
        return formData.marriageStatus && 
          (formData.marriageStatus === 'never_married' || formData.children !== null);
      case 5:
        return formData.location;
      case 6:
        return formData.occupation;
      case 7:
        return formData.height && formData.bodyType;
      default:
        return false;
    }
  };

  const getProfileData = () => {
    const { birthdate, ...rest } = formData;
    if (currentStep === 1) {
      const { year, month, day } = birthdate;
      return {
        ...rest,
        birthdate: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      };
    }
    return rest;
  };

  const CurrentStepComponent = STEPS[currentStep].component;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Progress currentStep={currentStep} totalSteps={Object.keys(STEPS).length} />
      <div className="container mx-auto px-4 py-12 pt-28">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-sm p-6">
          <CurrentStepComponent />
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              이전
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              {currentStep === Object.keys(STEPS).length ? '완료' : '다음'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 