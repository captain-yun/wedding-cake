'use client';

import { useState, useEffect } from 'react';
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

export default function BodyTypeSelector({ onComplete }) {
  const { formData, setFormData } = useSignupStore();
  
  const bodyTypes = BODY_TYPES[formData.gender] || BODY_TYPES.male;

  const handleSelect = (type) => {
    setFormData({
      ...formData,
      bodyType: type
    });
    onComplete();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        체형을 선택해주세요
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {bodyTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`p-4 text-center rounded-lg transition-all border
              ${formData.bodyType === type.id
                ? 'bg-purple-50 border-purple-500'
                : 'bg-white border-gray-200 hover:border-purple-500'
              }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
} 