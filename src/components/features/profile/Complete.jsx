'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Complete() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  const handleContinue = () => {
    router.push('/dashboard'); // 메인 대시보드로 이동
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          프로필 등록이 완료되었습니다!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          이제 매칭 플래너가 검토 후 연락드릴 예정입니다.<br />
          영업일 기준 1-2일 정도 소요될 수 있습니다.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">다음 단계</h3>
        <ul className="space-y-4 text-left">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>매칭 플래너의 프로필 검토</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>초기 상담 일정 조율</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>맞춤 매칭 시작</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={handleContinue}
          className="w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          대시보드로 이동
        </button>
        <p className="text-sm text-gray-500">
          문의사항이 있으시다면 언제든 연락주세요
        </p>
      </div>
    </div>
  );
} 