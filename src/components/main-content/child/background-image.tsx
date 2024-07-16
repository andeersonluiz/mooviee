import { BASE_IMAGE_URL } from '@/modules/config/settings';
import { Result } from '@/modules/data/model/trending-all';
import { heightHomePageTailwind } from '@/styles/style-values';
import { durationBanner } from '@/utils/transitions-data';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const BackgroundImage = ({ media }: { media: Result }) => {
  const [isLoaded, setIsloaded] = useState(false);
  useEffect(() => {
    console.log('mudei', isLoaded);
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
      className={`${isLoaded ? 'opacity-100 blur-none' : 'opacity-20 blur-2xl'} image absolute top-0 shadow-none ease-linear ${heightHomePageTailwind} -z-20 w-full bg-cover transition-opacity duration-500`}
    ></div>
  );
};

export default BackgroundImage;