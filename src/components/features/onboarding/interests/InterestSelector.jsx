'use client';

import useSignupStore from '@/store/signup';

const INTEREST_OPTIONS = [
  { id: 'self_development', label: '자기계발', icon: '📚' },
  { id: 'finance', label: '재테크', icon: '💰' },
  { id: 'startup', label: '창업/사업', icon: '🚀' },
  { id: 'tech', label: 'IT/테크', icon: '💻' },
  { id: 'culture', label: '문화/예술', icon: '🎭' },
  { id: 'social', label: '사교/네트워킹', icon: '🤝' },
  { id: 'environment', label: '환경/지속가능', icon: '🌱' },
  { id: 'health', label: '건강/웰빙', icon: '🧘' },
  { id: 'food', label: '맛집/미식', icon: '🍽️' },
  { id: 'fashion', label: '패션/뷰티', icon: '👗' },
  { id: 'volunteer', label: '봉사활동', icon: '🤲' },
  { id: 'politics', label: '시사/정치', icon: '📰' }
];

export default function InterestSelector() {
  const { formData, setFormData } = useSignupStore();
  const selectedInterests = formData.interests || [];

  const toggleInterest = (interestId) => {
    const newInterests = selectedInterests.includes(interestId)
      ? selectedInterests.filter(id => id !== interestId)
      : [...selectedInterests, interestId];
    
    setFormData({ interests: newInterests });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-gray-900">
          관심사를 선택해주세요
        </h2>
        <p className="text-sm text-gray-500">
          최대 5개까지 선택할 수 있어요
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {INTEREST_OPTIONS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => {
              if (selectedInterests.length < 5 || selectedInterests.includes(id)) {
                toggleInterest(id);
              }
            }}
            disabled={selectedInterests.length >= 5 && !selectedInterests.includes(id)}
            className={`p-4 text-center rounded-lg transition-all ${
              selectedInterests.includes(id)
                ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-500 disabled:opacity-50'
            }`}
          >
            <div className="text-2xl mb-1">{icon}</div>
            <div className="font-medium text-sm">{label}</div>
          </button>
        ))}
      </div>
    </div>
  );
} 