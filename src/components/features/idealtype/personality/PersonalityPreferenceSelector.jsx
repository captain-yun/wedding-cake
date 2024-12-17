'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

const PERSONALITY_TRAITS = [
  { id: 'bright', label: '밝고 긍정적인', description: '항상 웃음이 가득하고 긍정적인 마인드를 가진' },
  { id: 'calm', label: '차분하고 진중한', description: '안정적이고 신중한 성격의' },
  { id: 'active', label: '활발하고 적극적인', description: '에너지가 넘치고 도전을 즐기는' },
  { id: 'kind', label: '따뜻하고 배려심 있는', description: '타인을 생각하고 이해심이 깊은' },
  { id: 'honest', label: '솔직하고 진실된', description: '거짓없이 진실되고 신뢰할 수 있는' },
  { id: 'humorous', label: '유머러스한', description: '재치있고 유머감각이 있는' },
  { id: 'romantic', label: '로맨틱한', description: '감성적이고 낭만적인' },
  { id: 'independent', label: '독립적인', description: '주체적이고 자기주관이 뚜렷한' }
];

export default function PersonalityPreferenceSelector({ onComplete }) {
  const { idealTypeData, setIdealTypeData } = useSignupStore();
  const [selectedTraits, setSelectedTraits] = useState(idealTypeData.personalities || []);

  const handleToggle = (traitId) => {
    setSelectedTraits(prev => {
      if (prev.includes(traitId)) {
        return prev.filter(id => id !== traitId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, traitId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTraits.length > 0) {
      setIdealTypeData({
        ...idealTypeData,
        personalities: selectedTraits
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        선호하는 성격을 선택해주세요
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        최대 3개까지 선택 가능합니다
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {PERSONALITY_TRAITS.map((trait) => (
            <button
              key={trait.id}
              type="button"
              onClick={() => handleToggle(trait.id)}
              disabled={!selectedTraits.includes(trait.id) && selectedTraits.length >= 3}
              className={`p-4 text-center rounded-lg transition-all border ${
                selectedTraits.includes(trait.id)
                  ? 'bg-purple-50 border-purple-500'
                  : 'bg-white border-gray-200 hover:border-purple-500 disabled:opacity-50 disabled:hover:border-gray-200'
              }`}
            >
              <div className="font-medium">{trait.label}</div>
              <div className="text-sm text-gray-500 mt-1">{trait.description}</div>
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={selectedTraits.length === 0}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </form>
    </div>
  );
} 