'use client';

import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth';
import { Heart } from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();
  const { completeStep } = useAuthStore();

  const handleComplete = () => {
    completeStep(9);
    router.push('/dashboard');
  };

  return (
    <div className="space-y-8 text-center">
      <div className="flex justify-center">
        <div className="bg-pink-100 rounded-full p-6">
          <Heart className="w-12 h-12 text-pink-600" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          축하합니다!
        </h2>
        <p className="text-lg text-gray-600">
          성공적인 매칭이 이루어졌습니다.
        </p>
      </div>

      <div className="bg-green-50 rounded-lg p-6 text-left">
        <h3 className="text-lg font-semibold text-green-800 mb-4">
          다음 단계 안내
        </h3>
        <ul className="space-y-3 text-green-700">
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-200 text-green-800 mr-2">
              1
            </span>
            <span>매칭 플래너가 추가 만남을 위한 일정 조율을 도와드립니다.</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-200 text-green-800 mr-2">
              2
            </span>
            <span>상호 동의 하에 연락처를 교환하실 수 있습니다.</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-200 text-green-800 mr-2">
              3
            </span>
            <span>교제 기간 동안 매칭 플래너의 지속적인 상담을 받으실 수 있습니다.</span>
          </li>
        </ul>
      </div>

      <div className="pt-4">
        <button
          onClick={handleComplete}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium"
        >
          대시보드로 이동
        </button>
      </div>

      <p className="text-sm text-gray-500">
        추가 문의사항이 있으시다면 ���제든 매칭 플래너에게 연락해주세요.
      </p>
    </div>
  );
} 