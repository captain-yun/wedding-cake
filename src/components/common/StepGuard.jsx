'use client';

import { useEffect, useState } from 'react';
import useAuthStore from '@/store/auth';

export default function StepGuard({ requiredStep, children }) {
  const { currentStep } = useAuthStore();
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    setCanAccess(currentStep >= requiredStep);
  }, [currentStep, requiredStep]);

  if (!canAccess) {
    return (
      <div className="p-4 bg-yellow-50 rounded-lg">
        <p className="text-yellow-800">
          이전 단계를 먼저 완료해주세요.
        </p>
      </div>
    );
  }

  return children;
} 