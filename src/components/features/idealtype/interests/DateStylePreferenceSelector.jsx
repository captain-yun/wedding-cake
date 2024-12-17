'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

const DATE_STYLES = [
  {
    id: 'activity',
    label: '활동 스타일',
    options: [
      { id: 'active', label: '활동적인 데이트', description: '운동, 야외활동, 체험활동 등' },
      { id: 'relaxed', label: '여유로운 데이트', description: '카페, 영화, 전시회 등' }
    ]
  },
  {
    id: 'planning',
    label: '계획 스타일',
    options: [
      { id: 'planned', label: '계획적인 데이트', description: '미리 계획하고 준비하는' },
      { id: 'spontaneous', label: '즉흥적인 데이트', description: '상황에 따라 자유롭게' }
    ]
  },
  {
    id: 'atmosphere',
    label: '분위기',
    options: [
      { id: 'romantic', label: '로맨틱한 분위기', description: '분위기 있는 레스토랑, 야경 등' },
      { id: 'casual', label: '편안한 분위기', description: '일상적이고 편한 장소' }
    ]
  },
  {
    id: 'frequency',
    label: '만남 빈도',
    options: [
      { id: 'often', label: '자주 만나기', description: '주 2-3회 ���상' },
      { id: 'moderate', label: '적당히 만나기', description: '주 1회 정도' },
      { id: 'quality', label: '질 높은 만남', description: '덜 자주 만나도 알차게' }
    ]
  }
];

export default function DateStylePreferenceSelector({ onComplete }) {
  const { idealTypeData, setIdealTypeData } = useSignupStore();
  const [selections, setSelections] = useState(idealTypeData.dateStyle || {});

  const handleSelect = (category, optionId) => {
    setSelections(prev => ({
      ...prev,
      [category]: optionId
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(selections).length === DATE_STYLES.length) {
      setIdealTypeData({
        ...idealTypeData,
        dateStyle: selections
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        선호하는 데이트 스타일을 선택해주세요
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {DATE_STYLES.map((category) => (
          <div key={category.id} className="space-y-3">
            <h3 className="font-medium text-gray-900">{category.label}</h3>
            <div className="grid grid-cols-1 gap-3">
              {category.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(category.id, option.id)}
                  className={`p-4 text-left rounded-lg transition-all border ${
                    selections[category.id] === option.id
                      ? 'bg-purple-50 border-purple-500'
                      : 'bg-white border-gray-200 hover:border-purple-500'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-500 mt-1">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={Object.keys(selections).length !== DATE_STYLES.length}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          완료
        </button>
      </form>
    </div>
  );
} 