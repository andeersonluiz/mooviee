import { useTranslations } from 'next-intl';
import TrendingWeek from './child/list-media-content';
import { MovieListType, SerieListType, TrendingType } from '@/utils/enums';
import { TrendingAll } from '@/modules/data/model/trending-all';
import { use, useEffect, useRef, useState } from 'react';
import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';
import ListMedia from './child/list-media-content';
import { MovieList } from '@/modules/data/model/movie-list';
import { SerieList } from '@/modules/data/model/serie-list';
import { CircularProgress } from '@nextui-org/progress';

const SecondaryContent = () => {
  const t_common = useTranslations('common');
  const context = use(MovieAndTvShowContext)!;
  const t = useTranslations('metadata');

  const [trendingData, setTrendingData] = useState<TrendingAll | null>(null);
  const [episodesNextWeekData, setEpisodesNextWeekData] = useState<SerieList | null>(null);
  const [nowPlayingData, setNowPlayingData] = useState<MovieList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      var dataTrending = await context?.getTrendingAllUseCase.execute(
        t('language'),
        TrendingType.WEEK
      );
      var dataNowPlaying = await context?.getMoviesUseCase.execute(
        t('language'),
        MovieListType.NOW_PLAYING
      );
      var dataNextWeek = await context?.getSeriesUseCase.execute(
        t('language'),
        SerieListType.ON_THE_AIR
      );
      const [dataTrend, dataPlaying, dataWeek] = await Promise.all([
        dataTrending,
        dataNowPlaying,
        dataNextWeek,
      ]);

      setTrendingData(dataTrend);
      setNowPlayingData(dataPlaying);
      setEpisodesNextWeekData(dataWeek);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className='flex h-[995px] flex-1 justify-center text-center'>
          <CircularProgress size='lg' color='warning' className='' aria-label='loading...' />
        </div>
      ) : (
        <>
          <p className={`px-9 pt-8 text-xl font-bold text-white`}>{t_common('trendingWeek')}</p>
          <ListMedia data={trendingData} />
          <p className='px-9 pt-0 text-xl font-bold text-white'>{t_common('episodesNextWeek')}</p>
          <ListMedia data={episodesNextWeekData} mediaType={episodesNextWeekData?.media_type} />
          <p className='px-9 pt-0 text-xl font-bold text-white'>{t_common('nowPlaying')}</p>
          <ListMedia data={nowPlayingData} mediaType={nowPlayingData?.media_type} />
        </>
      )}
    </>
  );
};

export default SecondaryContent;
