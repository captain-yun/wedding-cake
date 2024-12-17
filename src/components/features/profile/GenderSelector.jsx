'use client';

import useSignupStore from '@/store/signup';

export default function GenderSelector() {
  const { formData, setFormData } = useSignupStore();

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">성별</label>
      <div className="grid grid-cols-2 gap-4">
        {[
          { value: 'male', label: '남성' },
          { value: 'female', label: '여성' }
        ].map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFormData({ gender: value })}
            className={`px-4 py-3 border rounded-lg text-center transition-colors ${
              formData.gender === value
                ? 'border-purple-600 bg-purple-50 text-purple-600'
                : 'border-gray-300 text-gray-700 hover:border-purple-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
} 