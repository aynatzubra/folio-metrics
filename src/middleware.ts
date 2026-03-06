import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { auth } from '@/auth'
import { defaultLocale, locales } from '@/shared/lib/i18n/config'
import { updateSupabaseSession } from '@/shared/lib/utils'

export const runtime = 'nodejs'

const intlMiddleware = createMiddleware({
  locales: locales as unknown as string[],
  defaultLocale: defaultLocale,
  localePrefix: 'always',
})

export default auth(async (req) => {
  const session = req.auth
  const isLoggedIn = !!session?.user
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isAuthPage = pathname.includes('/admin/login')

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

  return await updateSupabaseSession(req, intlResponse)
})

export const config = {
  matcher: ['/', '/(ru|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
}