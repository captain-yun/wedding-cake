'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';
import CitySelector from '@/components/common/selectors/location/CitySelector';
import DistrictSelector from '@/components/common/selectors/location/DistrictSelector';

export default function LocationProfileSelector({ onComplete }) {
  const { formData, setFormData } = useSignupStore();
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setFormData({
      ...formData,
      location: {
        cityId: city.id,
        cityName: city.name,
        district: ''
      }
    });
  };

  // ... 나머지 구현
} 