import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// ─── Set to true when ready to enforce login ─────────────────────────────────
const AUTH_ENABLED = false
// ─────────────────────────────────────────────────────────────────────────────

export async function proxy(req: NextRequest) {
  if (!AUTH_ENABLED) return NextResponse.next()

  const { pathname } = req.nextUrl
  if (pathname.startsWith('/api')) return NextResponse.next()

  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET
  if (!secret) return NextResponse.next()

  const token = await getToken({ req, secret })
  const isLoggedIn = !!token
  const isAuthPage = pathname.startsWith('/login')

  if (!isLoggedIn && !isAuthPage)
    return NextResponse.redirect(new URL('/login', req.nextUrl))

  if (isLoggedIn && isAuthPage)
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
