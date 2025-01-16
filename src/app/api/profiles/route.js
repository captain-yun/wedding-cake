import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import prisma from '@/lib/prisma';

// GET /api/profile - 프로필 조회
export async function GET() {
  try {
    // 1. 쿠키와 인증 처리 - 비동기 처리 추가
    // const cookieStore = await cookies();
    // const supabase = createRouteHandlerClient({ cookies: async () => cookieStore });
    const supabase = createRouteHandlerClient({ cookies });
    
    // 세션 확인을 더 엄격하게
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError || !session?.user) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다.' },
        { status: 401 }
      );
    }

    // 2. prisma 연결 확인
    try {
      await prisma.$connect();
    } catch (error) {
      console.error('Prisma connection error:', error);
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // 3. 프로필 조회
    const profile = await prisma.profile.findUnique({
      where: { 
        user_id: session.user.id 
      },
      select: {
        temp_data: true,
        current_step: true,
        profile_completed: true
      }
    });

    return NextResponse.json({ 
      success: true, 
      profile: profile || { temp_data: {}, current_step: 1, profile_completed: false }
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: '프로필 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST /api/profile - 임시 저장
export async function POST(request) {
  try {
    const { formData, currentStep } = await request.json();
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError || !session?.user) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다.' },
        { status: 401 }
      );
    }

    await prisma.$connect();

    // 프로필 임시 저장
    const profile = await prisma.profile.upsert({
      where: { 
        user_id: session.user.id 
      },
      create: {
        user_id: session.user.id,
        temp_data: formData,
        current_step: currentStep,
        profile_completed: false,
        name: '',
        gender: '',
        birth_date: new Date(),
        height: 0,
        occupation: '',
        education: '',
        location: ''
      },
      update: {
        temp_data: formData,
        current_step: currentStep,
        updated_at: new Date()
      }
    });

    return NextResponse.json({ 
      success: true,
      profile 
    });

  } catch (error) {
    console.error('Profile save error:', error);
    return NextResponse.json(
      { error: '프로필 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}