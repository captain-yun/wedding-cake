'use client';

import { useState } from 'react';
import HeightInput from './physical/HeightInput';
import BodyTypeSelector from './physical/BodyTypeSelector';

export default function PhysicalInfoSelector() {
  const [step, setStep] = useState('height'); // 'height' | 'bodyType'

  return (
    <div>
      {step === 'height' ? (
        <HeightInput onComplete={() => setStep('bodyType')} />
      ) : (
        <BodyTypeSelector />
      )}
    </div>
  );
} 