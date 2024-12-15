'use client';

import useSignupStore from '@/store/signup';

const EDUCATION_LEVELS = [
  { id: 'high_school', label: '고등학교 졸업' },
  { id: 'college', label: '전문대 졸업' },
  { id: 'university', label: '대학교 졸업' },
  { id: 'master', label: '석사' },
  { id: 'doctor', label: '박사' },
  { id: 'studying', label: '재학중' }
];

export default function EducationSelector() {
  const { formData, setFormData } = useSignupStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        최종 학력을 선택해주세요
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {EDUCATION_LEVELS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setFormData({ education: id })}
            className={`p-4 text-center rounded-lg transition-all ${
              formData.education === id
                ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
} 