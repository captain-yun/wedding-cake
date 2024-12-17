'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

const JOB_CATEGORIES = [
  {
    id: 'office',
    name: '사무/관리',
    jobs: ['일반사무직', '경영/관리직', '인사/총무', '재무/회계', '마케팅/홍보']
  },
  {
    id: 'it',
    name: 'IT/인터넷',
    jobs: ['개발자', '데이터분석가', 'IT기획자', '서버관리자', 'QA/테스터']
  },
  {
    id: 'professional',
    name: '전문직',
    jobs: ['의사', '약사', '변호사', '회계사', '세무사', '법무사']
  },
  {
    id: 'education',
    name: '교육',
    jobs: ['초/중/고교사', '대학교수', '학원강사', '교육기획', '유치원교사']
  },
  {
    id: 'finance',
    name: '금융/보험',
    jobs: ['은행원', '증권사', '보험설계사', '투자상담사', '펀드매니저']
  },
  {
    id: 'public',
    name: '공공/행정',
    jobs: ['공무원', '공기업', '군인', '경찰', '소방관']
  }
];

export default function OccupationPreferenceSelector({ onComplete }) {
  const { idealTypeData, setIdealTypeData } = useSignupStore();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState(idealTypeData.occupations || []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleJobToggle = (job) => {
    setSelectedJobs(prev => {
      if (prev.includes(job)) {
        return prev.filter(j => j !== job);
      }
      return [...prev, job];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedJobs.length > 0) {
      setIdealTypeData({
        ...idealTypeData,
        occupations: selectedJobs
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        선호하는 직업을 선택해주세요
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        복수 선택 가능합니다
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 직종 카테고리 선택 */}
        <div className="grid grid-cols-2 gap-2">
          {JOB_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategorySelect(category)}
              className={`p-3 text-center rounded-lg transition-all border ${
                selectedCategory?.id === category.id
                  ? 'bg-purple-50 border-purple-500'
                  : 'bg-white border-gray-200 hover:border-purple-500'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 세부 직업 선택 */}
        {selectedCategory && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {selectedCategory.name} 분야의 직업 선택
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {selectedCategory.jobs.map((job) => (
                <button
                  key={job}
                  type="button"
                  onClick={() => handleJobToggle(job)}
                  className={`p-2 text-sm text-center rounded-lg transition-all border ${
                    selectedJobs.includes(job)
                      ? 'bg-purple-50 border-purple-500'
                      : 'bg-white border-gray-200 hover:border-purple-500'
                  }`}
                >
                  {job}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={selectedJobs.length === 0}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </form>
    </div>
  );
} 