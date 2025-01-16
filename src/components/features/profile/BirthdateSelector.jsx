'use client';

import { useEffect } from 'react';
import useSignupStore from '@/store/signup';

const YEARS = Array.from({ length: 50 }, (_, i) => 2005 - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function BirthdateSelector() {
  const { formData, setFormData } = useSignupStore();

  useEffect(() => {
    if (!formData.birthdate?.year) {
      setFormData({
        birthdate: {
          year: '1990',
          month: '1',
          day: '1'
        }
      });
    }
  }, []);

  const handleDateChange = (type, value) => {
    setFormData({
      birthdate: {
        ...formData.birthdate,
        [type]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        생년월일을 선택해주세요
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">년도</label>
          <select
            value={formData.birthdate?.year}
            onChange={(e) => handleDateChange('year', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          >
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">월</label>
          <select
            value={formData.birthdate?.month}
            onChange={(e) => handleDateChange('month', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          >
            {MONTHS.map((month) => (
              <option key={month} value={month}>
                {month}월
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">일</label>
          <select
            value={formData.birthdate?.day}
            onChange={(e) => handleDateChange('day', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          >
            {DAYS.map((day) => (
              <option key={day} value={day}>
                {day}일
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
} 