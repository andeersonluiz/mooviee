import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['br', 'en'],

  // Used when no locale matches
  defaultLocale: 'br',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(br|en)/:path*'],
};
