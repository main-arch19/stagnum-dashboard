import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Always allow static assets and API routes
  if (pathname.startsWith('/api')) return NextResponse.next()

  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET

  // If secret not configured yet (Vercel env vars not set), let request through
  // so the app renders an error page instead of a blank 401
  if (!secret) return NextResponse.next()

  const token = await getToken({ req, secret })
  const isLoggedIn = !!token
  const isAuthPage = pathname.startsWith('/login')

  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
