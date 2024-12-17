'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth';
import ProcessStatus from '@/components/common/ProcessStatus';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export default function ProgressStatusPage() {
  const { user, stepStatus, currentStep } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Object.values(stepStatus).some(step => step.completed)) {
      setIsLoading(false);
    }
  }, [stepStatus]);

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">진행 상태를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const handleStepClick = (step) => {
    if (parseInt(step) <= currentStep) {
      router.push(getPathForStep(parseInt(step)));
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">매칭 진행 현황</h2>
        <p className="text-gray-600 mt-2">
          현재 진행 단계: {stepStatus[currentStep]?.name}
        </p>
      </div>
      
      <ProcessStatus />
      
      <div className="space-y-4 mt-8">
        {Object.entries(stepStatus).map(([step, { name, completed }]) => (
          <div 
            key={step}
            className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors
              ${parseInt(step) <= currentStep ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}
              ${completed ? 'border-green-200 bg-green-50' : 
                parseInt(step) === currentStep ? 'border-purple-200 bg-purple-50' : ''}
            `}
            onClick={() => handleStepClick(step)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${completed ? 'bg-green-100 text-green-600' : 
                    parseInt(step) === currentStep ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-100 text-gray-400'}
                `}>
                  {completed ? <CheckCircle2 className="w-5 h-5" /> : 
                   parseInt(step) === currentStep ? <Clock className="w-5 h-5" /> : step}
                </div>
                <div>
                  <h3 className={`font-medium ${
                    completed ? 'text-green-600' :
                    parseInt(step) === currentStep ? 'text-purple-600' :
                    'text-gray-400'
                  }`}>
                    {name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {completed ? '완료됨' : 
                     parseInt(step) === currentStep ? '진행 중' : '대기 중'}
                  </p>
                </div>
              </div>
              {parseInt(step) <= currentStep && (
                <ArrowRight className={`w-5 h-5 ${
                  completed ? 'text-green-500' :
                  parseInt(step) === currentStep ? 'text-purple-500' :
                  'text-gray-400'
                }`} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getPathForStep(step) {
  const paths = {
    1: '/signup',
    2: '/profile',
    3: '/ideal-type',
    4: '/verification',
    5: '/membership',
    6: '/matching',
    7: '/matched',
    8: '/feedback',
    9: '/success'
  };
  return paths[step] || '/';
} 