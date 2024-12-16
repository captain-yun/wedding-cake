'use client';

import useSignupStore from '@/store/signup';

const IDEAL_TYPE_OPTIONS = [
  {
    category: '성격',
    options: [
      { id: 'personality_bright', label: '밝고 긍정적인' },
      { id: 'personality_calm', label: '차분하고 진중한' },
      { id: 'personality_kind', label: '따뜻하고 배려심 있는' },
      { id: 'personality_active', label: '활동적이고 적극적인' }
    ]
  },
  {
    category: '가치관',
    options: [
      { id: 'value_family', label: '가족을 중시하는' },
      { id: 'value_career', label: '자기 일에 열정적인' },
      { id: 'value_growth', label: '함께 성장하고 싶은' },
      { id: 'value_communication', label: '대화가 잘 통하는' }
    ]
  },
  {
    category: '라이프스타일',
    options: [
      { id: 'lifestyle_active', label: '취미생활을 함께하는' },
      { id: 'lifestyle_stable', label: '안정적인 생활을 하는' },
      { id: 'lifestyle_challenge', label: '도전을 즐기는' },
      { id: 'lifestyle_social', label: '사교적인' }
    ]
  }
];

export default function IdealTypeSelector() {
  const { formData, setFormData } = useSignupStore();
  const selectedTypes = formData.idealTypes || [];

  const toggleType = (typeId) => {
    const newTypes = selectedTypes.includes(typeId)
      ? selectedTypes.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    
    setFormData({ idealTypes: newTypes });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        이상형을 선택해주세요
      </h2>
      <div className="space-y-8">
        {IDEAL_TYPE_OPTIONS.map(({ category, options }) => (
          <div key={category} className="space-y-3">
            <h3 className="font-medium text-gray-900">{category}</h3>
            <div className="grid grid-cols-2 gap-3">
              {options.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => toggleType(id)}
                  className={`p-3 text-center rounded-lg transition-all ${
                    selectedTypes.includes(id)
                      ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-500'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 