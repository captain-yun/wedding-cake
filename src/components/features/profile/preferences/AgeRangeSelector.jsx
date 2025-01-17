'use client';

import { useState, useEffect } from 'react';
import useSignupStore from '@/store/signup';

export default function AgeRangeSelector({ onComplete }) {
  const { idealTypeData, setIdealTypeData } = useSignupStore();
  const [minAge, setMinAge] = useState(idealTypeData.ageRange?.min || '');
  const [maxAge, setMaxAge] = useState(idealTypeData.ageRange?.max || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (minAge && maxAge && parseInt(minAge) <= parseInt(maxAge)) {
      setIdealTypeData({
        ...idealTypeData,
        ageRange: {
          min: parseInt(minAge),
          max: parseInt(maxAge)
        }
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        선호하는 나이 범위를 선택해주세요
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              최소 나이
            </label>
            <input
              type="number"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              min="20"
              max="65"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="20-65"
            />
          </div>
          <span className="text-gray-500 mt-6">~</span>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              최대 나이
            </label>
            <input
              type="number"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              min={minAge || "20"}
              max="65"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="20-65"
            />
          </div>
        </div>

        {minAge && maxAge && parseInt(minAge) > parseInt(maxAge) && (
          <p className="text-red-500 text-sm text-center">
            최소 나이는 최대 나이보다 클 수 없습니다
          </p>
        )}

        <button
          type="submit"
          disabled={!minAge || !maxAge || parseInt(minAge) > parseInt(maxAge)}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </form>
    </div>
  );
} 