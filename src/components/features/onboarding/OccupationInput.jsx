'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

const OCCUPATION_CATEGORIES = [
  '경영/사무',
  'IT/개발',
  '의료/보건',
  '교육',
  '금융/보험',
  '서비스업',
  '공무원',
  '전문직',
  '자영업',
  '예술/문화',
  '학생',
  '기타'
];

export default function OccupationInput() {
  const { formData, setFormData } = useSignupStore();
  const [showDetail, setShowDetail] = useState(false);
  const [detailOccupation, setDetailOccupation] = useState('');

  const handleCategorySelect = (category) => {
    if (category === '기타') {
      setShowDetail(true);
    } else {
      setFormData({ occupation: category });
      setShowDetail(false);
    }
  };

  const handleDetailSubmit = (e) => {
    e.preventDefault();
    setFormData({ occupation: detailOccupation });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        직업을 선택해주세요
      </h2>
      
      {!showDetail ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {OCCUPATION_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategorySelect(category)}
              className={`p-4 text-center rounded-lg transition-all ${
                formData.occupation === category
                  ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      ) : (
        <form onSubmit={handleDetailSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              구체적인 직업을 입력해주세요
            </label>
            <input
              type="text"
              value={detailOccupation}
              onChange={(e) => setDetailOccupation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="예: 프리랜서 디자이너"
              required
            />
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setShowDetail(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              이전
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              확인
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 