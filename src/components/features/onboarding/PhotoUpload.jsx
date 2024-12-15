'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function PhotoUpload({ onComplete }) {
  const supabase = createClientComponentClient();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      const { data: { user } } = await supabase.auth.getUser();
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: publicUrl,
          onboarding_step: 3
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      onComplete();
    } catch (error) {
      console.error('Error:', error);
      alert('사진 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6">프로필 사진을 등록해주세요</h2>
      
      <div className="mt-8">
        {preview ? (
          <div className="relative w-40 h-40 mx-auto mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        ) : (
          <div className="w-40 h-40 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <label className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 cursor-pointer">
          <input
            type="file"
            className="sr-only"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          {uploading ? '업로드 중...' : '사진 선택'}
        </label>

        <p className="mt-2 text-sm text-gray-500">
          JPG, PNG, GIF 형식의 파일을 업로드해주세요
        </p>
      </div>
    </div>
  );
} 