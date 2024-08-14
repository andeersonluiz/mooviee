import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['br', 'en'],

  defaultLocale: 'br',
});

export const config = {
  matcher: ['/', '/(br|en)/:path*'],
};
