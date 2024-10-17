import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers';
 
export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth");
  
  // unauthenticated user
  if (!authCookie) {
    const path = request.nextUrl.pathname;
    if (
      !(path == '/' ||
      path.startsWith('/sign-in') ||
      path.startsWith('/sign-up'))
    ) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // prevent authenticated user entering sign-in or sign-up page
  if (authCookie) {
    if (
      request.nextUrl.pathname.startsWith('/sign-in') ||
      request.nextUrl.pathname.startsWith('/sign-out')
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
