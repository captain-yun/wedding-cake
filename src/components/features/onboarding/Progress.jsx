'use client';

import useSignupStore from '@/store/signup';

const STEPS = [
  { id: 1, title: '생년월일' },
  { id: 2, title: '성별' },
  { id: 3, title: '학력' },
  { id: 4, title: '결혼이력' },
  { id: 5, title: '거주지역' },
  { id: 6, title: '직업' },
  { id: 7, title: '신체정보' },
  { id: 8, title: '흡연' },
  { id: 9, title: '음주' },
  { id: 10, title: '종교' },
  { id: 11, title: '결혼계획' },
  { id: 12, title: '자녀계획' },
  { id: 13, title: 'MBTI' },
  { id: 14, title: '취미' },
  { id: 15, title: '관심사' },
  { id: 16, title: '이상형' }
];

export default function Progress() {
  const { currentStep, formData, setCurrentStep } = useSignupStore();

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return formData.birthdate.year && formData.birthdate.month && formData.birthdate.day;
      case 2:
        return !!formData.gender;
      case 3:
        return !!formData.education;
      case 4:
        return !!formData.marriageStatus;
      case 5:
        return !!formData.location?.cityId && !!formData.location?.district;
      case 6:
        return !!formData.occupation?.category && !!formData.occupation?.detail;
      case 7:
        return !!formData.height && !!formData.bodyType;
      case 8:
        return !!formData.smoking;
      case 9:
        return !!formData.drinking;
      case 10:
        return !!formData.religion;
      case 11:
        return !!formData.marriagePlan;
      case 12:
        return !!formData.childPlan;
      case 13:
        return !!formData.mbti;
      case 14:
        return formData.hobbies?.length > 0;
      case 15:
        return formData.interests?.length > 0;
      case 16:
        return formData.idealTypes?.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="fixed top-16 left-0 right-0 bg-white shadow-sm z-40">
      <div className="max-w-4xl mx-auto px-4 py-4 overflow-x-auto">
        <div className="flex justify-between items-center min-w-max">
          <h2 className="text-sm font-medium text-gray-900">프로필 작성</h2>
          <div className="flex space-x-2">
            {STEPS.map(({ id, title }) => (
              <button
                key={id}
                onClick={() => setCurrentStep(id)}
                className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all
                  ${currentStep === id 
                    ? 'bg-purple-600 text-white'
                    : isStepComplete(id)
                      ? 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                title={title}
              >
                {isStepComplete(id) ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm">{id}</span>
                )}
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                  {title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}