import React from 'react';
import { Shield, Check, Star, Heart, Users, Trophy, Calendar, Phone } from 'lucide-react';

const ServicePages = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Price Information Page */}


      {/* Matching Planner Information Page */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">매칭 플래너 소개</h1>
          
          {/* Planner Role Overview */}
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-lg text-gray-600 text-center mb-12">
              매칭 플래너는 여러분의 소중한 인연을 찾아드리는 전문가입니다.<br />
              철저한 검증과 교육을 거친 플래너가 1:1로 매칭을 도와드립니다.
            </p>
          </div>

          {/* Planner Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">심층 인터뷰</h3>
              </div>
              <p className="text-gray-600">
                고객님의 가치관, 라이프스타일, 결혼관에 대해 깊이 있는 대화를 나누며 최적의 매칭 방향을 설정합니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">맞춤형 매칭</h3>
              </div>
              <p className="text-gray-600">
                검증된 회원 데이터베이스를 기반으로 고객님께 가장 적합한 매칭 상대를 선별하여 추천해드립니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">만남 코디네이션</h3>
              </div>
              <p className="text-gray-600">
                첫 만남부터 후속 만남까지, 자연스러운 만남이 이루어질 수 있도록 세심하게 조율해드립니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">데이트 코칭</h3>
              </div>
              <p className="text-gray-600">
                만남 이후의 피드백을 바탕으로 데이트 코칭과 관계 발전을 위한 조언을 제공합니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">일정 관리</h3>
              </div>
              <p className="text-gray-600">
                상호 간의 일정을 고려하여 최적의 만남 시간을 조율하고 관리해드립니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">개인정보 보호</h3>
              </div>
              <p className="text-gray-600">
                철저한 보안 원칙하에 고객님의 개인정보를 안전하게 관리합니다.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-4">매칭 플래너와 상담하기</h3>
            <p className="text-gray-600 mb-8">
              전문 매칭 플래너가 무료 상담을 통해 자세한 설명을 도와드립니다
            </p>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700">
              무료 상담 신청하기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePages;