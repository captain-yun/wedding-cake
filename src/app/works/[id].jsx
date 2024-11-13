import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function WorkDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    // TODO: API로 데이터 가져오기
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  return (
    <article className="min-h-screen bg-white">
      {/* 헤더 섹션 */}
      <header className="container mx-auto px-4 pt-20 pb-10">
        <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>
        <div className="flex justify-between items-center text-gray-600">
          <div className="flex gap-8">
            <div>
              <span className="font-semibold">Period</span>
              <p>{post?.period}</p>
            </div>
            <div>
              <span className="font-semibold">Client</span>
              <p>{post?.client}</p>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-4 py-10">
        {/* 목표 & 과정 섹션 */}
        <section className="mb-16 p-8 bg-gray-900 text-white rounded-lg">
          <div className="mb-8">
            <h2 className="text-xl mb-4">목표</h2>
            <p>{post?.objective}</p>
          </div>
          <div>
            <h2 className="text-xl mb-4">과정</h2>
            <p>{post?.process}</p>
          </div>
        </section>

        {/* 본문 컨텐츠 */}
        <section className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post?.content }} />
        </section>
      </main>
    </article>
  );
}
