"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function WorksPage() {
  const worksRef = useRef(null);
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch("/api/works");
        if (!response.ok) {
          throw new Error("Failed to fetch works");
        }
        const data = await response.json();
        setPortfolioItems(data);
      } catch (error) {
        console.error("Error fetching works:", error);
      }
    };

    fetchWorks();
  }, []);

  useEffect(() => {
    if (portfolioItems.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".work-item",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            scrollTrigger: {
              trigger: worksRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, worksRef);

      return () => ctx.revert();
    }
  }, [portfolioItems]);

  return (
    <div className="bg-black text-white" ref={worksRef}>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
            We work with BURBERRY.
          </h1>
          <div className="flex justify-center mb-8">
            <button className="mx-4 text-teal-400">All</button>
            <button className="mx-4 text-gray-400">Korea</button>
            <button className="mx-4 text-gray-400">Global</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.map((item) => (
              <Link
                key={item.id}
                href={`/works/${item.id}`}
                className="work-item block bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                  <p className="text-gray-400">{item.description}</p>
                  <p className="text-gray-500 mt-2">
                    {item.date} / {item.client} / {item.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
