'use client';

import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth';

export default function MatchedPage() {
  const router = useRouter();
  const { completeStep, setCurrentStep } = useAuthStore();

  const handleMeetingComplete = () => {
    completeStep(7);
    setCurrentStep(8);
    router.push('/feedback');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">매칭 성사</h2>
      
      <div className="bg-green-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          축하합니다! 매칭이 성사되었습니다.
        </h3>
        <p className="text-green-600">
          매칭 플래너가 첫 만남을 위한 일정 조율을 도와드립니다.
        </p>
      </div>

      <div className="border rounded-lg p-6 space-y-4">
        <h4 className="font-semibold">매칭 상대 정보</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">이름</span>
            <p className="font-medium">김서연</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">나이</span>
            <p className="font-medium">32세</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">직업</span>
            <p className="font-medium">소프트웨어 엔지니어</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">지역</span>
            <p className="font-medium">서울시 강남구</p>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <h4 className="font-semibold mb-4">다음 단계</h4>
        <ol className="space-y-2 text-sm text-gray-600">
          <li>1. 매칭 플래너가 연락드릴 예정입니다.</li>
          <li>2. 상호 일정을 조율하여 첫 만남을 진행합니다.</li>
          <li>3. 만남 후 피드백을 남겨주세요.</li>
        </ol>
      </div>

      <button
        onClick={handleMeetingComplete}
        className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700"
      >
        만남 완료 및 피드백 작성하기
      </button>
    </div>
  );
} 