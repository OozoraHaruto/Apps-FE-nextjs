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
  const isPublicRoute = protectedRedirectAwayRoutes.includes(path)

  // Get jwt
  const jwt = (await cookies()).get(COOKIE_NAME)?.value

  // Check if the user is authenticated
  const userValid = await validateJWT(jwt || '')

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !userValid) {
    if (path === '/auth/logout') {
      return NextResponse.redirect(new URL(`/auth/login`, req.nextUrl))
    } else {
      return NextResponse.redirect(new URL(`/auth/login?redirect=${path}`, req.nextUrl))
    }
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && userValid) {
    return NextResponse.redirect(new URL('/me', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}