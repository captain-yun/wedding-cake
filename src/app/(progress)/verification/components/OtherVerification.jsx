'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth';

export default function OtherVerification() {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { user } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (files.length === 0) throw new Error('증빙 서류를 업로드해주세요.');

      // 파일 업로드
      const uploadPromises = files.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('verifications')
          .upload(`other/${fileName}`, file);

        if (uploadError) throw uploadError;
        return `other/${fileName}`;
      });

      const filePaths = await Promise.all(uploadPromises);

      // DB에 인증 정보 저장
      const { error: dbError } = await supabase.from('verifications').insert({
        user_id: user.id,
        type: 'other',
        description,
        file_paths: filePaths,
        status: 'pending'
      });

      if (dbError) throw dbError;

      alert('인증이 접수되었습니다. 검토 후 승인될 예정입니다.');
      router.push('/verification/status');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">증빙 서류</label>
        <input
          type="file"
          accept="image/*,.pdf"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
        <p className="mt-2 text-sm text-gray-500">
          * 신분증, 소득증빙 서류 등을 업로드해주세요
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">설명</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={4}
          placeholder="인증 서류에 대해 설명해주세요"
          required
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isLoading || files.length === 0 || !description}
        className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? '제출중...' : '인증 요청'}
      </button>
    </form>
  );
} 