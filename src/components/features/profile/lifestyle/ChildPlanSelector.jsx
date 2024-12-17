'use client';

import useSignupStore from '@/store/signup';

const CHILD_PLAN_OPTIONS = [
  { 
    id: 'want', 
    label: '원해요', 
    description: '아이를 갖고 싶어요' 
  },
  { 
    id: 'maybe', 
    label: '고민중', 
    description: '상황에 따라 생각해볼게요' 
  },
  { 
    id: 'dont_want', 
    label: '원하지 않아요', 
    description: '아이 계획이 없어요' 
  },
  { 
    id: 'not_sure', 
    label: '미정', 
    description: '아직 결정하지 못했어요' 
  }
];

export default function ChildPlanSelector() {
  const { formData, setFormData } = useSignupStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        향후 자녀 계획은 어떠신가요?
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {CHILD_PLAN_OPTIONS.map(({ id, label, description }) => (
          <button
            key={id}
            onClick={() => setFormData({ childPlan: id })}
            className={`p-4 text-center rounded-lg transition-all ${
              formData.childPlan === id
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