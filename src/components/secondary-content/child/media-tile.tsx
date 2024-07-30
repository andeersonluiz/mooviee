import { BASE_IMAGE_URL } from '@/config/settings';
import { widthCatalogTrending, widthCatalogTrendingTailwind } from '@/styles/style-values';
import { durationBanner } from '@/utils/transitions-data';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MediaType } from '@/modules/data/model/media-type';
import { useTranslations } from 'next-intl';
import { convertDateToLocal } from '@/utils/functions';

const MediaTile = ({
  media,
  onClick,
  isMovie,
  isUpcoming = false,
}: {
  media: any;
  onClick: () => void;
  isMovie: boolean;
  isUpcoming?: boolean;
}) => {
  const [loaded, setLoaded] = useState(false);
  const common = useTranslations('common');
  const t = useTranslations('metadata');
  const date = isMovie ? new Date(media.release_date) : new Date(media.first_air_date);
  return (
    <div
      className={`flex flex-col rounded-md p-3 ${loaded ? 'hover:bg-neutral-800' : ''} cursor-pointer transition-all duration-300`}
    >
      <div
        className={`flex ${widthCatalogTrendingTailwind} flex-shrink-0 flex-col items-center justify-start`}
        onClick={onClick}
      >
        <Image
          width={widthCatalogTrending}
          height={225}
          src={`${BASE_IMAGE_URL}${media.poster_path}`}
          alt={`${BASE_IMAGE_URL}${media.poster_path}`}
          className={`${loaded ? 'opacity-100' : 'opacity-0'} flex h-[225px] transition-opacity duration-300`}
          onLoad={async () => {
            setLoaded(true);
          }}
        />
        <div className='bg-red- mt-2 flex flex-1 items-start justify-center'>
          <p
            className={`${loaded ? 'opacity-100' : 'opacity-0'} ${widthCatalogTrendingTailwind} bg-red- my-2 !line-clamp-2 flex overflow-hidden text-ellipsis p-1 text-start text-xs font-bold text-white transition-opacity duration-300`}
          >
            {isMovie ? media.title : media.name}
          </p>
        </div>
      </div>
      <div className='line-clamp-1 flex w-full flex-1 items-end justify-end py-2 text-end text-sm font-thin text-slate-200'>
        {isUpcoming ? (
          <div className='flex flex-1 overflow-hidden text-ellipsis'>
            <p className='line-clamp-1 flex flex-1'>
              {`${isMovie ? common('movie_tag') : common('serie_tag')}`}
            </p>
            <span className={`flex ${isUpcoming ? 'font-semibold' : ''}`}>
              {isUpcoming ? convertDateToLocal(date, t('language')) : date.getFullYear()}
            </span>
          </div>
        ) : (
          <p className='bg-gray- line-clamp-1 flex flex-1 overflow-hidden text-ellipsis'>
            {`${date.getFullYear()} • ${isMovie ? common('movie_tag') : common('serie_tag')}`}
          </p>
        )}

        {!isUpcoming && (
          <>
            <span className='pr-[2px] font-semibold'>{media.vote_average.toFixed(2)}</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='gray'
              className='size-5'
            >
              <path
                fillRule='evenodd'
                d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                clipRule='evenodd'
                mask='url(#half-fill)'
              />
            </svg>
          </>
        )}
      </div>
    </div>
  );
};

export default MediaTile;
/*<div  className='flex h-[300px] w-[150px] flex-shrink-0 bg-slate-900'>
            <p className='w-full content-center text-center text-xl text-white'>
              {item.media_type == MediaType.Movie ? item.title : item.name}
            </p>
          </div>*/
