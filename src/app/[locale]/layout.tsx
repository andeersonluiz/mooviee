import {
  MovieAndTvShowContext,
  MoviesAndTvShowProvider,
} from '@/modules/presentation/provider/movies-tv-show-provider';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Suspense, useContext, useEffect, useState } from 'react';
import '../../app/globals.css';
import { Inter, M_PLUS_1 } from 'next/font/google';
import { Genre } from '@/modules/data/model/serie-info';
import { NextUIProvider } from '@nextui-org/system';
import FooterContent from '@/components/footer/footer-content';

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

  return (
    <html lang={locale}>
      <body className={`${m_plus.className} relative -z-50 bg-neutral-950`}>
        <MoviesAndTvShowProvider>
          <NextUIProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
          </NextUIProvider>
        </MoviesAndTvShowProvider>
      </body>
    </html>
  );
}
