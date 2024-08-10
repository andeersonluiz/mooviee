import { BASE_IMAGE_URL } from '@/config/settings';
import { MediaType } from '@/modules/data/model/media-type';
import { Result } from '@/modules/data/model/trending-all';
import {
  widthCatalogTrending,
  widthCatalogTrendingTailwind,
} from '@/styles/style-values';
import Image from 'next/image';
import { useState } from 'react';

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
