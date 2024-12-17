'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

const BODY_TYPES = {
  male: [
    { id: 'slim', label: '마른 체형' },
    { id: 'athletic', label: '보통/슬림' },
    { id: 'muscular', label: '근육질' },
    { id: 'average', label: '보통' },
    { id: 'chubby', label: '통통' },
    { id: 'heavy', label: '건장' }
  ],
  female: [
    { id: 'slim', label: '마른 체형' },
    { id: 'slender', label: '보통/슬림' },
    { id: 'average', label: '보통' },
    { id: 'curvy', label: '글래머' },
    { id: 'chubby', label: '통통' },
    { id: 'athletic', label: '스포티' }
  ]
};

export default function BodyTypePreferenceSelector({ onComplete }) {
  const { idealTypeData, setIdealTypeData } = useSignupStore();
  const [selectedTypes, setSelectedTypes] = useState(idealTypeData.bodyTypes || []);

  const handleToggle = (typeId) => {
    setSelectedTypes(prev => {
      if (prev.includes(typeId)) {
        return prev.filter(id => id !== typeId);
      }
      return [...prev, typeId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTypes.length > 0) {
      setIdealTypeData({
        ...idealTypeData,
        bodyTypes: selectedTypes
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        선호하는 체형을 선택해주세요
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        복수 선택 가능합니다
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {Object.values(BODY_TYPES)[idealTypeData.gender === 'female' ? 1 : 0].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleToggle(type.id)}
              className={`p-4 text-center rounded-lg transition-all border ${
                selectedTypes.includes(type.id)
                  ? 'bg-purple-50 border-purple-500'
                  : 'bg-white border-gray-200 hover:border-purple-500'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={selectedTypes.length === 0}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </form>
    </div>
  );
} 