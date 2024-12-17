'use client';

import { useEffect } from 'react';
import useAuthStore from '@/store/auth';

export default function ProcessStatus() {
  const { currentStep, stepStatus } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-purple-600 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / 8) * 100}%` }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {Object.entries(stepStatus).map(([step, { name, completed }]) => (
            <div 
              key={step}
              className={`flex flex-col items-center ${
                parseInt(step) === currentStep 
                  ? 'text-purple-600' 
                  : completed 
                    ? 'text-purple-600' 
                    : 'text-gray-400'
              }`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                  ${parseInt(step) === currentStep 
                    ? 'bg-purple-600 text-white' 
                    : completed 
                      ? 'bg-purple-100 text-purple-600' 
                      : 'bg-gray-200'
                  }`}
              >
                {completed ? '✓' : step}
              </div>
              <span className="text-xs text-center w-20">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 