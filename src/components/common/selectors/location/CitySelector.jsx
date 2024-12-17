'use client';

import { CITIES } from './constants';

export default function CitySelector({ 
  selectedCity, 
  onSelect,
  disabled = false,
  className = ''
}) {
  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`}>
      {CITIES.map((city) => (
        <button
          key={city.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(city)}
          className={`p-3 text-center rounded-lg transition-all border ${
            selectedCity?.id === city.id
              ? 'bg-purple-50 border-purple-500'
              : 'bg-white border-gray-200 hover:border-purple-500 disabled:opacity-50'
          }`}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
} 