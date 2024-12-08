import { NextResponse } from 'next/server'

export function middleware(request) {
  // 관리자 페이지 경로 체크
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization')
    
    // 기본적인 Basic 인증 체크
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return new NextResponse(null, {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"'
        }
      })
    }

    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')

    // 환경 변수에서 관리자 계정 정보 확인
    if (
      username !== process.env.ADMIN_USERNAME || 
      password !== process.env.ADMIN_PASSWORD
    ) {
      return new NextResponse(null, {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"'
        }
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
} 