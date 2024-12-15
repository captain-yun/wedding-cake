'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AboutMe({ onComplete }) {
  const supabase = createClientComponentClient();
  const [formData, setFormData] = useState({
    introduction: '',
    hobbies: '',
    personality: '',
    lifestyle: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('profiles')
        .update({
          ...formData,
          onboarding_step: 4
        })
        .eq('id', user.id);

      if (error) throw error;
      onComplete();
    } catch (error) {
      console.error('Error:', error);
      alert('정보 저장 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">자기소개를 작성해주세요</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">자기소개</label>
          <textarea
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="나를 표현하는 글을 자유롭게 작성해주세요"
            value={formData.introduction}
            onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">취미/관심사</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="예: 여행, 요리, 운동, 독서 등"
            value={formData.hobbies}
            onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">성격/특징</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="예: 활발한, 차분한, 긍정적인 등"
            value={formData.personality}
            onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">라이프스타일</label>
          <textarea
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="평소 생활 패턴이나 주말 시간 활용 방법 등을 적어주세요"
            value={formData.lifestyle}
            onChange={(e) => setFormData({ ...formData, lifestyle: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
        >
          {isLoading ? '저장 중...' : '다음'}
        </button>
      </form>
    </div>
  );
} 