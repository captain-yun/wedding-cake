'use client';

import { useState } from 'react';
import WorkEditor from '@/components/WorkEditor';

export default function AdminEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [client, setClient] = useState('');
  const [period, setPeriod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnail, setThumbnail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/works', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          client,
          period,
          thumbnail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      // 성공 시 폼 초기화
      setTitle('');
      setContent('');
      setClient('');
      setPeriod('');
      alert('게시글이 성공적으로 등록되었습니다.');
    } catch (error) {
      console.error('Submit error:', error);
      alert(`게시글 등록에 실패했습니다: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">새 게시글 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">클라이언트</label>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">기간</label>
          <input
            type="text"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">내용</label>
          <WorkEditor
            initialContent={content}
            onChange={setContent}
            onThumbnailChange={setThumbnail}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? '등록 중...' : '게시글 등록'}
        </button>
      </form>
    </div>
  );
} 