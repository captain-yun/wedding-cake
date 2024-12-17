'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth';
import useSignupStore from '@/store/signup';
import IdealTypeProgress from '@/components/common/IdealTypeProgress';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// 이상형 선택 컴포넌트들 import
import AgeRangeSelector from '@/components/features/idealtype/basic/AgeRangeSelector';
import HeightRangeSelector from '@/components/features/idealtype/basic/HeightRangeSelector';
import EducationPreferenceSelector from '@/components/features/idealtype/education/EducationPreferenceSelector';
import LocationPreferenceSelector from '@/components/features/idealtype/location/LocationPreferenceSelector';
import OccupationPreferenceSelector from '@/components/features/idealtype/occupation/OccupationPreferenceSelector';
import BodyTypePreferenceSelector from '@/components/features/idealtype/physical/BodyTypePreferenceSelector';
import SmokingPreferenceSelector from '@/components/features/idealtype/lifestyle/SmokingPreferenceSelector';
import DrinkingPreferenceSelector from '@/components/features/idealtype/lifestyle/DrinkingPreferenceSelector';
import ReligionPreferenceSelector from '@/components/features/idealtype/lifestyle/ReligionPreferenceSelector';
import MarriageHistoryPreferenceSelector from '@/components/features/idealtype/lifestyle/MarriageHistoryPreferenceSelector';
import ChildrenPreferenceSelector from '@/components/features/idealtype/lifestyle/ChildrenPreferenceSelector';
import PersonalityPreferenceSelector from '@/components/features/idealtype/personality/PersonalityPreferenceSelector';
import LifestylePreferenceSelector from '@/components/features/idealtype/lifestyle/LifestylePreferenceSelector';
import HobbyPreferenceSelector from '@/components/features/idealtype/interests/HobbyPreferenceSelector';
import DateStylePreferenceSelector from '@/components/features/idealtype/interests/DateStylePreferenceSelector';

const IDEAL_TYPE_STEPS = {
  1: { title: '나이 범위', component: AgeRangeSelector },
  2: { title: '키 범위', component: HeightRangeSelector },
  3: { title: '학력', component: EducationPreferenceSelector },
  4: { title: '선호 지역', component: LocationPreferenceSelector },
  5: { title: '직업', component: OccupationPreferenceSelector },
  6: { title: '체형', component: BodyTypePreferenceSelector },
  7: { title: '흡연 여부', component: SmokingPreferenceSelector },
  8: { title: '음주 여부', component: DrinkingPreferenceSelector },
  9: { title: '종교', component: ReligionPreferenceSelector },
  10: { title: '결혼 이력', component: MarriageHistoryPreferenceSelector },
  11: { title: '자녀 계획', component: ChildrenPreferenceSelector },
  12: { title: '성격', component: PersonalityPreferenceSelector },
  13: { title: '생활 방식', component: LifestylePreferenceSelector },
  14: { title: '취미 관심사', component: HobbyPreferenceSelector },
  15: { title: '데이트 스타일', component: DateStylePreferenceSelector }
};

export default function IdealTypePage() {
  const router = useRouter();
  const { user, completeStep, setCurrentStep } = useAuthStore();
  const { currentIdealTypeStep, setCurrentIdealTypeStep, idealTypeData } = useSignupStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!currentIdealTypeStep) {
      setCurrentIdealTypeStep(1);
    }
  }, [user, router, currentIdealTypeStep, setCurrentIdealTypeStep]);

  const isIdealTypeComplete = () => {
    return Object.keys(IDEAL_TYPE_STEPS).every(step => {
      switch(parseInt(step)) {
        case 1: return idealTypeData.ageRange?.min && idealTypeData.ageRange?.max;
        case 2: return idealTypeData.heightRange?.min && idealTypeData.heightRange?.max;
        case 3: return idealTypeData.education?.length > 0;
        case 4: return idealTypeData.locations?.length > 0;
        case 5: return idealTypeData.occupations?.length > 0;
        case 6: return idealTypeData.bodyTypes?.length > 0;
        case 7: return idealTypeData.smoking !== undefined;
        case 8: return idealTypeData.drinking !== undefined;
        case 9: return idealTypeData.religion !== undefined;
        case 10: return idealTypeData.marriageHistory !== undefined;
        case 11: return idealTypeData.childrenPlan !== undefined;
        case 12: return idealTypeData.personalities?.length > 0;
        case 13: return idealTypeData.lifestyle !== undefined;
        case 14: return idealTypeData.hobbies?.length > 0;
        case 15: return idealTypeData.dateStyle !== undefined;
        default: return false;
      }
    });
  };

  const handleNext = () => {
    if (currentIdealTypeStep < Object.keys(IDEAL_TYPE_STEPS).length) {
      setCurrentIdealTypeStep(currentIdealTypeStep + 1);
    } else if (isIdealTypeComplete()) {
      handleComplete();
    } else {
      alert('모든 항목을 작성해주세요.');
    }
  };

  const handlePrevious = () => {
    if (currentIdealTypeStep > 1) {
      setCurrentIdealTypeStep(currentIdealTypeStep - 1);
    }
  };

  const handleComplete = async () => {
    const supabase = createClientComponentClient();
    
    // 프로필 업데이트
    const { error } = await supabase
      .from('profiles')
      .update({ ideal_type_completed: true })
      .eq('id', user.id);

    if (!error) {
      // auth store 상태 업데이트
      completeStep(3); // 3단계(이상형 작성) 완료 처리
      setCurrentStep(4); // 다음 단계(본인인증)로 이동
      router.push('/verification');
    }
  };

  const CurrentStepComponent = IDEAL_TYPE_STEPS[currentIdealTypeStep]?.component;

  if (!user || !CurrentStepComponent) return null;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">이상형 선택</h2>
        <p className="text-gray-600 mt-2">
          {IDEAL_TYPE_STEPS[currentIdealTypeStep]?.title}
        </p>
      </div>

      <IdealTypeProgress />
      
      <CurrentStepComponent onComplete={handleNext} />

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentIdealTypeStep === 1}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          이전
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          {currentIdealTypeStep === Object.keys(IDEAL_TYPE_STEPS).length ? 
            (isIdealTypeComplete() ? '완료' : '모든 항목 작성 필요') : 
            '다음'}
        </button>
      </div>
    </div>
  );
} 