'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';
import CitySelector from '@/components/common/selectors/location/CitySelector';
import DistrictSelector from '@/components/common/selectors/location/DistrictSelector';
import { CITIES, DISTRICTS } from '@/components/common/selectors/location/constants';

export default function LocationPreferenceSelector({ onComplete }) {
  const { idealTypeData, setIdealTypeData } = useSignupStore();
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState(idealTypeData.locations || []);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleDistrictsSelect = (districts) => {
    const locationKeys = districts.map(districtId => `${selectedCity.id}_${districtId}`);
    setSelectedLocations(prev => {
      const otherLocations = prev.filter(loc => !loc.startsWith(selectedCity.id));
      return [...otherLocations, ...locationKeys];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedLocations.length > 0) {
      setIdealTypeData({
        ...idealTypeData,
        locations: selectedLocations
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        선호하는 지역을 선택해주세요
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        복수 선택 가능합니다
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 시/도 선택 */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">시/도 선택</h3>
          <CitySelector
            selectedCity={selectedCity}
            onSelect={handleCitySelect}
          />
        </div>

        {/* 구/군 선택 */}
        {selectedCity && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {selectedCity.name}의 구/군 선택
            </h3>
            <DistrictSelector
              cityId={selectedCity.id}
              selectedDistricts={selectedLocations
                .filter(loc => loc.startsWith(selectedCity.id))
                .map(loc => loc.split('_')[1])
              }
              onSelect={handleDistrictsSelect}
              multiple={true}
            />
          </div>
        )}

        {/* 선택된 지역 표시 */}
        {selectedLocations.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">선택된 지역</h4>
            <div className="flex flex-wrap gap-2">
              {selectedLocations.map(locationKey => {
                const [cityId, districtId] = locationKey.split('_');
                const city = CITIES.find(c => c.id === cityId);
                const district = DISTRICTS[cityId]?.find(d => d.id === districtId);
                return (
                  <span
                    key={locationKey}
                    className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                  >
                    {city?.name} {district?.name}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={selectedLocations.length === 0}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </form>
    </div>
  );
} 