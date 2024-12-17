'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth';

export default function FeedbackPage() {
  const router = useRouter();
  const { completeStep, setCurrentStep } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    rating: '',
    impression: '',
    nextMeeting: '',
    feedback: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 피드백 저장 로직
      completeStep(8);
      setCurrentStep(9);
      router.push('/success');
    } catch (error) {
      console.error('Error:', error);
      alert('피드백 저장 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">만남 피드백</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            전반적인 만족도
          </label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          >
            <option value="">선택해주세요</option>
            <option value="5">매우 만족</option>
            <option value="4">만족</option>
            <option value="3">보통</option>
            <option value="2">불만족</option>
            <option value="1">매우 불만족</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            첫인상
          </label>
          <textarea
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.impression}
            onChange={(e) => setFormData({ ...formData, impression: e.target.value })}
            placeholder="첫 만남에서 받은 인상을 자유롭게 적어주세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            다음 만남 의향
          </label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.nextMeeting}
            onChange={(e) => setFormData({ ...formData, nextMeeting: e.target.value })}
          >
            <option value="">선택해주세요</option>
            <option value="yes">예, 다시 만나고 싶습니다</option>
            <option value="maybe">고민해보겠습니다</option>
            <option value="no">아니요, 다음 기회에</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            추가 피드백
          </label>
          <textarea
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            placeholder="매칭 서비스나 상대방에 대한 추가 의견을 자유롭게 작성해주세요"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
        >
          {isLoading ? '저장 중...' : '피드백 제출하기'}
        </button>
      </form>
    </div>
  );
} 