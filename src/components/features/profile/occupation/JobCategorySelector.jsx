'use client';

import { useState, useEffect } from 'react';
import useSignupStore from '@/store/signup';

const JOB_CATEGORIES = [
  {
    id: 'office',
    name: '사무/관리',
    subCategories: [
      '일반사무직', '경영/관리직', '인사/총무', '재무/회계', '마케팅/홍보',
      '기획/전략', '영업/판매', '무역/유통', '비서/안내'
    ]
  },
  {
    id: 'it',
    name: 'IT/인터넷',
    subCategories: [
      '개발자', '데이터분석가', 'IT기획자', '서버관리자', 'QA/테스터',
      '보안전문가', '웹디자이너', 'UI/UX디자이너', 'IT영업'
    ]
  },
  {
    id: 'professional',
    name: '전문직',
    subCategories: [
      '의사', '약사', '변호사', '회계사', '세무사', '법무사', '변리사',
      '교수', '연구원', '금융전문가'
    ]
  },
  {
    id: 'education',
    name: '교육',
    subCategories: [
      '초/중/고교사', '대학교수', '학원강사', '교육기획', '유치원교사',
      '특수교육', '교육컨설턴트', '학습지교사'
    ]
  },
  {
    id: 'medical',
    name: '의료/보건',
    subCategories: [
      '간호사', '의료기사', '의료행정', '약사', '한의사', '수의사',
      '물리치료사', '임상병리사', '방사선사'
    ]
  },
  {
    id: 'service',
    name: '서비스/고객지원',
    subCategories: [
      '고객상담', '매장관리', '호텔서비스', '여행서비스', '항공승무원',
      '외식업', '미용사', '피부관리사'
    ]
  },
  {
    id: 'finance',
    name: '금융/보험',
    subCategories: [
      '은행원', '증권사', '보험설계사', '투자상담사', '펀드매니저',
      '손해사정사', '금융사무', 'PB'
    ]
  },
  {
    id: 'media',
    name: '미디어/예술',
    subCategories: [
      '작가', '기자', 'PD', '영상편집자', '사진작가', '음악가',
      '디자이너', '방송인', '성우'
    ]
  },
  {
    id: 'construction',
    name: '건설/건축',
    subCategories: [
      '건축가', '건설현장관리', '토목기사', '설비기사', '전기기사',
      '인테리어디자이너', '부동산전문가'
    ]
  },
  {
    id: 'manufacturing',
    name: '제조/생산',
    subCategories: [
      '생산관리', '품질관리', '기계설계', '전기/전자', '화학/섬유',
      '자동차/조선', '반도체/디스플레이'
    ]
  },
  {
    id: 'public',
    name: '공공/행정',
    subCategories: [
      '공무원', '공기업', '군인', '경찰', '소방관', '교정직',
      '국제기구', '비영리단체'
    ]
  },
  {
    id: 'self_employed',
    name: '자영업/사업',
    subCategories: [
      '자영업자', '소상공인', '프리랜서', '창업자', '농업', '임업',
      '어업', '축산업'
    ]
  }
];

export default function JobCategorySelector({ onComplete }) {
  const { formData, setFormData } = useSignupStore();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (formData.occupation?.category) {
      const category = JOB_CATEGORIES.find(cat => cat.name === formData.occupation.category);
      if (category) {
        setSelectedCategory(category);
      }
    }
  }, [formData.occupation]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSubCategorySelect = (subCategory) => {
    const newOccupation = {
      occupation: {
        category: selectedCategory.name,
        detail: subCategory
      }
    };
    setFormData(newOccupation);
    onComplete();
  };

  return (
    <div className="space-y-6">
      {!selectedCategory ? (
        <>
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
            직종을 선택해주세요
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {JOB_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className={`p-4 text-center rounded-lg transition-all border
                  ${formData.occupation?.category === category.name
                    ? 'bg-purple-50 border-purple-500'
                    : 'bg-white border-gray-200 hover:border-purple-500'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              세부 직종을 선택해주세요
            </h2>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              직종 다시 선택
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {selectedCategory.subCategories.map((subCategory) => (
              <button
                key={subCategory}
                onClick={() => handleSubCategorySelect(subCategory)}
                className={`p-4 text-center rounded-lg transition-all border
                  ${formData.occupation?.detail === subCategory
                    ? 'bg-purple-50 border-purple-500'
                    : 'bg-white border-gray-200 hover:border-purple-500'
                  }`}
              >
                {subCategory}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 