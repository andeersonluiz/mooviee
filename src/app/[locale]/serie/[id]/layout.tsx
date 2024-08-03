import {
  MovieAndTvShowContext,
  MoviesAndTvShowProvider,
  UserAgentContext,
} from '@/modules/presentation/provider/movies-tv-show-provider';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Suspense, useContext, useEffect, useState } from 'react';
import { Inter, M_PLUS_1 } from 'next/font/google';
import { Genre } from '@/modules/data/model/serie-info';
import { NextUIProvider } from '@nextui-org/system';
import FooterContent from '@/components/footer/footer-content';
import { headers } from 'next/headers';
import { getDeviceType } from '@/utils/ssr_functions';
import { UserAgentProvider } from '@/modules/presentation/provider/user-agent-provider';

export default async function SerieLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  console.log('userAgent');

  return <>{children}</>;
}
