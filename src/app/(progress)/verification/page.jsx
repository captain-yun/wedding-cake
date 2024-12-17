'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useAuthStore from '@/store/auth';

export default function VerificationPage() {
  const [method, setMethod] = useState('email'); // email 또는 card
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">본인 인증</h2>
        <p className="text-gray-600 mt-2">
          인증 방법을 선택해주세요
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setMethod('email')}
          className={`flex-1 p-4 border rounded-lg ${method === 'email' ? 'border-purple-500 bg-purple-50' : ''}`}
        >
          <h3 className="font-medium">회사 이메일 인증</h3>
          <p className="text-sm text-gray-500">회사 이메일로 인증</p>
        </button>

        <button
          onClick={() => setMethod('card')}
          className={`flex-1 p-4 border rounded-lg ${method === 'card' ? 'border-purple-500 bg-purple-50' : ''}`}
        >
          <h3 className="font-medium">사원증/명함 인증</h3>
          <p className="text-sm text-gray-500">사원증이나 명함 사진으로 인증</p>
        </button>
      </div>

      {method === 'email' ? (
        <EmailVerification />
      ) : (
        <CardVerification />
      )}
    </div>
  );
}

// 이메일 인증 컴포넌트
function EmailVerification() {
  // 기존 이메일 인증 로직
}

// 사원증/명함 인증 컴포넌트
function CardVerification() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. 이미지 업로드
      // 2. 관리자 검토 요청
      // 3. 검토 대기 상태로 변경
      
      alert('인증 요청이 접수되었습니다. 관리자 검토 후 승인될 예정입니다.');
    } catch (error) {
      alert('인증 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">
          사원증 또는 명함 사진
        </label>
        <input 
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mt-1 block w-full"
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          개인정보는 가린 후 업로드해주세요
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !file}
        className="w-full py-2 bg-purple-600 text-white rounded-lg"
      >
        {isLoading ? '제출 중...' : '인증 요청'}
      </button>
    </form>
  );
} 