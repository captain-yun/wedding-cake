'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

export default function MarriageStatusSelector() {
  const { formData, setFormData } = useSignupStore();
  const [showChildrenInput, setShowChildrenInput] = useState(false);

  const handleStatusSelect = (status) => {
    setFormData({ 
      marriageStatus: status,
      children: status === 'never_married' ? null : formData.children 
    });
    setShowChildrenInput(status === 'divorced');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        결혼 이력을 선택해주세요
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => handleStatusSelect('never_married')}
          className={`p-6 rounded-lg transition-all ${
            formData.marriageStatus === 'never_married'
              ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
              : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-500'
          }`}
        >
          초혼
        </button>
        <button
          type="button"
          onClick={() => handleStatusSelect('divorced')}
          className={`p-6 rounded-lg transition-all ${
            formData.marriageStatus === 'divorced'
              ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
              : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-500'
          }`}
        >
          재혼
        </button>
      </div>

      {showChildrenInput && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">자녀가 있으신가요?</h3>
          <div className="grid grid-cols-2 gap-4">
            {['없음', '1명', '2명', '3명 이상'].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setFormData({ children: count })}
                className={`p-4 rounded-lg transition-all ${
                  formData.children === count
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-500'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 