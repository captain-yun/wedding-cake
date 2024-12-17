'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useAuthStore from '@/store/auth';

export default function VerificationConfirmPage() {
  const router = useRouter();
  const { user, completeStep, setCurrentStep } = useAuthStore();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleVerification = async () => {
      // 이메일 인증 확인
      const { data: { user: updatedUser }, error } = await supabase.auth.getUser();

      if (updatedUser?.email_confirmed_at) {
        // 프로필 업데이트
        await supabase
          .from('profiles')
          .update({ verification_completed: true })
          .eq('id', user.id);

        // 상태 업데이트
        completeStep(4);
        setCurrentStep(5);
        router.push('/membership');
      }
    };

    handleVerification();
  }, []);

  return (
    <div className="text-center">
      <h2>인증 확인 중...</h2>
    </div>
  );
} 