'use client';

import useSignupStore from '@/store/signup';

const PROFILE_STEPS = {
  1: '생년월일',
  2: '성별',
  3: '학력',
  4: '결혼이력',
  5: '거주지역',
  6: '직업',
  7: '키',
  8: '체형',
  9: '흡연',
  10: '음주',
  11: '종교',
  12: '결혼계획',
  13: '자녀계획',
  14: 'MBTI',
  15: '취미',
  16: '관심사'
};

export default function ProfileProgress() {
  const { currentProfileStep, setCurrentProfileStep, formData } = useSignupStore();
  const totalSteps = Object.keys(PROFILE_STEPS).length;

  // 각 단계의 완료 여부 확인
  const isStepCompleted = (step) => {
    switch(step) {
      case 1: return formData.birthdate?.year && formData.birthdate?.month && formData.birthdate?.day;
      case 2: return formData.gender;
      case 3: return formData.education;
      case 4: return formData.marriageStatus;
      case 5: return formData.location?.cityId && formData.location?.district;
      case 6: return formData.occupation?.category && formData.occupation?.detail;
      case 7: return formData.height && formData.bodyType;
      case 8: return formData.smoking;
      case 9: return formData.drinking;
      case 10: return formData.religion;
      case 11: return formData.marriagePlan;
      case 12: return formData.childPlan;
      case 13: return formData.mbti;
      case 14: return formData.hobbies?.length > 0;
      case 15: return formData.interests?.length > 0;
      case 16: return formData.interests?.length > 0;
      default: return false;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-700">프로필 작성 진행률</span>
        <span className="text-sm text-gray-600">
          {Object.keys(PROFILE_STEPS).filter(step => isStepCompleted(parseInt(step))).length}/16
        </span>
      </div>
      <div className="flex space-x-2">
        {Object.entries(PROFILE_STEPS).map(([step, title]) => (
          <div
            key={step}
            className={`flex-1 h-2 rounded-full cursor-pointer transition-all hover:opacity-80 ${
              parseInt(step) === currentProfileStep
                ? 'bg-purple-600'
                : isStepCompleted(parseInt(step))
                  ? 'bg-purple-200'
                  : 'bg-gray-200'
            }`}
            onClick={() => setCurrentProfileStep(parseInt(step))}
            title={`${title}${isStepCompleted(parseInt(step)) ? ' (완료)' : ''}`}
          />
        ))}
      </div>
    </div>
  );
} 