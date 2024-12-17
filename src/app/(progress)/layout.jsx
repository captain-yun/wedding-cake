'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useAuthStore from '@/store/auth';

export default function ProgressLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, initialize, currentStep } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!user && pathname !== '/login') {
      router.push('/login');
      return;
    }

    // status 페이지는 항상 접근 가능
    if (pathname === '/status') return;

    // 현재 단계보다 높은 단계의 페이지 접근 시 현재 단계로 리다이렉트
    const stepPaths = {
      '/signup': 1,
      '/profile': 2,
      '/ideal-type': 3,
      '/verification': 4,
      '/membership': 5
    };

    const pageStep = stepPaths[pathname];
    if (pageStep && pageStep > currentStep) {
      const currentPath = Object.entries(stepPaths).find(([_, step]) => step === currentStep)?.[0];
      if (currentPath) {
        router.push(currentPath);
      }
    }
  }, [user, pathname, currentStep]);

  return (
    <div className="max-w-2xl mx-auto pt-12 pb-12 px-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {children}
      </div>
    </div>
  );
} 