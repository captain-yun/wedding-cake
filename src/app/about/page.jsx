"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const sectionRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        missionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        visionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: visionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        teamRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-gray-100" ref={sectionRef}>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            우리에 대해
          </h1>
          <p className="text-lg md:text-xl text-gray-600 text-center mb-12">
            우리는 혁신적인 디지털 솔루션을 제공하는 크리에이티브
            에이전시입니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg" ref={missionRef}>
              <h2 className="text-2xl font-bold mb-4">우리의 비전</h2>
              <p className="text-gray-700">
                고객의 성공을 최우선으로 생각하며, 지속 가능한 성장을 위해
                최선을 다합니다.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg" ref={visionRef}>
              <h2 className="text-2xl font-bold mb-4">우리의 미션</h2>
              <p className="text-gray-700">
                창의적이고 혁신적인 솔루션을 통해 고객의 브랜드 가치를
                극대화합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            팀 소개
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={teamRef}>
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const teamMembers = [
  {
    id: 1,
    name: "홍길동",
    position: "CEO",
    image: "/team1.jpg", // 팀원 이미지 경로
  },
  {
    id: 2,
    name: "김철수",
    position: "디자이너",
    image: "/team2.jpg", // 팀원 이미지 경로
  },
  {
    id: 3,
    name: "이영희",
    position: "개발자",
    image: "/team3.jpg", // 팀원 이미지 경로
  },
];
