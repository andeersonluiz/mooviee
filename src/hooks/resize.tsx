import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import { getDeviceType } from '@/utils/ssr_functions';
import { useEffect } from 'react';

const useResize = () => {
  const userAgentInfo = useUserAgentData();

  useEffect(() => {
    userAgentInfo.isDesktop
      ? (document.body.style.overflow = 'auto')
      : (document.body.style.overflow = 'hidden');

    const handleResize = async () => {
      const deviceType = await getDeviceType();

      if (
        JSON.stringify(deviceType) !=
        JSON.stringify(userAgentInfo)
      ) {
        window.location.reload();
      }
    };

    window.addEventListener('resize', handleResize);
  }, []);

  return;
};

export default useResize;
