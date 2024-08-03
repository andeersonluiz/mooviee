import { BASE_IMAGE_URL } from '@/config/settings';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import placeholder from '../../../../assets/placeholder.png';
import { Recommendations } from '@/modules/data/model/serie-info';

const RecommendationTile = ({ recommendation }: { recommendation: Recommendations }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [src, setSrc] = useState(`${BASE_IMAGE_URL}${recommendation?.poster_path}`);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <div className='cursor-pointer p-4 hover:bg-neutral-800'>
      <Image
        src={src == '' ? placeholder : src}
        alt={src}
        width={180}
        height={120}
        onError={() => setSrc('')}
        className={`${isLoaded ? 'opacity-100 blur-none' : 'opacity-20 blur-2xl'} bg-cover bg-center shadow-none transition-opacity duration-500 ease-linear`}
      />
      <p className='line-clamp-2 w-[120px] pt-2 text-sm font-semibold text-white'>
        {recommendation.name}
      </p>
    </div>
  );
};

export default RecommendationTile;
