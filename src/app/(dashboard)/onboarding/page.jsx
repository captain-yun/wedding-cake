'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useSignupStore from '@/store/signup';
import useAuthStore from '@/store/auth';
import Progress from '@/components/features/onboarding/Progress';
import BirthdateSelector from '@/components/features/onboarding/BirthdateSelector';
import GenderSelector from '@/components/features/onboarding/GenderSelector';
import EducationSelector from '@/components/features/onboarding/EducationSelector';
import MarriageStatusSelector from '@/components/features/onboarding/MarriageStatusSelector';
import LocationSelector from '@/components/features/onboarding/LocationSelector';
import JobCategorySelector from '@/components/features/onboarding/occupation/JobCategorySelector';
import BodyTypeSelector from '@/components/features/onboarding/physical/BodyTypeSelector';
import SmokingSelector from '@/components/features/onboarding/lifestyle/SmokingSelector';
import DrinkingSelector from '@/components/features/onboarding/lifestyle/DrinkingSelector';
import ReligionSelector from '@/components/features/onboarding/lifestyle/ReligionSelector';
import ChildPlanSelector from '@/components/features/onboarding/lifestyle/ChildPlanSelector';
import MarriagePlanSelector from '@/components/features/onboarding/lifestyle/MarriagePlanSelector';
import MBTISelector from '@/components/features/onboarding/personality/MBTISelector';
import HobbySelector from '@/components/features/onboarding/interests/HobbySelector';
import InterestSelector from '@/components/features/onboarding/interests/InterestSelector';
import IdealTypeSelector from '@/components/features/onboarding/preferences/IdealTypeSelector';

const STEPS = {
  1: { title: '생년월일', component: BirthdateSelector },
  2: { title: '성별', component: GenderSelector },
  3: { title: '학력', component: EducationSelector },
  4: { title: '결혼이력', component: MarriageStatusSelector },
  5: { title: '거주지역', component: LocationSelector },
  6: { title: '직업', component: JobCategorySelector },
  7: { title: '신체정보', component: BodyTypeSelector },
  8: { title: '흡연', component: SmokingSelector },
  9: { title: '음주', component: DrinkingSelector },
  10: { title: '종교', component: ReligionSelector },
  11: { title: '결혼계획', component: MarriagePlanSelector },
  12: { title: '자녀계획', component: ChildPlanSelector },
  13: { title: 'MBTI', component: MBTISelector },
  14: { title: '취미', component: HobbySelector },
  15: { title: '관심사', component: InterestSelector },
  16: { title: '이상형', component: IdealTypeSelector }
};

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { currentStep, formData, setCurrentStep } = useSignupStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const CurrentStepComponent = STEPS[currentStep]?.component;

  const handleNext = async () => {
    try {
      if (currentStep === Object.keys(STEPS).length) {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            ...formData,
            onboarding_completed: true
          });

        if (error) throw error;
        router.push('/dashboard');
      } else {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Progress />
      <div className="max-w-2xl mx-auto pt-32 pb-12 px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {CurrentStepComponent && <CurrentStepComponent />}
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