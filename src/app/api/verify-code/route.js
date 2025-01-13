import { NextResponse } from 'next/server';
import { jsonDb } from '@/lib/jsonDb';

export async function POST(request) {
  try {
    const { email, code } = await request.json();
    
    const verification = await jsonDb.findOne('verifications', 'verifications', {
      email: email.toLowerCase(),
      verification_code: code,
      status: 'PENDING'
    });

    if (!verification) {
      return NextResponse.json(
        { error: '유효하지 않은 인증 코드입니다.' },
        { status: 400 }
      );
    }

    const expiresAt = new Date(verification.expires_at);
    const now = new Date();

    if (now > expiresAt) {
      return NextResponse.json(
        { error: '만료된 인증 코드입니다. 다시 시도해주세요.' },
        { status: 400 }
      );
    }

    await jsonDb.update('verifications', 'verifications', verification.id, {
      status: 'APPROVED'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: '인증에 실패했습니다.' },
      { status: 500 }
    );
  }
} 