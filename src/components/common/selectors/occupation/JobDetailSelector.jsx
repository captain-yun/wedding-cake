'use client';

import { JOB_CATEGORIES } from './constants';

export default function JobDetailSelector({
  categoryId,
  selectedJobs = [],
  onSelect,
  multiple = false,
  disabled = false,
  className = ''
}) {
  const category = JOB_CATEGORIES.find(cat => cat.id === categoryId);
  const jobs = category?.jobs || [];

  const handleSelect = (job) => {
    if (multiple) {
      const newSelection = selectedJobs.includes(job.id)
        ? selectedJobs.filter(id => id !== job.id)
        : [...selectedJobs, job.id];
      onSelect(newSelection);
    } else {
      onSelect([job.id]);
    }
  };

  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      {jobs.map((job) => (
        <button
          key={job.id}
          type="button"
          disabled={disabled}
          onClick={() => handleSelect(job)}
          className={`p-3 text-center rounded-lg transition-all border ${
            selectedJobs.includes(job.id)
              ? 'bg-purple-50 border-purple-500'
              : 'bg-white border-gray-200 hover:border-purple-500 disabled:opacity-50'
          }`}
        >
          {job.name}
        </button>
      ))}
    </div>
  );
} 