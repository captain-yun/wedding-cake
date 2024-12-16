'use client';

import useSignupStore from '@/store/signup';

const DRINKING_OPTIONS = [
  { 
    id: 'non_drinker', 
    label: '비음주', 
    description: '전혀 마시지 않아요' 
  },
  { 
    id: 'light_drinker', 
    label: '가벼운 음주', 
    description: '월 1-2회 정도 가볍게' 
  },
  { 
    id: 'social_drinker', 
    label: '사교적 음주', 
    description: '주 1-2회 정도 적당히' 
  },
  { 
    id: 'heavy_drinker', 
    label: '즐기는 편', 
    description: '자주 마시는 편이에요' 
  },
  { 
    id: 'quit_drinking', 
    label: '금주중', 
    description: '현재는 마시지 않아요' 
  }
];

export default function DrinkingSelector() {
  const { formData, setFormData } = useSignupStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        음주 습관을 선택해주세요
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {DRINKING_OPTIONS.map(({ id, label, description }) => (
          <button
            key={id}
            onClick={() => setFormData({ drinking: id })}
            className={`p-4 text-center rounded-lg transition-all ${
              formData.drinking === id
                ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-500'
            }`}
          >
            <div className="font-medium">{label}</div>
            <div className="text-sm text-gray-500 mt-1">{description}</div>
          </button>
        ))}
      </div>
    </div>
  );
} 