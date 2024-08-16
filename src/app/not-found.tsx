'use client';

import { getCookieValue } from '@/utils/ssr_functions';
import { CircularProgress } from '@nextui-org/progress';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFoundPage() {
  const router = useRouter();
  useEffect(() => {
    const loadCookies = async () => {
      const value = await getCookieValue('lang');
      router.push(`/${value}`);
    };
    loadCookies();
  });
  return (
    <html lang='en'>
      <body>
        <div className='flex min-h-screen flex-col bg-neutral-950'>
          <main className='flex h-full flex-1 flex-col justify-center'>
            <div className='flex flex-1 justify-center'>
              <CircularProgress
                size='lg'
                color='warning'
                className=''
                aria-label='loading...'
              />
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
