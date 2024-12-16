'use client';

import useSignupStore from '@/store/signup';

const MBTI_TYPES = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

const MBTI_DESCRIPTIONS = {
  'ISTJ': '신중하고 성실한',
  'ISFJ': '따뜻하고 헌신적인',
  'INFJ': '이상적이고 통찰력있는',
  'INTJ': '논리적이고 전략적인',
  'ISTP': '분석적이고 적응력있는',
  'ISFP': '예술적이고 섬세한',
  'INFP': '이상주의적이고 창의적인',
  'INTP': '지적이고 혁신적인',
  'ESTP': '활동적이고 현실적인',
  'ESFP': '자유롭고 즐거운',
  'ENFP': '열정적이고 창의적인',
  'ENTP': '독창적이고 도전적인',
  'ESTJ': '체계적이고 실용적인',
  'ESFJ': '친절하고 배려심 많은',
  'ENFJ': '카리스마있고 영감을 주는',
  'ENTJ': '결단력있고 리더십있는'
};

export default function MBTISelector() {
  const { formData, setFormData } = useSignupStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        MBTI를 선택해주세요
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {MBTI_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setFormData({ mbti: type })}
            className={`p-4 text-center rounded-lg transition-all ${
              formData.mbti === type
                ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-500'
            }`}
          >
            <div className="font-medium">{type}</div>
            <div className="text-sm text-gray-500 mt-1">{MBTI_DESCRIPTIONS[type]}</div>
          </button>
        ))}
      </div>
    </div>
  );
} 