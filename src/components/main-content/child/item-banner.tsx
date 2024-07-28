import { Genre } from '@/modules/data/model/serie-info';
import { Result } from '@/modules/data/model/trending-all';
import {
  GenreContext,
  MovieAndTvShowContext,
} from '@/modules/presentation/provider/movies-tv-show-provider';
import { formatGenres } from '@/utils/functions';
import { durationBanner } from '@/utils/transitions-data';
import { useTranslations } from 'next-intl';
import { use, useEffect, useRef, useState } from 'react';
import { MediaType } from '@/modules/data/model/media-type';

const ItemBanner = ({ media }: { media: Result }) => {
  const isMovie = media.media_type === MediaType.Movie;
  const contextGenre = use(GenreContext)!;
  const genres = contextGenre.listGenres;
  const t_common = useTranslations('common');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, durationBanner);
    return () => {
      setIsLoaded(false);
    };
  }, [media]);

  return (
    <div
      id='banner_id'
      className={`${isLoaded ? 'opacity-100' : 'opacity-0'} absolute top-28 mx-8 block w-[90%] max-w-[700px] items-start transition-opacity duration-1000 lg:mx-10 xl:mx-32 2xl:mx-48`}
    >
      <div className=''>
        <h1 className='line-clamp-3 overflow-hidden text-ellipsis p-2 text-3xl font-bold text-white md:text-4xl xl:text-5xl'>
          {isMovie ? media.title.toUpperCase() : media.name.toUpperCase()}
        </h1>
        <p className='m-3 line-clamp-3 text-base font-semibold text-white'>
          {` ${isMovie ? new Date(media.release_date).getFullYear() : new Date(media.first_air_date).getFullYear()} | ${isMovie ? 'Movie' : 'Serie'} | ${genres == null ? '' : formatGenres(media.genre_ids, genres)}`}
        </p>
        <p className='mx-3 line-clamp-5 overflow-hidden text-ellipsis pt-2 text-lg text-white'>
          {media.overview}
        </p>
        <button className='mx-2 my-8 rounded-lg bg-red-600 px-4 py-5 text-sm font-normal text-white transition hover:bg-red-700 focus:outline-none'>
          {t_common('btnMoreInfo')}
        </button>
      </div>
    </div>
  );
};

export default ItemBanner;
