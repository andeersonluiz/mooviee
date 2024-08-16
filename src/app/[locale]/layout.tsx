import { MoviesAndTvShowProvider } from '@/modules/presentation/provider/movies-tv-show-provider';
import { UserAgentProvider } from '@/modules/presentation/provider/user-agent-provider';
import { getDeviceType } from '@/utils/ssr_functions';
import { NextUIProvider } from '@nextui-org/system';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { M_PLUS_1 } from 'next/font/google';
import '../../app/globals.css';

export const metadata = {
  title: 'Movieee',
  description: 'Filmes e Séries',
  icons: {
    icon: '/images/favicon.ico',
  },
};

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

  return (
    <html
      lang={locale}
      className='!scroll-smooth'
      translate='no'
    >
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
