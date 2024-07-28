import { BASE_IMAGE_URL } from '@/config/settings';
import { Result } from '@/modules/data/model/trending-all';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { widthCatalogTrending, widthCatalogTrendingTailwind } from '@/styles/style-values';
import { MediaType } from '@/modules/data/model/media-type';

const CatalogTrending = ({
  media,
  mediaSelected,
  onClick,
}: {
  media: Result;
  mediaSelected: Result;
  onClick: () => void;
}) => {
  const isMovie = media.media_type === MediaType.Movie;
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div
        className={`flex ${widthCatalogTrendingTailwind} ${mediaSelected.id == media.id ? 'scale-110' : ''} flex-shrink-0 cursor-pointer flex-col items-center justify-center transition-transform ${loaded ? 'hover:scale-110' : ''}`}
        onFocus={() => {
          console.log(media.title);
        }}
        onClick={onClick}
      >
        <Image
          width={widthCatalogTrending}
          height={225}
          src={`${BASE_IMAGE_URL}${media.poster_path}`}
          alt={`${BASE_IMAGE_URL}${media.poster_path}`}
          className={`${loaded ? 'opacity-100' : 'opacity-0'} flex bg-white transition-opacity duration-300`}
          onLoad={async () => {
            setLoaded(true);
          }}
        />

        <p
          className={`${loaded ? 'opacity-100' : 'opacity-0'} ${widthCatalogTrendingTailwind} !line-clamp-2 flex justify-start overflow-hidden text-ellipsis pt-2 text-start align-bottom text-xs font-bold text-white transition-opacity duration-300`}
        >
          {isMovie ? media.title : media.name}{' '}
        </p>
      </div>
    </>
  );
};

export default CatalogTrending;

/*  {!loaded && (
          <>
            <Skeleton
              sx={{ bgcolor: 'grey.800' }}
              variant='rectangular'
              width={150}
              height={225}
              className='absolute top-5'
            />
            <Skeleton
              sx={{ bgcolor: 'grey.800' }}
              height={25}
              width={150}
              className='absolute bottom-5'
              variant='rectangular'
            />
          </>
        )}
       
         */
