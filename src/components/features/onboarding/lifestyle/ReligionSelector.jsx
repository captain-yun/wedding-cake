'use client';

import useSignupStore from '@/store/signup';

const RELIGION_OPTIONS = [
  { 
    id: 'none', 
    label: '무교', 
    description: '종교가 없어요' 
  },
  { 
    id: 'christian', 
    label: '기독교', 
    description: '기독교/개신교' 
  },
  { 
    id: 'catholic', 
    label: '천주교', 
    description: '가톨릭' 
  },
  { 
    id: 'buddhist', 
    label: '불교', 
    description: '불교' 
  },
  { 
    id: 'other', 
    label: '기타', 
    description: '다른 종교를 가지고 있어요' 
  }
];

export default function ReligionSelector() {
  const { formData, setFormData } = useSignupStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        종교를 선택해주세요
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {RELIGION_OPTIONS.map(({ id, label, description }) => (
          <button
            key={id}
            onClick={() => setFormData({ religion: id })}
            className={`p-4 text-center rounded-lg transition-all ${
              formData.religion === id
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