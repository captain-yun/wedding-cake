'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth';

export default function BusinessVerification() {
  const [file, setFile] = useState(null);
  const [businessNumber, setBusinessNumber] = useState('');
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
      if (!file) throw new Error('사업자등록증을 업로드해주세요.');

      // 파일 업로드
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('verifications')
        .upload(`business/${fileName}`, file);

      if (uploadError) throw uploadError;

      // DB에 인증 정보 저장
      const { error: dbError } = await supabase.from('verifications').insert({
        user_id: user.id,
        type: 'business',
        business_number: businessNumber,
        file_path: `business/${fileName}`,
        status: 'pending'
      });

      if (dbError) throw dbError;

      alert('사업자 인증이 접수되었습니다. 검토 후 승인될 예정입니다.');
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
        <label className="block text-sm font-medium mb-2">사업자등록번호</label>
        <input
          type="text"
          value={businessNumber}
          onChange={(e) => setBusinessNumber(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="000-00-00000"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">사업자등록증</label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
        <p className="mt-2 text-sm text-gray-500">
          * PDF 또는 이미지 파일만 업로드 가능합니다
        </p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isLoading || !file || !businessNumber}
        className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? '제출중...' : '인증 요청'}
      </button>
    </form>
  );
} 