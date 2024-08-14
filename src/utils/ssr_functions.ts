'use server';

import { headers } from 'next/headers';

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
