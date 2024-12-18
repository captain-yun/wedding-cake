'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useAuthStore from '@/store/auth';
import StepGuard from '@/components/common/StepGuard';
import { Briefcase, IdCard, Building2, Users } from 'lucide-react';
import CompanyVerification from '@/app/(progress)/verification/components/CompanyVerification';
import BusinessVerification from '@/app/(progress)/verification/components/BusinessVerification';
import FreelancerVerification from '@/app/(progress)/verification/components/FreelancerVerification';
import OtherVerification from '@/app/(progress)/verification/components/OtherVerification'; 

export default function VerificationPage() {
  const [method, setMethod] = useState('email');

  return (
    <StepGuard requiredStep={0}>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">본인 인증</h2>
          <p className="text-gray-600 mt-3">
            해당하는 인증 방법을 선택해주세요
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* 회사 인증 */}
          <button
            onClick={() => setMethod('company')}
            className={`flex flex-col items-center p-6 border-2 rounded-xl transition-all
              ${method === 'company' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
          >
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <Building2 className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">회사 인증</h3>
            <p className="text-sm text-gray-500 text-center">
              회사 이메일 또는<br />사원증/명함으로 인증
            </p>
          </button>

          {/* 사업자 인증 */}
          <button
            onClick={() => setMethod('business')}
            className={`flex flex-col items-center p-6 border-2 rounded-xl transition-all
              ${method === 'business' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
          >
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <Briefcase className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">사업자 인증</h3>
            <p className="text-sm text-gray-500 text-center">
              사업자등록증으로<br />인증
            </p>
          </button>

          {/* 프리랜서 인증 */}
          <button
            onClick={() => setMethod('freelancer')}
            className={`flex flex-col items-center p-6 border-2 rounded-xl transition-all
              ${method === 'freelancer' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
          >
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <IdCard className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">프리랜서 인증</h3>
            <p className="text-sm text-gray-500 text-center">
              계약서 또는<br />프리랜서 증빙서류로 인증
            </p>
          </button>

          {/* 기타 인증 */}
          <button
            onClick={() => setMethod('other')}
            className={`flex flex-col items-center p-6 border-2 rounded-xl transition-all
              ${method === 'other' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
          >
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">기타 인증</h3>
            <p className="text-sm text-gray-500 text-center">
              신분증 및<br />소득증빙 서류로 인증
            </p>
          </button>
        </div>

        {/* 선택된 인증 방식에 따른 컴포넌트 렌더링 */}
        <div className="mt-8">
          {method === 'company' && (
            <CompanyVerification />
          )}
          {method === 'business' && (
            <BusinessVerification />
          )}
          {method === 'freelancer' && (
            <FreelancerVerification />
          )}
          {method === 'other' && (
            <OtherVerification />
          )}
        </div>
      </div>
    </StepGuard>
  );
}

// 이메일 인증 컴포넌트
function EmailVerification() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 이메일 인증 요청
      const { error } = await supabase.auth.signInWithOtp({ email });

      if (error) throw error;

      alert('인증 이메일이 발송되었습니다. 이메일을 확인해주세요.');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 인증 코드 확인
      const { error } = await supabase.auth.verifyOtp({ email, token: code });

      if (error) throw error;

      alert('인증이 완료되었습니다.');
      // 추가적인 상태 업데이트나 리다이렉션을 여기에 추가할 수 있습니다.
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            이메일 주소
          </label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full py-2 bg-purple-600 text-white rounded-lg"
        >
          {isLoading ? '제출 중...' : '인증 요청'}
        </button>
      </form>

      <form onSubmit={handleCodeSubmit} className="space-y-4 mt-6">
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

// 휴대폰 인증 컴포넌트
function PhoneVerification() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 휴대폰 인증 요청
      const { error } = await supabase.auth.signInWithOtp({ phone });

      if (error) throw error;

      alert('인증 코드가 발송되었습니다. 휴대폰을 확인해주세요.');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 인증 코드 확인
      const { error } = await supabase.auth.verifyOtp({ phone, token: code });

      if (error) throw error;

      alert('인증이 완료되었습니다.');
      // 추가적인 상태 업데이트나 리다이렉션을 여기에 추가할 수 있습니다.
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handlePhoneSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            휴대폰 번호
          </label>
          <input 
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading || !phone}
          className="w-full py-2 bg-purple-600 text-white rounded-lg"
        >
          {isLoading ? '제출 중...' : '인증 요청'}
        </button>
      </form>

      <form onSubmit={handleCodeSubmit} className="space-y-4 mt-6">
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