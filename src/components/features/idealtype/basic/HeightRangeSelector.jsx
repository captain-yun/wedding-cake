'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

export default function HeightRangeSelector({ onComplete }) {
  const { idealTypeData, setIdealTypeData } = useSignupStore();
  const [minHeight, setMinHeight] = useState(idealTypeData.heightRange?.min || '');
  const [maxHeight, setMaxHeight] = useState(idealTypeData.heightRange?.max || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (minHeight && maxHeight && parseInt(minHeight) <= parseInt(maxHeight)) {
      setIdealTypeData({
        ...idealTypeData,
        heightRange: {
          min: parseInt(minHeight),
          max: parseInt(maxHeight)
        }
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        선호하는 키 범위를 선택해주세요
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              최소 키
            </label>
            <div className="flex items-center">
              <input
                type="number"
                value={minHeight}
                onChange={(e) => setMinHeight(e.target.value)}
                min="140"
                max="200"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="140-200"
              />
              <span className="ml-2 text-gray-600">cm</span>
            </div>
          </div>
          <span className="text-gray-500 mt-6">~</span>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              최대 키
            </label>
            <div className="flex items-center">
              <input
                type="number"
                value={maxHeight}
                onChange={(e) => setMaxHeight(e.target.value)}
                min={minHeight || "140"}
                max="200"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="140-200"
              />
              <span className="ml-2 text-gray-600">cm</span>
            </div>
          </div>
        </div>

        {minHeight && maxHeight && parseInt(minHeight) > parseInt(maxHeight) && (
          <p className="text-red-500 text-sm text-center">
            최소 키는 최대 키보다 클 수 없습니다
          </p>
        )}

        <button
          type="submit"
          disabled={!minHeight || !maxHeight || parseInt(minHeight) > parseInt(maxHeight)}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </form>
    </div>
  );
} 