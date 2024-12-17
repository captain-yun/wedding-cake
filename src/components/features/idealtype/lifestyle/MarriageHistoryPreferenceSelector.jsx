'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

const MARRIAGE_PREFERENCES = [
  { 
    id: 'never_married', 
    label: '초혼 선호',
    description: '결혼 경험이 없는 분을 선호해요'
  },
  { 
    id: 'divorced_ok', 
    label: '재혼도 괜찮아요',
    description: '이혼 경험이 있어도 괜찮아요'
  },
  { 
    id: 'widowed_ok', 
    label: '사별도 괜찮아요',
    description: '사별하신 분도 괜찮아요'
  },
  { 
    id: 'any', 
    label: '상관없어요',
    description: '결혼 이력은 중요하지 않아요'
  }
];

export default function MarriageHistoryPreferenceSelector({ onComplete }) {
  const { idealTypeData, setIdealTypeData } = useSignupStore();
  const [selected, setSelected] = useState(idealTypeData.marriageHistory || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected) {
      setIdealTypeData({
        ...idealTypeData,
        marriageHistory: selected
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        결혼 이력에 대한 선호도를 선택해주세요
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {MARRIAGE_PREFERENCES.map((pref) => (
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