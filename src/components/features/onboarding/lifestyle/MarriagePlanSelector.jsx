'use client';

import useSignupStore from '@/store/signup';

const MARRIAGE_PLAN_OPTIONS = [
  { 
    id: 'soon', 
    label: '곧 하고싶어요', 
    description: '2년 이내에 결혼을 계획하고 있어요' 
  },
  { 
    id: 'within_3_years', 
    label: '조금 더 준비후에', 
    description: '3-5년 이내에 생각하고 있어요' 
  },
  { 
    id: 'someday', 
    label: '언젠가는', 
    description: '지금은 구체적인 계획이 없어요' 
  },
  { 
    id: 'not_sure', 
    label: '아직 모르겠어요', 
    description: '결혼에 대해 아직 생각중이에요' 
  },
  { 
    id: 'no_plan', 
    label: '계획 없음', 
    description: '결혼 계획이 없어요' 
  }
];

export default function MarriagePlanSelector() {
  const { formData, setFormData } = useSignupStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        결혼 계획은 어떠신가요?
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {MARRIAGE_PLAN_OPTIONS.map(({ id, label, description }) => (
          <button
            key={id}
            onClick={() => setFormData({ marriagePlan: id })}
            className={`p-4 text-center rounded-lg transition-all ${
              formData.marriagePlan === id
                ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-500'
            }`}
          >
            <div className="font-medium">{label}</div>
            <div className="text-sm text-gray-500 mt-1">{description}</div>
          </button>
        ))}
      </div>
    </div>
  );
} 