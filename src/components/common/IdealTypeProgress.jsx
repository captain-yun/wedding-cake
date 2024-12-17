'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

const IDEAL_TYPE_STEPS = {
  1: '나이 범위',
  2: '키 범위',
  3: '학력',
  4: '선호 지역',
  5: '직업',
  6: '체형',
  7: '흡연 여부',
  8: '음주 여부',
  9: '종교',
  10: '결혼 이력',
  11: '자녀 계획',
  12: '성격',
  13: '생활 방식',
  14: '취미 관심사',
  15: '데이트 스타일'
};

export default function IdealTypeProgress() {
  const { currentIdealTypeStep, setCurrentIdealTypeStep, idealTypeData } = useSignupStore();
  const totalSteps = Object.keys(IDEAL_TYPE_STEPS).length;

  const isStepCompleted = (step) => {
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
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-700">이상형 선택 진행률</span>
        <span className="text-sm text-gray-600">
          {Object.keys(IDEAL_TYPE_STEPS).filter(step => isStepCompleted(parseInt(step))).length}/{totalSteps}
        </span>
      </div>
      <div className="flex space-x-2">
        {Object.entries(IDEAL_TYPE_STEPS).map(([step, title]) => (
          <div
            key={step}
            className={`flex-1 h-2 rounded-full cursor-pointer transition-all hover:opacity-80 ${
              parseInt(step) === currentIdealTypeStep
                ? 'bg-purple-600'
                : isStepCompleted(parseInt(step))
                  ? 'bg-purple-200'
                  : 'bg-gray-200'
            }`}
            onClick={() => setCurrentIdealTypeStep(parseInt(step))}
            title={`${title}${isStepCompleted(parseInt(step)) ? ' (완료)' : ''}`}
          />
        ))}
      </div>
    </div>
  );
} 