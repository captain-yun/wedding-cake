'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import OnboardingProgress from '@/components/onboarding/Progress';
import BasicInfo from '@/components/onboarding/BasicInfo';
import PhotoUpload from '@/components/onboarding/PhotoUpload';
import AboutMe from '@/components/onboarding/AboutMe';
import Preferences from '@/components/onboarding/Preferences';
import Complete from '@/components/onboarding/Complete';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      
      // Get current onboarding step from database
      const { data: profile } = await supabase
        .from('users')
        .select('onboardingStep')
        .eq('id', user.id)
        .single();
        
      if (profile) {
        setStep(profile.onboardingStep);
      }
    };

    getUser();
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfo onComplete={() => setStep(2)} />;
      case 2:
        return <PhotoUpload onComplete={() => setStep(3)} />;
      case 3:
        return <AboutMe onComplete={() => setStep(4)} />;
      case 4:
        return <Preferences onComplete={() => setStep(5)} />;
      case 5:
        return <Complete />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <OnboardingProgress currentStep={step} />
      <div className="max-w-3xl mx-auto py-12 px-4">
        {renderStep()}
      </div>
    </div>
  );
} 