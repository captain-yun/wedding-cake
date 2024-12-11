import React from 'react';
import { MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 섹션 */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">상담 문의</h1>
            <p className="text-lg text-gray-600">
              전문 매니저가 친절하게 상담해드립니다
            </p>
          </div>

          {/* 메인 컨텐츠 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* 카카오톡 상담 섹션 */}
            <div className="p-8 bg-yellow-50 border-b border-yellow-100">
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    카카오톡 상담
                  </h2>
                  <p className="text-gray-600">
                    가장 빠르고 편리하게 상담받으실 수 있습니다
                  </p>
                </div>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg flex items-center gap-2 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  카카오톡 상담하기
                </button>
              </div>
            </div>

            {/* 연락처 정보 */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Phone className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">전화 상담</h3>
                      <p className="text-gray-600">02-1234-5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">이메일</h3>
                      <p className="text-gray-600">contact@weddingcake.com</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">오시는 길</h3>
                      <p className="text-gray-600">서울특별시 강남구 테헤란로 123</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">상담 시간</h3>
                      <p className="text-gray-600">평일 10:00 - 19:00</p>
                      <p className="text-gray-600">주말 10:00 - 17:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 추가 안내사항 */}
          <div className="mt-12 text-center text-gray-600">
            <p className="mb-2">
              * 전화 상담은 상담사 연결까지 대기 시간이 발생할 수 있습니다
            </p>
            <p>
              * 카카오톡 상담이 가장 빠르고 정확한 상담이 가능합니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}