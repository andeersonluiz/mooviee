import { MoviesAndTvShowProvider } from '@/modules/presentation/provider/movies-tv-show-provider';
import { UserAgentProvider } from '@/modules/presentation/provider/user-agent-provider';
import { getDeviceType } from '@/utils/ssr_functions';
import { NextUIProvider } from '@nextui-org/system';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
} from 'next-intl/server';
import { M_PLUS_1 } from 'next/font/google';
import '../../app/globals.css';

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
  const messages = await getMessages();
  const deviceType = await getDeviceType();
  const t = await getTranslations('metadata');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t('title'),
    image: 'https://mooviee.vercel.app/logo.png',
    description: t('description'),
    logo: 'https://mooviee.vercel.app/logo.png',
  };

  return (
    <html
      lang={locale}
      className='!scroll-smooth'
      translate='no'
    >
      <head>
        <title>{t('title')}</title>
        <meta
          name='description'
          content={t('description')}
        />
        <meta
          name='keywords'
          content={t('keywordsMainContent')}
        />
        <meta property='og:title' content={t('title')} />
        <meta
          property='og:description'
          content={t('description')}
        />
        <meta
          property='og:image'
          content='/images/favicon.ico'
        />
        <meta
          property='og:url'
          content='https://mooviee.vercel.app/'
        />
        <meta property='og:type' content='website' />

        <link rel='icon' href='/images/favicon.ico' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body
        className={`${m_plus.className} ${deviceType.isDesktop ? 'overflow-auto' : 'overflow-hidden'} relative -z-0 bg-neutral-950`}
      >
        <MoviesAndTvShowProvider>
          <NextUIProvider>
            <NextIntlClientProvider
              locale={locale}
              messages={messages}
            >
              <UserAgentProvider value={deviceType}>
                {children}
              </UserAgentProvider>
            </NextIntlClientProvider>
          </NextUIProvider>
        </MoviesAndTvShowProvider>
      </body>
    </html>
  );
}
