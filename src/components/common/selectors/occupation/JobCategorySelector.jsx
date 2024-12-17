'use client';

import { JOB_CATEGORIES } from './constants';

export default function JobCategorySelector({
  selectedCategory,
  onSelect,
  disabled = false,
  className = ''
}) {
  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      {JOB_CATEGORIES.map((category) => (
        <button
          key={category.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(category)}
          className={`p-3 text-center rounded-lg transition-all border ${
            selectedCategory?.id === category.id
              ? 'bg-purple-50 border-purple-500'
              : 'bg-white border-gray-200 hover:border-purple-500 disabled:opacity-50'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
} 