'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

const SMOKING_PREFERENCES = [
  { id: 'no_smoking', label: '비흡연자만' },
  { id: 'trying_to_quit', label: '금연 시도 중인 사람도 괜찮아요' },
  { id: 'light_smoking', label: '가끔 피우는 정도는 괜찮아요' },
  { id: 'any', label: '상관없어요' }
];

export default function SmokingPreferenceSelector({ onComplete }) {
  const { idealTypeData, setIdealTypeData } = useSignupStore();
  const [selected, setSelected] = useState(idealTypeData.smoking || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected) {
      setIdealTypeData({
        ...idealTypeData,
        smoking: selected
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        흡연에 대한 선호도를 선택해주세요
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {SMOKING_PREFERENCES.map((pref) => (
            <button
              key={pref.id}
              type="button"
              onClick={() => setSelected(pref.id)}
              className={`p-4 text-center rounded-lg transition-all border ${
                selected === pref.id
                  ? 'bg-purple-50 border-purple-500'
                  : 'bg-white border-gray-200 hover:border-purple-500'
              }`}
            >
              {pref.label}
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