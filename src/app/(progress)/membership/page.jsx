'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth';

const MEMBERSHIP_PLANS = [
  {
    id: 'basic',
    name: '베이직',
    price: '180,000원',
    duration: '6개월',
    features: [
      '전담 매칭 플래너 배정',
      '월 2회 맞춤 프로필 추천',
      '기본 매칭 서비스'
    ]
  },
  {
    id: 'premium',
    name: '프리미엄',
    price: '280,000원',
    duration: '6개월',
    features: [
      '전담 시니어 매칭 플래너',
      '무제한 프로필 추천',
      '데이트 코칭 서비스',
      '이미지 컨설팅 1회'
    ]
  }
];

export default function MembershipPage() {
  const router = useRouter();
  const { completeStep, setCurrentStep } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!selectedPlan) {
      alert('멤버십을 선택해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      // 결제 로직 구현
      completeStep(5);
      setCurrentStep(6);
      router.push('/matching');
    } catch (error) {
      console.error('Error:', error);
      alert('결제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">멤버십 선택</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MEMBERSHIP_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-lg p-6 cursor-pointer transition-all ${
              selectedPlan === plan.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-2xl font-bold text-purple-600 mb-2">
              {plan.price}
            </p>
            <p className="text-gray-500 mb-4">{plan.duration}</p>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <svg
                    className="w-4 h-4 text-purple-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button
        onClick={handlePayment}
        disabled={!selectedPlan || isLoading}
        className="w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
      >
        {isLoading ? '처리중...' : '결제하기'}
      </button>
    </div>
  );
} 