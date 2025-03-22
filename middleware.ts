import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { COOKIE_NAME, validateJWT } from '@/lib/auth'

// Specify protected and public routes
const protectedRoutes = ['/me', '/auth/logout']
const protectedRedirectAwayRoutes = ['/auth/login']

export default async function middleware(req: NextRequest) {
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isProtectedRedirectAway = protectedRedirectAwayRoutes.includes(path)

  // Get jwt
  const jwt = (await cookies()).get(COOKIE_NAME)?.value

  // Check if the user is authenticated
  const [userValid] = await validateJWT(jwt || '')

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !userValid) {
    const rPath = "'/auth/login'" + path === '/auth/logout' ? "" : `?redirect=${path}`
    return NextResponse.redirect(new URL(rPath, req.nextUrl))
  }

  // Redirect to /me if the user is authenticated and tries to access routes like /auth/login
  if (isProtectedRedirectAway && userValid) {
    return NextResponse.redirect(new URL('/me', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}