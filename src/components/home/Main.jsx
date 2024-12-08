'use client';

import React, { useState } from 'react';
import { Heart, Shield, MessageCircle, Award, Check, Users, Calendar } from 'lucide-react';

const MarriageConsultingWebsite = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    gender: '',
    agreement: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone,
          gender: formData.gender,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      // 성공 메시지 표시
      alert('상담 신청이 완료되었습니다. 곧 연락드리겠습니다.');
      
      // 폼 초기화
      setShowPopup(false);
      setFormData({ phone: '', gender: '', agreement: false });
    } catch (error) {
      console.error('Submit error:', error);
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">프리미엄 매칭 서비스</h1>
            <p className="text-xl text-gray-600 mb-8">신뢰할 수 있는 전문 매칭 플래너와 함께하는 맞춤형 만남</p>
            <button 
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700"
              onClick={() => setShowPopup(true)}
            >
              무료 상담 신청
            </button>
          </div>
        </div>
      </section>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">무료 상담 신청</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">연락처</label>
                <input
                  type="tel"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">성별</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  required
                >
                  <option value="">선택해주세요</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.agreement}
                    onChange={(e) => setFormData({...formData, agreement: e.target.checked})}
                    required
                  />
                  <span className="text-sm text-gray-600">
                    개인정보 수집 및 이용에 동의합니다.
                    <button
                      type="button"
                      className="text-purple-600 underline ml-1"
                      onClick={() => alert('1. 수집하는 개인정보 항목: 연락처, 성별\n2. 수집 목적: 결혼 상담 서비스 제공\n3. 보유 기간: 상담 종료 후 1년\n4. 동의를 거부할 수 있으며, 이 경우 상담 신청이 제한됩니다.')}
                    >
                      자세히 보기
                    </button>
                  </span>
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  신청하기
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                  onClick={() => setShowPopup(false)}
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">철저한 개인정보 보호</h3>
              <p className="text-gray-600">신뢰성 있는 회원 관리와 보안 시스템</p>
            </div>
            <div className="text-center p-6">
              <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">1:1 전문 상담</h3>
              <p className="text-gray-600">경험 많은 매칭 플래너의 맞춤형 서비스</p>
            </div>
            <div className="text-center p-6">
              <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">프리미엄 매칭</h3>
              <p className="text-gray-600">검증된 회원들과의 소수정예 만남</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">매칭 프로세스</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-full p-2 mr-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <span className="font-semibold">1. 상담 신청</span>
              </div>
              <p className="text-gray-600">카카오톡으로 편리한 상담 예약</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-full p-2 mr-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <span className="font-semibold">2. 1:1 상담</span>
              </div>
              <p className="text-gray-600">전문 플래너와의 심층 상담</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-full p-2 mr-4">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <span className="font-semibold">3. 매칭 진행</span>
              </div>
              <p className="text-gray-600">맞춤형 프로필 추천</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-full p-2 mr-4">
                  <Check className="w-6 h-6 text-purple-600" />
                </div>
                <span className="font-semibold">4. 만남 주선</span>
              </div>
              <p className="text-gray-600">성공적인 만남 지원</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">상담 문의</h2>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
            <p className="text-gray-600 mb-4">
              카카오톡 채널에서 편리하게 상담받으세요
            </p>
            <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg hover:bg-yellow-500 w-full">
              카카오톡 상담하기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarriageConsultingWebsite;