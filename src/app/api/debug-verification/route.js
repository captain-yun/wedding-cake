import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(request) {
  try {
    const { email, code } = await request.json();
    console.log('Debug request:', { email, code });

    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ 
      cookies: () => cookieStore 
    });

    // 1. 타입 체크
    console.log('Input types:', {
      emailType: typeof email,
      codeType: typeof code,
      email,
      code
    });

    // 2. 해당 이메일의 모든 verification 데이터 조회
    const { data: allVerifications, error: allError } = await supabase
      .from('verification')
      .select('*')
      .eq('email', email);

    console.log('All verifications for email:', allVerifications);

    // 3. 정확한 조건으로 verification 데이터 조회
    const { data: exactMatch, error: exactError } = await supabase
      .from('verification')
      .select('*')
      .eq('email', email)
      .eq('verification_code', code)
      .eq('status', 'PENDING');

    console.log('Exact match result:', {
      data: exactMatch,
      error: exactError
    });

    // 4. 대소문자 구분 없이 조회
    const { data: caseInsensitive, error: caseError } = await supabase
      .from('verification')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('verification_code', code)
      .eq('status', 'PENDING');

    console.log('Case insensitive result:', {
      data: caseInsensitive,
      error: caseError
    });

    // 5. 최근 verification 기록 조회
    const { data: recentVerifications, error: recentError } = await supabase
      .from('verification')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(5);

    console.log('Recent verifications:', recentVerifications);

    // 디버그 정보 반환
    return NextResponse.json({
      inputData: { email, code },
      types: {
        emailType: typeof email,
        codeType: typeof code
      },
      queries: {
        allVerifications: {
          data: allVerifications,
          error: allError
        },
        exactMatch: {
          data: exactMatch,
          error: exactError
        },
        caseInsensitive: {
          data: caseInsensitive,
          error: caseError
        },
        recentVerifications: {
          data: recentVerifications,
          error: recentError
        }
      }
    });

  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { 
        error: '디버깅 중 오류가 발생했습니다.',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 