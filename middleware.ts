import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers';
 
export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth");
  
  // unauthenticated user
  if (!authCookie) {
    console.log('no cookies');
    const path = request.nextUrl.pathname;
    console.log(path);
    if (
      !(path == '/' ||
      path.startsWith('/sign-in') ||
      path.startsWith('/sign-up'))
    ) {
      console.log('here');
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