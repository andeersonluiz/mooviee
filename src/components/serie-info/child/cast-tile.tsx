import { BASE_IMAGE_URL } from '@/config/settings';
import Image from 'next/image';
import { useState } from 'react';
import placeholder from '../../../../assets/placeholder.png';

const CastTile = ({ cast }: { cast: any }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [src, setSrc] = useState(
    `${BASE_IMAGE_URL}${cast?.profile_path}`
  );

  return (
    <div className='p-4 hover:bg-neutral-800'>
      <Image
        src={src}
        alt={src}
        width={180}
        height={120}
        onError={() => setSrc(placeholder.src)}
        onLoad={async () => {
          setIsLoaded(true);
        }}
        className={`${isLoaded ? 'opacity-100' : 'opacity-0'} h-[180px] w-[120px] bg-cover bg-center shadow-none transition-opacity duration-500 ease-linear`}
      />
      <p
        className={`${isLoaded ? 'opacity-100' : 'opacity-0'} line-clamp-2 w-[120px] pt-2 text-white transition-opacity duration-500`}
      >
        {cast.original_name}
      </p>
    </div>
  );
};

export default CastTile;
