'use client';

import { useState } from 'react';
import CitySelector from './location/CitySelector';
import DistrictSelector from './location/DistrictSelector';

export default function LocationSelector() {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = (cityId, cityName) => {
    setSelectedCity({ id: cityId, name: cityName });
  };

  const handleBack = () => {
    setSelectedCity(null);
  };

  return (
    <div className="space-y-6">
      {!selectedCity ? (
        <CitySelector onCitySelect={handleCitySelect} />
      ) : (
        <DistrictSelector
          cityId={selectedCity.id}
          cityName={selectedCity.name}
          onBack={handleBack}
        />
      )}
    </div>
  );
} 