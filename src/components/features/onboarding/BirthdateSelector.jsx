'use client';

import { useState, useEffect, useRef } from 'react';
import useSignupStore from '@/store/signup';

export default function BirthdateSelector() {
  const { formData, setBirthdate } = useSignupStore();
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollOffset, setScrollOffset] = useState({ year: 0, month: 0, day: 0 });
  const itemHeight = 40;
  const visibleItems = 5; // 보이는 항목 수 증가

  useEffect(() => {
    if (!formData.birthdate.year) {
      setBirthdate('year', '1990');
      setBirthdate('month', '1');
      setBirthdate('day', '1');
    }
  }, []);

  const years = Array.from({ length: 35 }, (_, i) => 1970 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from(
    { length: new Date(formData.birthdate.year, formData.birthdate.month, 0).getDate() },
    (_, i) => i + 1
  );

  // 모바일 터치 이벤트 핸들러
  const handleTouchStart = (e, type) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e, type, values) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientY, type, values);
  };

  // PC 마우스 이벤트 핸들러
  const handleMouseDown = (e, type) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e, type, values) => {
    if (!isDragging) return;
    handleMove(e.clientY, type, values);
  };

  const handleMove = (clientY, type, values) => {
    const deltaY = clientY - startY;
    const newOffset = scrollOffset[type] + deltaY;
    
    setScrollOffset(prev => ({
      ...prev,
      [type]: newOffset
    }));

    const index = Math.round((-newOffset) / itemHeight) % values.length;
    const actualIndex = (index + values.length) % values.length;
    setBirthdate(type, values[actualIndex].toString());
    
    setStartY(clientY);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // 마우스 휠 이벤트 핸들러
  const handleWheel = (e, type, values) => {
    e.preventDefault();
    const currentValue = parseInt(formData.birthdate[type]);
    const currentIndex = values.indexOf(currentValue);
    
    const newIndex = e.deltaY > 0 
      ? (currentIndex + 1) % values.length
      : (currentIndex - 1 + values.length) % values.length;
    
    setBirthdate(type, values[newIndex].toString());
  };

  const renderSelector = (type, values) => {
    const currentValue = parseInt(formData.birthdate[type]);
    const offset = scrollOffset[type];

    return (
      <div 
        className="relative h-[200px] overflow-hidden bg-gray-50 rounded-lg"
        onWheel={(e) => handleWheel(e, type, values)}
      >
        <div 
          className="absolute inset-0 flex flex-col items-center py-[80px]"
          onTouchStart={(e) => handleTouchStart(e, type)}
          onTouchMove={(e) => handleTouchMove(e, type, values)}
          onTouchEnd={handleEnd}
          onMouseDown={(e) => handleMouseDown(e, type)}
          onMouseMove={(e) => handleMouseMove(e, type, values)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
        >
          <div 
            className="transition-transform"
            style={{ 
              transform: `translateY(${offset}px)`,
              touchAction: 'none'
            }}
          >
            {[...values, ...values, ...values].map((value, index) => (
              <div
                key={`${value}-${index}`}
                className={`h-[40px] flex items-center justify-center text-lg transition-all ${
                  value === currentValue
                    ? 'text-purple-600 font-bold scale-110'
                    : 'text-gray-400'
                }`}
              >
                {value}{type === 'year' ? '년' : type === 'month' ? '월' : '일'}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0 top-1/2 -mt-[20px] h-[40px] pointer-events-none bg-purple-50/50" />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        생년월일을 선택해주세요
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {renderSelector('year', years)}
        {renderSelector('month', months)}
        {renderSelector('day', days)}
      </div>
    </div>
  );
} 