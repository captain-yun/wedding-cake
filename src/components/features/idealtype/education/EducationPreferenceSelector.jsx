'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

const EDUCATION_LEVELS = [
  { id: 'highschool', label: '고등학교 졸업' },
  { id: 'college', label: '전문대학 졸업' },
  { id: 'university', label: '대학교 졸업' },
  { id: 'master', label: '석사' },
  { id: 'doctor', label: '박사' }
];

export default function EducationPreferenceSelector({ onComplete }) {
  const { idealTypeData, setIdealTypeData } = useSignupStore();
  const [selectedLevels, setSelectedLevels] = useState(idealTypeData.education || []);

  const handleToggle = (levelId) => {
    setSelectedLevels(prev => {
      if (prev.includes(levelId)) {
        return prev.filter(id => id !== levelId);
      }
      return [...prev, levelId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedLevels.length > 0) {
      setIdealTypeData({
        ...idealTypeData,
        education: selectedLevels
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        선호하는 학력을 선택해주세요
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        복수 선택 가능합니다
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {EDUCATION_LEVELS.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => handleToggle(level.id)}
              className={`p-4 text-center rounded-lg transition-all border ${
                selectedLevels.includes(level.id)
                  ? 'bg-purple-50 border-purple-500'
                  : 'bg-white border-gray-200 hover:border-purple-500'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={selectedLevels.length === 0}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </form>
    </div>
  );
} 