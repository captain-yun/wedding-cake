'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

const DRINKING_PREFERENCES = [
  { id: 'no_drinking', label: '비음주자만' },
  { id: 'social_drinking', label: '사교적인 음주는 괜찮아요' },
  { id: 'moderate_drinking', label: '적당한 음주는 괜찮아요' },
  { id: 'any', label: '상관없어요' }
];

export default function DrinkingPreferenceSelector({ onComplete }) {
  const { idealTypeData, setIdealTypeData } = useSignupStore();
  const [selected, setSelected] = useState(idealTypeData.drinking || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected) {
      setIdealTypeData({
        ...idealTypeData,
        drinking: selected
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        음주에 대한 선호도를 선택해주세요
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {DRINKING_PREFERENCES.map((pref) => (
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