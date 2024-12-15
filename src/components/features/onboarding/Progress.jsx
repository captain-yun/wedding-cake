'use client';

import useSignupStore from '@/store/signup';

export default function Progress() {
  const currentStep = useSignupStore((state) => state.currentStep);
  const totalSteps = 7; // 총 4단계: 생년월일, 성별, 거주지역, 직업정보
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed top-16 left-0 right-0 bg-white shadow-sm z-40">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-medium text-gray-900">프로필 작성</h2>
          <span className="text-sm font-medium text-purple-600">{Math.round(progress)}%</span>
        </div>
        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}