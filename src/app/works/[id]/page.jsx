'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function WorkDetail() {
  const params = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/works/${params.id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <article className="min-h-screen bg-white">
      <header className="container mx-auto px-4 pt-20 pb-10">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex justify-between items-center text-gray-600">
          <div className="flex gap-8">
            <div>
              <span className="font-semibold">Period</span>
              <p>{post.period}</p>
            </div>
            <div>
              <span className="font-semibold">Client</span>
              <p>{post.client}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <section className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </section>
      </main>
    </article>
  );
} 