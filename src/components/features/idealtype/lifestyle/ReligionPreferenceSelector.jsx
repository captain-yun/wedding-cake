'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

const RELIGION_PREFERENCES = [
  { 
    id: 'same_religion', 
    label: '같은 종교를 가진 분',
    description: '나와 같은 종교를 가진 분을 선호해요'
  },
  { 
    id: 'no_religion', 
    label: '종교가 없는 분',
    description: '무교인 분을 선호해요'
  },
  { 
    id: 'respect_religion', 
    label: '종교를 존중하는 분',
    description: '서로의 종교를 이해하고 존중할 수 있는 분이면 좋아요'
  },
  { 
    id: 'any', 
    label: '상관없음',
    description: '종교는 중요하지 않아요'
  }
];

export default function ReligionPreferenceSelector({ onComplete }) {
  const { idealTypeData, setIdealTypeData } = useSignupStore();
  const [selected, setSelected] = useState(idealTypeData.religion || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected) {
      setIdealTypeData({
        ...idealTypeData,
        religion: selected
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        종교에 대한 선호도를 선택해주세요
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {RELIGION_PREFERENCES.map((pref) => (
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