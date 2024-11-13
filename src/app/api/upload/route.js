import { writeFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('image');

    if (!file) {
      return NextResponse.json(
        { error: "No file received." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 파일 이름 생성 (timestamp + 원본 파일명)
    const timestamp = Date.now();
    const originalName = file.name;
    const fileName = `${timestamp}-${originalName}`;

    // public/uploads 디렉토리에 저장
    const path = join(process.cwd(), 'public/uploads', fileName);
    await writeFile(path, buffer);

    return NextResponse.json({ 
      url: `/uploads/${fileName}`,
      success: true 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
} 