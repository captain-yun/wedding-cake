"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="hero-text text-5xl md:text-7xl font-bold mb-6">
          Creative Solutions
        </h1>
        <p className="hero-text text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          디지털 시대를 선도하는 크리에이티브 에이전시
        </p>
      </div>
    </section>
  );
}
