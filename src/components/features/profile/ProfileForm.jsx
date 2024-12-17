'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useAuthStore from '@/store/auth';

export default function ProfileForm({ onComplete }) {
  const supabase = createClientComponentClient();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    gender: '',
    occupation: '',
    education: '',
    location: '',
    height: '',
    weight: '',
    smoking: '',
    drinking: '',
    religion: '',
    mbti: '',
    introduction: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...formData,
          profile_completed: true
        });

      if (error) throw error;
      onComplete();
    } catch (error) {
      console.error('Error:', error);
      alert('프로필 저장 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">프로필 작성</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">이름</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">생년월일</label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={formData.birthdate}
              onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">성별</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="">선택해주세요</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">직업</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
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
              <option value="high_school">고등학교 졸업</option>
              <option value="university">대학교 졸업</option>
              <option value="graduate">대학원 졸업</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">거주지역</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">키 (cm)</label>
            <input
              type="number"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">체중 (kg)</label>
            <input
              type="number"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">흡연</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={formData.smoking}
              onChange={(e) => setFormData({ ...formData, smoking: e.target.value })}
            >
              <option value="">선택해주세요</option>
              <option value="never">비흡연</option>
              <option value="quit">금연</option>
              <option value="sometimes">가끔</option>
              <option value="often">자주</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">음주</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={formData.drinking}
              onChange={(e) => setFormData({ ...formData, drinking: e.target.value })}
            >
              <option value="">선택해주세요</option>
              <option value="never">비음주</option>
              <option value="rarely">거의 안 함</option>
              <option value="sometimes">가끔</option>
              <option value="often">자주</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">종교</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={formData.religion}
              onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
            >
              <option value="">선택해주세요</option>
              <option value="none">무교</option>
              <option value="christian">기독교</option>
              <option value="catholic">천주교</option>
              <option value="buddhist">불교</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">MBTI</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={formData.mbti}
              onChange={(e) => setFormData({ ...formData, mbti: e.target.value })}
            >
              <option value="">선택해주세요</option>
              {['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 
                'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">자기소개</label>
          <textarea
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.introduction}
            onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
            placeholder="자신을 자유롭게 소개해주세요"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? '저장 중...' : '다음'}
          </button>
        </div>
      </form>
    </div>
  );
} 