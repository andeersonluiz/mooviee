'use server';

import { cookies, headers } from 'next/headers';

export const getDeviceType = async () => {
  const userAgent = headers().get('user-agent');

  if (userAgent != null) {
    const isMobile = /iPhone|iPod|Android.*Mobile/i.test(
      userAgent
    );
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(
      userAgent
    );
    return {
      isMobile,
      isTablet,
      isDesktop: !isMobile && !isTablet,
    };
  } else {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: false,
    };
  }
};

export async function setCookieValue(
  key: string,
  value: string
) {
  cookies().set(key, value, { secure: true });
}

export async function getCookieValue(key: string) {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has(key);
  if (hasCookie) {
    return cookieStore.get(key)?.value;
  } else {
    cookies().set(key, 'en', { secure: true });
    return 'en';
  }
}
