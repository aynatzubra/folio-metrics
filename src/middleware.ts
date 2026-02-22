import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { auth } from '@/auth'
import { defaultLocale, locales } from '@/shared/lib/i18n/config'

export const runtime = 'nodejs'

const intlMiddleware = createMiddleware({
  locales: locales as unknown as string[],
  defaultLocale: defaultLocale,
  localePrefix: 'always',
})

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  // const isAdminPage = url.pathname.startsWith('/admin') && url.pathname !== '/admin/login'
  const session = req.auth
  const isLoggedIn = !!session?.user
  const isAuthPage = req.nextUrl.pathname === '/admin/login'

  const intlResponse = intlMiddleware(req)

  if (isAdminRoute) {
    if (isAuthPage && isLoggedIn) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl))
    }

    if (!isAuthPage && !isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
    }

    return NextResponse.next()
  }

  return intlResponse
})

export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|assets).+)',
    // '/admin/:path*',
  ],
}
