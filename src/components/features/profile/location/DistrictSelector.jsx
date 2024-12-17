'use client';

import useSignupStore from '@/store/signup';
import { DISTRICTS } from './districts';

export default function DistrictSelector({ cityId, cityName, onBack }) {
  const { formData, setFormData } = useSignupStore();
  const districts = DISTRICTS[cityId] || [];

  const handleDistrictSelect = (district) => {
    setFormData({
      location: {
        cityId,
        cityName,
        district
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {cityName} 내 지역을 선택해주세요
        </h2>
        <button
          onClick={onBack}
          className="text-sm text-purple-600 hover:text-purple-700"
        >
          도시 다시 선택
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
        {districts.map((district) => (
          <button
            key={district}
            type="button"
            onClick={() => handleDistrictSelect(district)}
            className={`p-4 text-center rounded-lg transition-all ${
              formData.location?.district === district
                ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-500'
            }`}
          >
            {district}
          </button>
        ))}
      </div>
    </>
  );
} 