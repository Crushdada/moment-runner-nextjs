import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/') {
    // 检查 Accept-Language 头或 cookie 来决定默认语言
    const defaultLang = 'en' // 或者根据用户偏好动态决定
    return NextResponse.redirect(new URL(`/${defaultLang}`, request.url))
  }
}

export const config = {
  matcher: '/',
}