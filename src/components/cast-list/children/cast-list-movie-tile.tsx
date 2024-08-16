import { BASE_IMAGE_URL } from '@/config/settings';
import { Cast } from '@/modules/data/model/movie-info';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import placeholder from '../../../../assets/placeholder.png';

const CastListMovieTile = ({
  cast,
  isCrew = false,
}: {
  cast: Cast;
  isCrew?: boolean;
}) => {
  const [src, setSrc] = useState(
    `${BASE_IMAGE_URL}${cast.profile_path}`
  );
  const [isLoading, setIsLoading] = useState(true);
  const tCastList = useTranslations('castList');
  const userAgentInfo = useUserAgentData();
  return (
    <div
      className={` ${isLoading ? 'opacity-0' : 'opacity-100'} mx-8 flex h-[120px] ${userAgentInfo.isMobile ? 'w-[300px]' : 'w-[400px]'} flex-row items-center px-4 py-1 transition-all duration-200 hover:bg-neutral-800`}
    >
      <Image
        src={src}
        alt={src}
        width={85}
        height={85}
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => {
          setSrc(placeholder.src);
        }}
        className='flex h-[85px] w-[85px] bg-cover object-cover'
      />
      <div className='flex flex-1 flex-col content-start items-start justify-start gap-2 px-2 text-start'>
        <p className='line-clamp-2 overflow-ellipsis px-2 text-base font-semibold text-white'>
          {cast.original_name}
        </p>
        <p className='line-clamp-2 overflow-ellipsis px-2 text-sm text-white'>
          {isCrew
            ? `${tCastList('department')} ${tCastList(cast.department)}`
            : `${tCastList('character')} ${cast.character}`}
        </p>
      </div>
    </div>
  );
};
export default CastListMovieTile;
