'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth';
import useSignupStore from '@/store/signup';

// 기존 컴포넌트들 유지
import BirthdateSelector from '@/components/features/profile/BirthdateSelector';
import GenderSelector from '@/components/features/profile/GenderSelector';
import EducationSelector from '@/components/features/profile/EducationSelector';
import MarriageStatusSelector from '@/components/features/profile/MarriageStatusSelector';
import LocationSelector from '@/components/features/profile/LocationSelector';
import JobCategorySelector from '@/components/features/profile/occupation/JobCategorySelector';
import BodyTypeSelector from '@/components/features/profile/physical/BodyTypeSelector';
import SmokingSelector from '@/components/features/profile/lifestyle/SmokingSelector';
import DrinkingSelector from '@/components/features/profile/lifestyle/DrinkingSelector';
import ReligionSelector from '@/components/features/profile/lifestyle/ReligionSelector';
import ChildPlanSelector from '@/components/features/profile/lifestyle/ChildPlanSelector';
import MarriagePlanSelector from '@/components/features/profile/lifestyle/MarriagePlanSelector';
import MBTISelector from '@/components/features/profile/personality/MBTISelector';
import HobbySelector from '@/components/features/profile/interests/HobbySelector';
import InterestSelector from '@/components/features/profile/interests/InterestSelector';
import ProfileProgress from '@/components/common/ProfileProgress';
import HeightInput from '@/components/features/profile/physical/HeightInput';

const PROFILE_STEPS = {
  1: { title: '생년월일', component: BirthdateSelector },
  2: { title: '성별', component: GenderSelector },
  3: { title: '학력', component: EducationSelector },
  4: { title: '결혼이력', component: MarriageStatusSelector },
  5: { title: '거주지역', component: LocationSelector },
  6: { title: '직업', component: JobCategorySelector },
  7: { title: '키', component: HeightInput },
  8: { title: '체형', component: BodyTypeSelector },
  9: { title: '흡연', component: SmokingSelector },
  10: { title: '음주', component: DrinkingSelector },
  11: { title: '종교', component: ReligionSelector },
  12: { title: '결혼계획', component: MarriagePlanSelector },
  13: { title: '자녀계획', component: ChildPlanSelector },
  14: { title: 'MBTI', component: MBTISelector },
  15: { title: '취미', component: HobbySelector },
  16: { title: '관심사', component: InterestSelector }
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, completeStep, setCurrentStep } = useAuthStore();
  const { currentProfileStep, setCurrentProfileStep, formData } = useSignupStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const loadSavedProfile = async () => {
      try {
        const response = await fetch('/api/profiles');
        const data = await response.json();
        
        if (data.success && data.profile) {
          // 저장된 데이터가 있으면 복원
          useSignupStore.setState({ formData: data.profile.temp_data });
          setCurrentProfileStep(data.profile.current_step || 1);
        } else {
          setCurrentProfileStep(1);
        }
      } catch (error) {
        console.error('프로필 불러오기 실패:', error);
        setCurrentProfileStep(1);
      }
    };

    loadSavedProfile();
  }, [user, router]);

  // 스텝 변경 전 저장을 위한 공통 함수
  const handleStepChange = async (newStep) => {
    try {
      await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          currentStep: currentProfileStep
        })
      });
      
      // 스텝 변경
      setCurrentProfileStep(newStep);
    } catch (error) {
      console.error('프로필 저장 실패:', error);
      // 에러가 발생해도 사용자 경험을 위해 스텝은 변경
      setCurrentProfileStep(newStep);
    }
  };

  // ProfileProgress에 전달할 핸들러
  const handleStepClick = async (step) => {
    if (step !== currentProfileStep) {
      await handleStepChange(step);
    }
  };

  // 모든 필수 항목이 작성되었는지 확인
  const isProfileComplete = () => {
    return Object.keys(PROFILE_STEPS).every(step => {
      switch(parseInt(step)) {
        case 1: return formData.birthdate?.year && formData.birthdate?.month && formData.birthdate?.day;
        case 2: return formData.gender;
        case 3: return formData.education;
        case 4: return formData.marriageStatus;
        case 5: return formData.location?.cityId && formData.location?.district;
        case 6: return formData.occupation?.category && formData.occupation?.detail;
        case 7: return formData.height;
        case 8: return formData.bodyType;
        case 9: return formData.smoking;
        case 10: return formData.drinking;
        case 11: return formData.religion;
        case 12: return formData.marriagePlan;
        case 13: return formData.childPlan;
        case 14: return formData.mbti;
        case 15: return formData.hobbies?.length > 0;
        case 16: return formData.interests?.length > 0;
        default: return false;
      }
    });
  };

  // 기존 handleNext 수정
  const handleNext = async () => {
    if (currentProfileStep < Object.keys(PROFILE_STEPS).length) {
      await handleStepChange(currentProfileStep + 1);
    } else if (isProfileComplete()) {
      try {
        const response = await fetch('/api/profiles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData })
        });

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error);
        }

        completeStep(2);
        setCurrentStep(3);
        router.push('/ideal-type');
      } catch (error) {
        console.error('프로필 저장 실패:', error);
        alert('프로필 저장에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      // 어떤 항목이 미완성인지 확인하기 위한 디버깅 코드 추가
      const incomplete = Object.keys(PROFILE_STEPS).filter(step => {
        const stepNum = parseInt(step);
        switch(stepNum) {
          case 1: return !formData.birthdate?.year || !formData.birthdate?.month || !formData.birthdate?.day;
          case 2: return !formData.gender;
          // ... 나머지 케이스들
        }
      });
      console.log('미완성 항목:', incomplete.map(step => PROFILE_STEPS[step].title));
      alert('모든 항목을 작성해주세요.');
    }
  };

  // handlePrevious도 수정
  const handlePrevious = async () => {
    if (currentProfileStep > 1) {
      await handleStepChange(currentProfileStep - 1);
    }
  };

  const CurrentStepComponent = PROFILE_STEPS[currentProfileStep]?.component;

  if (!user || !CurrentStepComponent) return null;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">프로필 작성</h2>
        <p className="text-gray-600 mt-2">
          {PROFILE_STEPS[currentProfileStep]?.title}
        </p>
      </div>

      <ProfileProgress 
        currentStep={currentProfileStep}
        onStepClick={handleStepClick}
      />
      
      <CurrentStepComponent onComplete={handleNext} />

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentProfileStep === 1}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          이전
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          {currentProfileStep === Object.keys(PROFILE_STEPS).length ? 
            (isProfileComplete() ? '완료' : '모든 항목 작성 필요') : 
            '다음'}
        </button>
      </div>
    </div>
  );
} 