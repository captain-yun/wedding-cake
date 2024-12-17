'use client';

import useSignupStore from '@/store/signup';

const MAJOR_CITIES = [
  { id: 'seoul', name: '서울' },
  { id: 'gyeonggi', name: '경기' },
  { id: 'incheon', name: '인천' },
  { id: 'busan', name: '부산' },
  { id: 'daegu', name: '대구' },
  { id: 'gwangju', name: '광주' },
  { id: 'daejeon', name: '대전' },
  { id: 'ulsan', name: '울산' },
  { id: 'sejong', name: '세종' },
  { id: 'gangwon', name: '강원' },
  { id: 'chungbuk', name: '충북' },
  { id: 'chungnam', name: '충남' },
  { id: 'jeonbuk', name: '전북' },
  { id: 'jeonnam', name: '전남' },
  { id: 'gyeongbuk', name: '경북' },
  { id: 'gyeongnam', name: '경남' },
  { id: 'jeju', name: '제주' }
];

export default function CitySelector({ onCitySelect }) {
  const { formData } = useSignupStore();

  return (
    <>
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        거주하시는 도시를 선택해주세요
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {MAJOR_CITIES.map(({ id, name }) => (
          <button
            key={id}
            type="button"
            onClick={() => onCitySelect(id, name)}
            className={`p-4 text-center rounded-lg transition-all ${
              formData.location?.cityId === id
                ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-500'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </>
  );
} 