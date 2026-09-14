import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'

const defaultLocale = 'en'
const locales = ['pt', 'en', 'es']

/** Best-effort locale from Accept-Language; falls back to English on missing or malformed headers. */
function getLocale(request: NextRequest): string {
  const acceptedLanguage = request.headers.get('accept-language')
  if (!acceptedLanguage) return defaultLocale
  try {
    const languages = new Negotiator({ headers: { 'accept-language': acceptedLanguage } })
      .languages()
      .filter((l) => l !== '*')
    return languages.length ? match(languages, locales, defaultLocale) : defaultLocale
  } catch {
    return defaultLocale
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    if (pathname === '/') return NextResponse.redirect(new URL(`/${locale}`, request.url))
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }
}

export const config = {
  matcher: [
    // Skip internal paths (_next, api, assets) and anything that looks like a file
    '/((?!api|assets|.*\\..*|_next).*)',
  ],
}
