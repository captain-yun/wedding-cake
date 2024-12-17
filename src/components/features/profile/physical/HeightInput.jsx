'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

export default function HeightInput({ onComplete }) {
  const { formData, setFormData } = useSignupStore();
  const [height, setHeight] = useState(formData.height || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (height >= 140 && height <= 210) {
      setFormData({
        ...formData,
        height: parseInt(height)
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        키를 입력해주세요
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="140"
            max="210"
            className="flex-1 px-4 py-3 text-lg text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="140-210"
          />
          <span className="text-lg text-gray-600">cm</span>
        </div>
        {height && (height < 140 || height > 210) && (
          <p className="text-red-500 text-sm text-center">
            140cm에서 210cm 사이의 값을 입력해주세요
          </p>
        )}
        <button
          type="submit"
          disabled={!height || height < 140 || height > 210}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </form>
    </div>
  );
} 