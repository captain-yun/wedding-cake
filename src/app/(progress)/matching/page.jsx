'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth';

export default function MatchingPage() {
  const router = useRouter();
  const { completeStep, setCurrentStep } = useAuthStore();
  const [matchStatus, setMatchStatus] = useState('searching'); // searching, found, confirmed

  useEffect(() => {
    // 실제로는 서버와의 웹소켓 연결 등을 통해 매칭 상태를 실시간으로 받아야 함
    const timer = setTimeout(() => {
      setMatchStatus('found');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAcceptMatch = async () => {
    try {
      // 매칭 수락 로직
      completeStep(6);
      setCurrentStep(7);
      router.push('/matched');
    } catch (error) {
      console.error('Error:', error);
      alert('매칭 수락 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">매칭 진행</h2>
      
      {matchStatus === 'searching' && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">매칭 상대를 찾고 있습니다...</p>
        </div>
      )}

      {matchStatus === 'found' && (
        <div className="space-y-6">
          <div className="bg-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">매칭 상대가 나타났습니다!</h3>
            <div className="space-y-4">
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

          <div className="flex gap-4">
            <button
              onClick={() => setMatchStatus('searching')}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              다른 상대 찾기
            </button>
            <button
              onClick={handleAcceptMatch}
              className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              매칭 수락하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 