'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth';

export default function CompanyVerification() {
  const [verifyMethod, setVerifyMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { user, completeStep, setCurrentStep } = useAuthStore();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const emailDomain = email.split('@')[1];

      // 기존 인증 정보 확인
      const { data: existingVerification } = await supabase
        .from('verification')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'COMPANY_EMAIL')
        .eq('email', email)
        .eq('status', 'PENDING')
        .single();

      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + parseInt(process.env.NEXT_PUBLIC_VERIFICATION_CODE_EXPIRE_MINUTES) * 60 * 1000);

      if (existingVerification) {
        // 기존 인증 정보 업데이트
        const { error: updateError } = await supabase
          .from('verification')
          .update({
            verification_code: verificationCode,
            expires_at: expiresAt.toISOString(),
            attempts: 0,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .eq('type', 'COMPANY_EMAIL')
          .eq('email', email)
          .eq('status', 'PENDING');

        if (updateError) throw updateError;
      } else {
        // 새로운 인증 정보 생성
        const { error: insertError } = await supabase
          .from('verification')
          .insert({
            user_id: user.id,
            type: 'COMPANY_EMAIL',
            email: email,
            status: 'PENDING',
            verification_code: verificationCode,
            expires_at: expiresAt.toISOString(),
            attempts: 0
          });

        if (insertError) throw insertError;
      }

      // 이메일 발송 API 호출
      const response = await fetch('/api/send-verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          code: verificationCode
        })
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '이메일 발송에 실패했습니다.');
      }
  
      setShowOtpInput(true);
      alert('인증번호가 이메일로 발송되었습니다.');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      // DB에서 인증 정보 확인
      const { data, error } = await supabase
        .from('verification')
        .select('verification_code, expires_at, attempts')
        .eq('user_id', user.id)
        .eq('type', 'COMPANY_EMAIL')
        .eq('status', 'PENDING')
        .single();
  
      if (error) throw error;
      if (!data) throw new Error('인증 정보를 찾을 수 없습니다.');
  
      // 만료 시간 확인
      if (new Date(data.expires_at) < new Date()) {
        throw new Error('인증 코드가 만료되었습니다. 다시 요청해주세요.');
      }
  
      // 시도 횟수 확인 (5회 제한)
      if (data.attempts >= 5) {
        throw new Error('인증 시도 횟수를 초과했습니다. 다시 요청해주세요.');
      }
  
      // 시도 횟수 증가
      await supabase
        .from('verification')
        .update({ attempts: data.attempts + 1 })
        .eq('user_id', user.id)
        .eq('type', 'COMPANY_EMAIL')
        .eq('status', 'PENDING');
  
      // 인증 코드 확인
      if (data.verification_code !== otp) {
        throw new Error('인증번호가 일치하지 않습니다.');
      }
  
      // 인증 성공 시 상태 업데이트
      const { error: updateError } = await supabase
        .from('verification')
        .update({ 
          status: 'APPROVED',
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('type', 'COMPANY_EMAIL');
  
      if (updateError) throw updateError;
  
      alert('이메일 인증이 완료되었습니다.');
      completeStep(4);
      setCurrentStep(5);
      router.push('/membership');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!file) throw new Error('파일을 선택해주세요.');

      // 파일 업로드
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('verifications')
        .upload(`company/${fileName}`, file);

      if (uploadError) throw uploadError;

      // DB에 인증 정보 저장
      const { error: dbError } = await supabase.from('verifications').insert({
        user_id: user.id,
        type: 'company_card',
        file_path: `company/${fileName}`,
        status: 'pending'
      });

      if (dbError) throw dbError;

      alert('인증 서류가 제출되었습니다. 검토 후 승인될 예정입니다.');
      router.push('/verification/status');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
        <button
          onClick={() => setVerifyMethod('email')}
          className={`flex-1 p-4 rounded-lg transition-all ${
            verifyMethod === 'email' 
              ? 'bg-white shadow-md border-purple-500 border-2' 
              : 'bg-transparent border-2 border-gray-200'
          }`}
        >
          <h4 className="font-medium mb-2">회사 이메일로 인증</h4>
          <p className="text-sm text-gray-500">회사 도메인 이메일로 인증</p>
        </button>
        <button
          onClick={() => setVerifyMethod('card')}
          className={`flex-1 p-4 rounded-lg transition-all ${
            verifyMethod === 'card' 
              ? 'bg-white shadow-md border-purple-500 border-2' 
              : 'bg-transparent border-2 border-gray-200'
          }`}
        >
          <h4 className="font-medium mb-2">사원증/명함으로 인증</h4>
          <p className="text-sm text-gray-500">증빙 서류 제출로 인증</p>
        </button>
      </div>

      {verifyMethod === 'email' ? (
        <div className="space-y-6">
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">회사 이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="회사 이메일 주소를 입력하세요"
                required
                disabled={showOtpInput}
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
            {!showOtpInput && (
              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '처리중...' : '인증번호 받기'}
              </button>
            )}
          </form>

          {showOtpInput && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">인증번호</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="이메일로 받은 6자리 인증번호를 입력하세요"
                  maxLength={6}
                  pattern="\d{6}"
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  * 인증번호가 오지 않았다면 스팸메일함을 확인해주세요
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowOtpInput(false);
                    setOtp('');
                  }}
                  className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  이메일 다시 입력
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !otp || otp.length !== 6}
                  className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '확인중...' : '인증 확인'}
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <form onSubmit={handleFileUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              사원증 또는 명함 이미지
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              * 개인정보는 가린 후 업로드해주세요
            </p>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading || !file}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '업로드중...' : '인증 서류 제출'}
          </button>
        </form>
      )}
    </div>
  );
} 