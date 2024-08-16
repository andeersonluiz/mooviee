'use client';

import FooterContent from '@/components/footer/footer-content';
import HeaderMobileComponent from '@/components/header-mobile/header-mobile-component';
import HeaderComponent from '@/components/header/header-component';
import { getDeviceType } from '@/utils/ssr_functions';
import { CircularProgress } from '@nextui-org/progress';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function NotFoundPage() {
  const [deviceType, setDeviceType] = useState<{
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  } | null>(null);
  const tNotFound = useTranslations('notFoundPage');

  useEffect(() => {
    const getDeviceInfo = async () => {
      const deviceType = await getDeviceType();
      setDeviceType(deviceType);
      window.document.title = `Movieee - ${tNotFound('title')}`;
    };
    getDeviceInfo();
  }, []);
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex h-full flex-1 flex-col justify-center'>
        {deviceType && (
          <>
            {deviceType.isMobile ? (
              <HeaderMobileComponent selectedIndex={-1} />
            ) : (
              <HeaderComponent selectedIndex={-1} />
            )}
            <h1 className='flex flex-1 items-center justify-center px-8 text-center text-2xl text-white'>
              {tNotFound('notFound')}
            </h1>
          </>
        )}
        {!deviceType && (
          <div className='flex flex-1 justify-center'>
            <CircularProgress
              size='lg'
              color='warning'
              className=''
              aria-label='loading...'
            />
          </div>
        )}
        <FooterContent />
      </main>
    </div>
  );
}
