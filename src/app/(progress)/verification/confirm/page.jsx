'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useAuthStore from '@/store/auth';

export default function VerificationConfirmPage() {
  const router = useRouter();
  const { user, completeStep, setCurrentStep } = useAuthStore();
  const supabase = createClientComponentClient();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 인증 코드 확인
      const { error } = await supabase.auth.verifyOtp({ email: user.email, token: code });

      if (error) throw error;

      // 프로필 업데이트
      await supabase
        .from('profiles')
        .update({ verification_completed: true })
        .eq('id', user.id);

      // 상태 업데이트
      completeStep(4);
      setCurrentStep(5);
      router.push('/membership');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h2>인증 코드 입력</h2>
      <form onSubmit={handleCodeSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            인증 코드
          </label>
          <input 
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1 block w-full"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading || !code}
          className="w-full py-2 bg-purple-600 text-white rounded-lg"
        >
          {isLoading ? '제출 중...' : '인증 완료'}
        </button>
      </form>
    </div>
  );
} 