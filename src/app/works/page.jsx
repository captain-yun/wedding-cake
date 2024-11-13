"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function WorksPage() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/works');
        const data = await response.json();        
        setWorks(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-black text-white">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Our Works
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {works.map((work) => (
              <Link
                key={work.id}
                href={`/works/${work.id}`}
                className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{work.title}</h2>
                  <p className="text-gray-500 mt-2">
                    {work.client} / {work.period}
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
