import { BASE_IMAGE_URL } from '@/config/settings';
import { Result } from '@/modules/data/model/trending-all';
import { heightHomePageTailwind } from '@/styles/style-values';
import { durationBanner } from '@/utils/transitions-data';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const BackgroundImage = ({ media }: { media: Result }) => {
  const [isLoaded, setIsloaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsloaded(true);
    }, durationBanner);
    return () => {
      setIsloaded(false);
    };
  }, [media]);

  return (
    <div
      style={{ backgroundImage: `url(${`${BASE_IMAGE_URL}${media?.backdrop_path}`})` }}
      className={`${isLoaded ? 'opacity-100 blur-none' : 'opacity-20 blur-2xl'} absolute top-0 bg-center shadow-none ease-linear ${heightHomePageTailwind} -z-20 h-full w-full bg-cover transition-opacity duration-500`}
    ></div>
  );
};

export default BackgroundImage;
