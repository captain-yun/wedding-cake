'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth';

export default function ProgressLayout({ children }) {
  const router = useRouter();
  const { user, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!user && window.location.pathname !== '/login') {
      router.push('/login');
    }
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto pt-12 pb-12 px-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {children}
      </div>
    </div>
  );
} 