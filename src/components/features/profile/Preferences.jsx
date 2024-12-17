'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Preferences({ onComplete }) {
  const supabase = createClientComponentClient();
  const [formData, setFormData] = useState({
    age_range: '',
    location_preference: '',
    education: '',
    occupation_preference: '',
    important_values: '',
    deal_breakers: ''
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
          preferences: formData,
          onboarding_step: 5
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
      <h2 className="text-2xl font-bold mb-6">선호하는 조건을 알려주세요</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">선호하는 나이대</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="예: 28-35세"
            value={formData.age_range}
            onChange={(e) => setFormData({ ...formData, age_range: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">선호하는 거주지역</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="예: 서울, 경기도"
            value={formData.location_preference}
            onChange={(e) => setFormData({ ...formData, location_preference: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">학력</label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
          >
            <option value="">선택해주세요</option>
            <option value="상관없음">상관없음</option>
            <option value="대졸 이상">대졸 이상</option>
            <option value="석사 이상">석사 이상</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">선호하는 직업</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="예: 전문직, 사무직 등 (선택사항)"
            value={formData.occupation_preference}
            onChange={(e) => setFormData({ ...formData, occupation_preference: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">중요하게 생각하는 가치관</label>
          <textarea
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="예: 가족 관계, 삶의 목표, 결혼관 등"
            value={formData.important_values}
            onChange={(e) => setFormData({ ...formData, important_values: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">매칭 제외 조건</label>
          <textarea
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="예: 흡연, 음주 등 (선택사항)"
            value={formData.deal_breakers}
            onChange={(e) => setFormData({ ...formData, deal_breakers: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
        >
          {isLoading ? '저장 중...' : '완료'}
        </button>
      </form>
    </div>
  );
} 