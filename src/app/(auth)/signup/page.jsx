'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    birthdate: '',
    gender: '',
  });

  useEffect(() => {
    // 카카오 SDK 초기화
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID);
      }
    }
  }, []);

  const handleKakaoLogin = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      
      kakao.Auth.login({
        success: function(authObj) {
          // 로그인 성공시 사용자 정보 요청
          kakao.API.request({
            url: '/v2/user/me',
            success: function(response) {
              const kakaoAccount = response.kakao_account;
              
              // 사용자 정보를 서버에 전송하거나 상태 관리
              const userData = {
                email: kakaoAccount.email,
                name: kakaoAccount.profile.nickname,
                profileImage: kakaoAccount.profile.profile_image_url,
                provider: 'kakao',
                providerId: response.id.toString()
              };

              // 여기서 회원가입 또는 로그인 처리
              console.log('카카오 로그인 성공:', userData);
              router.push('/onboarding');
            },
            fail: function(error) {
              console.error('카카오 사용자 정보 요청 실패:', error);
            }
          });
        },
        fail: function(error) {
          console.error('카카오 로그인 실패:', error);
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 회원가입 로직 구현
    try {
      // API 호출 등의 회원가입 처리
      router.push('/onboarding');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <button
                onClick={handleKakaoLogin}
                className="w-full flex items-center justify-center px-4 py-2 border border-yellow-400 shadow-sm text-sm font-medium rounded-md text-yellow-800 bg-yellow-50 hover:bg-yellow-100"
              >
                <img 
                  src="/kakao-logo.png" 
                  alt="Kakao" 
                  className="w-5 h-5 mr-2"
                />
                카카오로 시작하기
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              이메일로 회원가입
            </button>
          </div>
        );

      case 2:
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              가입하기
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          회원가입
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
            로그인하기
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {renderStep()}
        </div>
      </div>
    </div>
  );
} 