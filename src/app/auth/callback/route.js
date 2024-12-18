
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
    
    // 유저의 프로필 정보 가져오기
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // 프로필 상태에 따라 적절한 페이지로 리다이렉트
      if (!profile) {
        return NextResponse.redirect(new URL('/profile', request.url));
      }
      if (!profile.profile_completed) return NextResponse.redirect(new URL('/profile', request.url));
      if (!profile.ideal_type_completed) return NextResponse.redirect(new URL('/ideal-type', request.url));
      if (!profile.verification_completed) return NextResponse.redirect(new URL('/verification', request.url));
      // ... 나머지 상태에 따른 리다이렉트 ...
    }
  }

  // 기본적으로는 프로필 페이지로
  return NextResponse.redirect(new URL('/profile', request.url));
} 

// export default function AuthCallback() {
//   const router = useRouter();
//   const supabase = createClientComponentClient();

//   useEffect(() => {
//     const handleMagicLink = async () => {
//       const { error } = await supabase.auth.getSession();

//       if (error) {
//         console.error('인증 실패:', error.message);
//         return;
//       }

//       // 인증 성공 시, 필요한 상태 업데이트 및 리디렉션
//       router.push('/dashboard'); // 인증 후 리디렉션할 페이지
//     };

//     handleMagicLink();
//   }, [router, supabase]);

//   return <div>인증 중...</div>;
// } 