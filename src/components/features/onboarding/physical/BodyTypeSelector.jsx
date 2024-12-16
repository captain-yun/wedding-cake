'use client';

import useSignupStore from '@/store/signup';

const BODY_TYPES = {
  male: [
    { id: 'slim', label: '마른 체형', description: '날씬하고 마른 체형' },
    { id: 'athletic', label: '슬림탄탄', description: '슬림하면서 탄탄한 체형' },
    { id: 'muscular', label: '근육질', description: '운동으로 다진 탄탄한 체격' },
    { id: 'average', label: '보통', description: '평균적인 체형' },
    { id: 'sturdy', label: '건장한', description: '단단하고 건장한 체격' },
    { id: 'heavy', label: '통통한', description: '포근하고 통통한 체형' }
  ],
  female: [
    { id: 'slim', label: '마른 체형', description: '날씬하고 마른 체형' },
    { id: 'slim_fit', label: '슬림탄탄', description: '슬림하면서 탄탄한 체형' },
    { id: 'average', label: '보통', description: '평균적인 체형' },
    { id: 'glamorous', label: '글래머러스', description: '볼륨감 있는 체형' },
    { id: 'curvy', label: '섹시큐티', description: '귀엽고 섹시한 체형' },
    { id: 'plump', label: '통통한', description: '포근하고 통통한 체��' }
  ]
};

export default function BodyTypeSelector() {
  const { formData, setFormData } = useSignupStore();
  const bodyTypes = BODY_TYPES[formData.gender || 'male'];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        체형을 선택해주세요
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {bodyTypes.map(({ id, label, description }) => (
          <button
            key={id}
            type="button"
            onClick={() => setFormData({ bodyType: id })}
            className={`p-4 text-center rounded-lg transition-all ${
              formData.bodyType === id
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