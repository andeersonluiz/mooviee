import DivTile from '@/components/custom-tags/divTile';
import { BASE_IMAGE_URL } from '@/config/settings';
import { Leaderboarder } from '@/modules/data/model/leaderboard';
import { MediaType } from '@/modules/data/model/media-type';
import { GenreContext } from '@/modules/presentation/provider/movies-tv-show-provider';
import {
  convertDateToLocal,
  formatGenres,
} from '@/utils/functions';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';

const LeaderboardTile = ({
  media,
  position,
  isUpcoming = true,
}: {
  media: Leaderboarder;
  position: number;
  isUpcoming?: boolean;
}) => {
  const isMovie = media.media_type == MediaType.Movie;
  const context = use(GenreContext)!;
  const t = useTranslations('metadata');
  const leaderboardTranslation =
    useTranslations('leaderboard');

  const genres = context.listGenres;
  const numbersSplited = position.toString().split('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);

    () => {
      setIsLoading(true);
    };
  }, [media]);

  return (
    <td>
      <DivTile
        path={`/${t('language_split')}/${isMovie ? 'movie' : 'serie'}/${media.id}`}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} flex cursor-pointer flex-row transition-opacity duration-300`}
      >
        {numbersSplited.length == 1 ? (
          <p className='pointer-events-none content-center px-4 pr-8 text-center align-middle text-[50px] font-bold text-slate-300'>
            {numbersSplited[0]}
          </p>
        ) : (
          <div className='pointer-events-none flex flex-col px-4 pr-8'>
            <p
              className={`-mb-2 content-center text-center align-middle text-[50px] font-bold text-slate-300`}
            >
              {numbersSplited[0]}
            </p>
            <p
              className={`-mt-2 content-center text-center align-middle text-[50px] font-bold text-slate-300`}
            >
              {numbersSplited[1]}
            </p>
          </div>
        )}

        <Image
          src={`${BASE_IMAGE_URL}${media.poster_path}`}
          alt={`${BASE_IMAGE_URL}${media.poster_path}`}
          width={100}
          height={150}
          loading='eager'
        ></Image>

        <div className='flex h-[150px] flex-col'>
          <p className='line-clamp-2 w-full justify-center justify-items-center overflow-hidden text-ellipsis px-4 !align-middle text-lg text-slate-100'>
            {isMovie ? media.title : media.name}
          </p>
          <div className='flex flex-1'>
            <div className='ml-4 mt-2 h-fit w-fit justify-center rounded-xl px-3 py-[2px] !text-[11px] text-slate-400 outline outline-1 outline-slate-400'>
              <p>
                {isMovie
                  ? leaderboardTranslation('movie_tag')
                  : leaderboardTranslation('serie_tag')}
              </p>
            </div>
          </div>
          <p className='mt-[10px] line-clamp-1 w-full overflow-hidden text-ellipsis px-4 text-start !align-middle text-xs font-light text-slate-200'>
            <span className='content-center font-bold'>
              {leaderboardTranslation('genres')}{' '}
            </span>
            <span className='content-center'>
              {genres == null
                ? ''
                : formatGenres(media.genre_ids, genres)
                      .length == 0
                  ? '-'
                  : formatGenres(
                      media.genre_ids,
                      genres
                    ).join(', ')}
            </span>
          </p>
          {isUpcoming ? (
            <div className='mb-1 flex w-fit flex-1 items-end overflow-hidden text-ellipsis whitespace-nowrap pl-4 text-end !align-middle text-sm font-light text-slate-200'>
              <span className=''>
                {leaderboardTranslation('upcomingDate')}
              </span>
              <span className='px-1 font-semibold'>
                {convertDateToLocal(
                  isMovie
                    ? media.release_date
                    : media.first_air_date,
                  t('language')
                )}
              </span>
            </div>
          ) : (
            <div className='line-clamp-1 flex flex-1 items-end px-4 pb-1 text-end text-sm font-thin text-slate-200'>
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
              <span className='flex flex-1 px-1 font-semibold'>
                {media.vote_average.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </DivTile>
    </td>
  );
};

export default LeaderboardTile;
