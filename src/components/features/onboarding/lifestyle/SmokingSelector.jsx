'use client';

import useSignupStore from '@/store/signup';

const SMOKING_OPTIONS = [
  { id: 'non_smoker', label: '비흡연', description: '전혀 피우지 않아요' },
  { id: 'social_smoker', label: '가끔 피움', description: '사교적인 자리에서만 가끔' },
  { id: 'smoker', label: '흡연', description: '흡연자입니다' },
  { id: 'quit_smoking', label: '금연중', description: '현재 금연 실천중이에요' }
];

export default function SmokingSelector() {
  const { formData, setFormData } = useSignupStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        흡연 여부를 선택해주세요
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {SMOKING_OPTIONS.map(({ id, label, description }) => (
          <button
            key={id}
            onClick={() => setFormData({ smoking: id })}
            className={`p-4 text-center rounded-lg transition-all ${
              formData.smoking === id
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