import DivTile from '@/components/custom-tags/divTile';
import { BASE_IMAGE_URL } from '@/config/settings';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import placeholder from '../../../../assets/placeholder.png';
const CastTile = ({ cast }: { cast: any }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [src, setSrc] = useState(
    `${BASE_IMAGE_URL}${cast?.profile_path}`
  );
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const locale = window.location.href.split(/\/(en|br)/)[1];

  return (
    <DivTile
      path={`/${locale}/cast/${cast.id}`}
      className='cursor-pointer p-4 hover:bg-neutral-800'
    >
      <Image
        src={src == '' ? placeholder : src}
        alt={src}
        width={180}
        height={120}
        onError={() => setSrc('')}
        className={`${isLoaded ? 'opacity-100 blur-none' : 'opacity-20 blur-2xl'} bg-cover bg-center shadow-none transition-opacity duration-500 ease-linear`}
      />
      <p className='line-clamp-2 w-[120px] pt-2 text-white'>
        {cast.original_name}
      </p>
    </DivTile>
  );
};

export default CastTile;
