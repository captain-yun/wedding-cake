'use client';

import { useState } from 'react';
import useSignupStore from '@/store/signup';

const HOBBY_CATEGORIES = [
  {
    id: 'sports',
    label: '운동/스포츠',
    options: [
      { id: 'running', label: '러닝/조깅' },
      { id: 'yoga', label: '요가/필라테스' },
      { id: 'gym', label: '헬스/웨이트' },
      { id: 'swimming', label: '수영' },
      { id: 'golf', label: '골프' },
      { id: 'climbing', label: '클라이밍' }
    ]
  },
  {
    id: 'culture',
    label: '문화/예술',
    options: [
      { id: 'movie', label: '영화 감상' },
      { id: 'music', label: '음악 감상' },
      { id: 'concert', label: '공연 관람' },
      { id: 'exhibition', label: '전시회' },
      { id: 'reading', label: '독서' },
      { id: 'writing', label: '글쓰기' }
    ]
  },
  {
    id: 'outdoor',
    label: '아웃도어',
    options: [
      { id: 'hiking', label: '등산/트레킹' },
      { id: 'camping', label: '캠핑' },
      { id: 'travel', label: '여행' },
      { id: 'photography', label: '사진 촬영' },
      { id: 'cycling', label: '자전거' }
    ]
  },
  {
    id: 'creative',
    label: '창작/취미',
    options: [
      { id: 'cooking', label: '요리/베이킹' },
      { id: 'drawing', label: '그림/드로잉' },
      { id: 'crafts', label: '공예/만들기' },
      { id: 'gardening', label: '식물 가꾸기' },
      { id: 'collecting', label: '수집' }
    ]
  }
];

export default function HobbyPreferenceSelector({ onComplete }) {
  const { idealTypeData, setIdealTypeData } = useSignupStore();
  const [selectedHobbies, setSelectedHobbies] = useState(idealTypeData.hobbies || []);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleHobbyToggle = (hobbyId) => {
    setSelectedHobbies(prev => {
      if (prev.includes(hobbyId)) {
        return prev.filter(id => id !== hobbyId);
      }
      if (prev.length >= 5) {
        return prev;
      }
      return [...prev, hobbyId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedHobbies.length > 0) {
      setIdealTypeData({
        ...idealTypeData,
        hobbies: selectedHobbies
      });
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        선호하는 취미를 선택해주세요
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        최대 5개까지 선택 가능합니다
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 카테고리 선택 */}
        <div className="grid grid-cols-2 gap-2">
          {HOBBY_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`p-3 text-center rounded-lg transition-all border ${
                selectedCategory?.id === category.id
                  ? 'bg-purple-50 border-purple-500'
                  : 'bg-white border-gray-200 hover:border-purple-500'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* 선택된 카테고리의 취미들 */}
        {selectedCategory && (
          <div className="mt-4">
            <h3 className="font-medium text-gray-900 mb-3">{selectedCategory.label}</h3>
            <div className="grid grid-cols-2 gap-2">
              {selectedCategory.options.map((hobby) => (
                <button
                  key={hobby.id}
                  type="button"
                  onClick={() => handleHobbyToggle(hobby.id)}
                  disabled={!selectedHobbies.includes(hobby.id) && selectedHobbies.length >= 5}
                  className={`p-3 text-center rounded-lg transition-all border ${
                    selectedHobbies.includes(hobby.id)
                      ? 'bg-purple-50 border-purple-500'
                      : 'bg-white border-gray-200 hover:border-purple-500 disabled:opacity-50 disabled:hover:border-gray-200'
                  }`}
                >
                  {hobby.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 선택된 취미 표시 */}
        {selectedHobbies.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">선택된 취미</h4>
            <div className="flex flex-wrap gap-2">
              {selectedHobbies.map(hobbyId => {
                const hobby = HOBBY_CATEGORIES
                  .flatMap(cat => cat.options)
                  .find(h => h.id === hobbyId);
                return (
                  <span
                    key={hobbyId}
                    className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                  >
                    {hobby?.label}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={selectedHobbies.length === 0}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </form>
    </div>
  );
} 