'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

const LIFESTYLE_PREFERENCES = [
  { 
    id: 'daily_routine',
    label: '일상 생활',
    options: [
      { id: 'early_bird', label: '아침형 인간' },
      { id: 'night_owl', label: '저녁형 인간' }
    ]
  },
  {
    id: 'social_style',
    label: '사교 성향',
    options: [
      { id: 'extrovert', label: '활발한 외향형' },
      { id: 'ambivert', label: '상황에 따라 달라요' },
      { id: 'introvert', label: '차분한 내향형' }
    ]
  },
  {
    id: 'leisure',
    label: '여가 활동',
    options: [
      { id: 'outdoor', label: '활동적인 야외 활동' },
      { id: 'indoor', label: '실내에서 조용히' },
      { id: 'both', label: '둘 다 좋아요' }
    ]
  },
  {
    id: 'spending',
    label: '소비 성향',
    options: [
      { id: 'planner', label: '계획적인 소비' },
      { id: 'flexible', label: '여유있는 소비' }
    ]
  }
];

export default function LifestylePreferenceSelector({ onComplete }) {
  const { idealTypeData, setIdealTypeData } = useSignupStore();
  const [selections, setSelections] = useState(idealTypeData.lifestyle || {});

  const handleSelect = (category, optionId) => {
    setSelections(prev => ({
      ...prev,
      [category]: optionId
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 모든 카테고리가 선택되었는지 확인
    if (Object.keys(selections).length === LIFESTYLE_PREFERENCES.length) {
      setIdealTypeData({
        ...idealTypeData,
        lifestyle: selections
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        선호하는 생활 방식을 선택해주세요
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {LIFESTYLE_PREFERENCES.map((category) => (
          <div key={category.id} className="space-y-3">
            <h3 className="font-medium text-gray-900">{category.label}</h3>
            <div className="grid grid-cols-2 gap-2">
              {category.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(category.id, option.id)}
                  className={`p-3 text-center rounded-lg transition-all border ${
                    selections[category.id] === option.id
                      ? 'bg-purple-50 border-purple-500'
                      : 'bg-white border-gray-200 hover:border-purple-500'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={Object.keys(selections).length !== LIFESTYLE_PREFERENCES.length}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </form>
    </div>
  );
} 