'use client';

import { DISTRICTS } from './constants';

export default function DistrictSelector({
  cityId,
  selectedDistricts = [],
  onSelect,
  multiple = false,
  disabled = false,
  className = ''
}) {
  const districts = DISTRICTS[cityId] || [];

  const handleSelect = (district) => {
    if (multiple) {
      const newSelection = selectedDistricts.includes(district.id)
        ? selectedDistricts.filter(id => id !== district.id)
        : [...selectedDistricts, district.id];
      onSelect(newSelection);
    } else {
      onSelect([district.id]);
    }
  };

  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`}>
      {districts.map((district) => (
        <button
          key={district.id}
          type="button"
          disabled={disabled}
          onClick={() => handleSelect(district)}
          className={`p-2 text-sm text-center rounded-lg transition-all border ${
            selectedDistricts.includes(district.id)
              ? 'bg-purple-50 border-purple-500'
              : 'bg-white border-gray-200 hover:border-purple-500 disabled:opacity-50'
          }`}
        >
          {district.name}
        </button>
      ))}
    </div>
  );
} 