'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useAuthStore from '@/store/auth';

export default function ProgressLayout({ children }) {
const router = useRouter();
const pathname = usePathname();
const { user, initialize } = useAuthStore();
const [isLoading, setIsLoading] = useState(true);  // 로딩 상태 추가

useEffect(() => {
    const init = async () => {
        await initialize();
        setIsLoading(false);
    };
    init();
}, [initialize]);

useEffect(() => {
    if (!isLoading && !user && pathname !== '/login') {
        router.push('/login');
        return;
    }
    }, [user, pathname, isLoading]);
    
    if (isLoading) {
        return <div>Loading...</div>;  // 또는 로딩 스피너
    }
    
    return (
        <div className="max-w-2xl mx-auto pt-12 pb-12 px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
            {children}
        </div>
        </div>
        );
    }