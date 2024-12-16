'use client';

import useSignupStore from '@/store/signup';

const HOBBY_OPTIONS = [
  { id: 'sports', label: '운동/스포츠', icon: '🏃' },
  { id: 'travel', label: '여행', icon: '✈️' },
  { id: 'music', label: '음악감상', icon: '🎵' },
  { id: 'movie', label: '영화/드라마', icon: '🎬' },
  { id: 'reading', label: '독서', icon: '📚' },
  { id: 'cooking', label: '요리', icon: '👨‍🍳' },
  { id: 'art', label: '미술/공예', icon: '🎨' },
  { id: 'game', label: '게임', icon: '🎮' },
  { id: 'photo', label: '사진촬영', icon: '📸' },
  { id: 'dance', label: '댄스', icon: '💃' },
  { id: 'hiking', label: '등산', icon: '⛰️' },
  { id: 'camping', label: '캠핑', icon: '⛺' },
  { id: 'pet', label: '반려동물', icon: '🐾' },
  { id: 'coffee', label: '카페탐방', icon: '☕' },
  { id: 'wine', label: '와인', icon: '🍷' },
  { id: 'fashion', label: '패션', icon: '👗' }
];

export default function HobbySelector() {
  const { formData, setFormData } = useSignupStore();
  const selectedHobbies = formData.hobbies || [];

  const toggleHobby = (hobbyId) => {
    const newHobbies = selectedHobbies.includes(hobbyId)
      ? selectedHobbies.filter(id => id !== hobbyId)
      : [...selectedHobbies, hobbyId];
    
    setFormData({ hobbies: newHobbies });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-gray-900">
          취미를 선택해주세요
        </h2>
        <p className="text-sm text-gray-500">
          최대 5개까지 선택할 수 있어요
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {HOBBY_OPTIONS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => {
              if (selectedHobbies.length < 5 || selectedHobbies.includes(id)) {
                toggleHobby(id);
              }
            }}
            disabled={selectedHobbies.length >= 5 && !selectedHobbies.includes(id)}
            className={`p-4 text-center rounded-lg transition-all ${
              selectedHobbies.includes(id)
                ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-500 disabled:opacity-50'
            }`}
          >
            <div className="text-2xl mb-1">{icon}</div>
            <div className="font-medium text-sm">{label}</div>
          </button>
        ))}
      </div>
    </div>
  );
} 