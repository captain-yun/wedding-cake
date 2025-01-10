import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(request) {
  try {
    const { email, code } = await request.json();
    console.log('Verifying:', email, code);

    // cookies를 await로 처리
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ 
      cookies: () => cookieStore 
    });

    // 디버깅을 위한 쿼리 로그
    console.log('Querying verification with:', {
      email,
      verification_code: code,
      status: 'PENDING'
    });
    
    // verification_code가 문자열인지 숫자인지 확인
    console.log('Types:', {
      codeType: typeof code,
      code: code,
      email: email
    });

    const { data: verificationData, error } = await supabase
      .from('verification')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('verification_code', code)
      .eq('status', 'PENDING')
      .single();

    console.log('Query result:', { data: verificationData, error });

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: '유효하지 않은 인증 코드입니다.' },
          { status: 400 }
        );
      }
      throw error;
    }

    if (!verificationData) {
      return NextResponse.json(
        { error: '인증 정보를 찾을 수 없습니다.' },
        { status: 400 }
      );
    }

    // 만료 시간 확인 (로컬 시간 기준으로 비교)
    const expiresAtStr = verificationData.expires_at;
    const expiresAt = new Date(expiresAtStr + 'Z'); // UTC 시간으로 변환
    const now = new Date();
    
    console.log('Time check:', {
      originalExpiresAt: expiresAtStr,
      expiresAtUTC: expiresAt.toISOString(),
      nowUTC: now.toISOString(),
      isExpired: now.getTime() > expiresAt.getTime()
    });

    // 현재 시간이 만료 시간을 초과했는지 확인
    if (now.getTime() > expiresAt.getTime()) {
      return NextResponse.json(
        { error: '만료된 인증 코드입니다. 다시 시도해주세요.' },
        { status: 400 }
      );
    }

    // 인증 성공 시 상태 업데이트
    const { error: updateError } = await supabase
      .from('verification')
      .update({ 
        status: 'APPROVED',
        updated_at: new Date().toISOString()
      })
      .eq('id', verificationData.id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { 
        error: '인증에 실패했습니다.',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 