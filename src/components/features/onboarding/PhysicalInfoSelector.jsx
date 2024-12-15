'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

const HEIGHT_RANGES = Array.from({ length: 61 }, (_, i) => 150 + i); // 150-210cm
const BODY_TYPES = {
  male: [
    { id: 'slim', label: '마른 체형' },
    { id: 'athletic', label: '보통/슬림' },
    { id: 'muscular', label: '근육질' },
    { id: 'average', label: '보통' },
    { id: 'chubby', label: '통통' },
    { id: 'heavy', label: '체격이 큰' }
  ],
  female: [
    { id: 'slim', label: '마른 체형' },
    { id: 'athletic', label: '보통/슬림' },
    { id: 'average', label: '보통' },
    { id: 'curvy', label: '글래머' },
    { id: 'chubby', label: '통통' },
    { id: 'heavy', label: '체격이 큰' }
  ]
};

export default function PhysicalInfoSelector() {
  const { formData, setFormData } = useSignupStore();
  const [showingHeight, setShowingHeight] = useState(true);

  const bodyTypes = BODY_TYPES[formData.gender || 'male'];

  return (
    <div className="space-y-6">
      {showingHeight ? (
        <>
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
            키를 선택해주세요
          </h2>
          <div className="grid grid-cols-4 gap-3 max-h-[400px] overflow-y-auto">
            {HEIGHT_RANGES.map((height) => (
              <button
                key={height}
                type="button"
                onClick={() => {
                  setFormData({ height });
                  setShowingHeight(false);
                }}
                className={`p-4 text-center rounded-lg transition-all ${
                  formData.height === height
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-500'
                }`}
              >
                {height}cm
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
            체형을 선택해주세요
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {bodyTypes.map(({ id, label }) => (
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
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 