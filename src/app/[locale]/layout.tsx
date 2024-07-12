import { MoviesAndTvShowProvider } from '@/modules/presentation/provider/movies-tv-show-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Suspense } from 'react';
import '../../app/globals.css';
import { Inter, M_PLUS_1 } from 'next/font/google';

const m_plus = M_PLUS_1({
  subsets: ['latin'],

  display: 'swap',
  variable: '--font-mplus',
});

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  console.log('tlayou');
  return (
    <html lang={locale}>
      <body className={`bg-neutral-950 ${m_plus.className}`}>
        <MoviesAndTvShowProvider>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>{' '}
        </MoviesAndTvShowProvider>
      </body>
    </html>
  );
}
