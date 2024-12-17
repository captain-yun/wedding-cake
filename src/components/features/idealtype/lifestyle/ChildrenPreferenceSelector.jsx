'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

const CHILDREN_PREFERENCES = [
  { 
    id: 'want_children', 
    label: '자녀 계획이 있는 분',
    description: '결혼 후 자녀를 가지고 싶어하는 분을 선호해요'
  },
  { 
    id: 'no_children', 
    label: '자녀 계획이 없는 분',
    description: '딩크(DINK) 라이프를 선호하는 분을 찾아요'
  },
  { 
    id: 'open_to_discussion', 
    label: '상황에 따라 결정',
    description: '파트너와 상황에 맞게 결정하고 싶어요'
  },
  { 
    id: 'any', 
    label: '상관없음',
    description: '자녀 계획은 중요하지 않아요'
  }
];

export default function ChildrenPreferenceSelector({ onComplete }) {
  const { idealTypeData, setIdealTypeData } = useSignupStore();
  const [selected, setSelected] = useState(idealTypeData.childrenPlan || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected) {
      setIdealTypeData({
        ...idealTypeData,
        childrenPlan: selected
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        자녀 계획에 대한 선호도를 선택해주세요
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {CHILDREN_PREFERENCES.map((pref) => (
            <button
              key={pref.id}
              type="button"
              onClick={() => setSelected(pref.id)}
              className={`p-4 text-left rounded-lg transition-all border ${
                selected === pref.id
                  ? 'bg-purple-50 border-purple-500'
                  : 'bg-white border-gray-200 hover:border-purple-500'
              }`}
            >
              <div className="font-medium">{pref.label}</div>
              <div className="text-sm text-gray-500 mt-1">{pref.description}</div>
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={!selected}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </form>
    </div>
  );
} 