import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './lib/i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Get locale from browser or use default
  const locale = getLocaleFromRequest(request) || i18n.defaultLocale;
  
  // Redirect to locale-prefixed URL
  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}

function getLocaleFromRequest(request: NextRequest): string {
  // Get locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  
  if (acceptLanguage) {
    // Parse accept-language header
    const languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase());
    
    // Check if any preferred language matches our supported locales
    for (const lang of languages) {
      if (lang.startsWith('fr')) return 'fr';
      if (lang.startsWith('en')) return 'en';
    }
  }
  
  return i18n.defaultLocale;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files, sitemap, .well-known)
    '/((?!api|_next/static|_next/image|favicon.ico|images|sitemap.xml|\\.well-known).*)',
  ],
};
