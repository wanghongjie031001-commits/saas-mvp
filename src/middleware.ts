import { createMiddlewareClient } from '@/utils/supabase'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Skip middleware for static files, API routes, and login page
  const pathname = request.nextUrl.pathname
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/login' ||
    pathname.startsWith('/auth')
  ) {
    return NextResponse.next()
  }

  // Only protect /pro routes
  if (pathname.startsWith('/pro')) {
    const response = NextResponse.next()
    const supabase = createMiddlewareClient(request, response)

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/pro/:path*',
  ],
}