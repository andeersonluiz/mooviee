import { Genre } from '@/modules/data/model/serie-info';
import { MediaType, Result } from '@/modules/data/model/trending-all';
import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';
import { durationBanner } from '@/utils/transitions-data';
import { useTranslations } from 'next-intl';
import { use, useEffect, useRef, useState } from 'react';

const ItemBanner = ({ media }: { media: Result }) => {
  const isMovie = media.media_type === MediaType.Movie;
  const context = use(MovieAndTvShowContext);
  const t = useTranslations('metadata');
  const [genres, setGenres] = useState<Genre[]>([]);
  const t_common = useTranslations('common');
  const [isLoaded, setIsLoaded] = useState(false);
  console.log('render ItemBanner');
  useEffect(() => {
    console.log('mudei', isLoaded);
    setTimeout(() => {
      setIsLoaded(true);
    }, durationBanner);
    return () => {
      setIsLoaded(false);
    };
  }, [media]);

  useEffect(() => {
    const fetchData = async () => {
      const genreListData = await context!.getGenreListUseCase.execute(t('language'));
      setGenres(genreListData!);
    };
    fetchData();
  }, []);

  return (
    <div
      className={`${isLoaded ? 'opacity-100' : 'opacity-0'} absolute top-28 mx-8 block w-[700px] items-start transition-opacity duration-1000 lg:mx-10 xl:mx-32 2xl:mx-48`}
    >
      <div className='h-16'>
        <h1 className='auto-a line-clamp-3 p-2 text-5xl font-bold text-white'>
          {isMovie ? media.title.toUpperCase() : media.name.toUpperCase()}
        </h1>
        <p className='p-3 text-base font-semibold text-white'>
          {` ${isMovie ? new Date(media.release_date).getFullYear() : new Date(media.first_air_date).getFullYear()} | ${isMovie ? 'Movie' : 'Serie'} | ${media.genre_ids
            .map((item: any) => {
              const res = genres?.find((genre) => genre.id == Number(item));
              if (res) {
                return res.name;
              }
            })
            .join(', ')}`}
        </p>
        <p className='line-clamp-5 text-ellipsis px-3 pt-2 text-lg text-white'>{media.overview}</p>
        <button className='mx-2 my-8 rounded-lg bg-red-600 px-4 py-5 text-sm font-normal text-white transition hover:bg-red-700 focus:outline-none'>
          {t_common('btnMoreInfo')}
        </button>
      </div>
    </div>
  );
};

export default ItemBanner;
