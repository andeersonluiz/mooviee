import { MovieList } from '@/modules/data/model/movie-list';
import { SerieList } from '@/modules/data/model/serie-list';
import { TrendingAll } from '@/modules/data/model/trending-all';
import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';
import {
  MovieListType,
  SerieListType,
  TagType,
  TrendingType,
} from '@/utils/enums';
import { CircularProgress } from '@nextui-org/progress';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import HeaderMediaList from './child/header-media-list';
import ListMedia from './child/list-media-content';

const SecondaryContent = () => {
  const t_common = useTranslations('common');
  const context = use(MovieAndTvShowContext)!;
  const t = useTranslations('metadata');

  const [trendingData, setTrendingData] =
    useState<TrendingAll | null>(null);
  const [episodesNextWeekData, setEpisodesNextWeekData] =
    useState<SerieList | null>(null);
  const [nowPlayingData, setNowPlayingData] =
    useState<MovieList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const dataTrending =
        await context?.getTrendingAllUseCase.execute(
          t('language'),
          TrendingType.WEEK
        );
      const dataNowPlaying =
        await context?.getMoviesUseCase.execute(
          t('language'),
          MovieListType.NOW_PLAYING
        );
      const dataNextWeek =
        await context?.getSeriesUseCase.execute(
          t('language'),
          SerieListType.ON_THE_AIR
        );
      const [dataTrend, dataPlaying, dataWeek] =
        await Promise.all([
          dataTrending,
          dataNowPlaying,
          dataNextWeek,
        ]);

      setTrendingData(dataTrend);
      setEpisodesNextWeekData(dataWeek);
      setNowPlayingData(dataPlaying);

      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className='flex h-[995px] flex-1 justify-center text-center'>
          <CircularProgress
            size='lg'
            color='warning'
            className=''
            aria-label='loading...'
          />
        </div>
      ) : (
        <>
          <div className='pt-4'>
            <HeaderMediaList
              title={t_common('trendingWeek')}
              viewAll={() =>
                router.push(
                  `/${t('language_split')}/${TagType.TRENDING}`
                )
              }
            />
          </div>
          <ListMedia data={trendingData} />

          <HeaderMediaList
            title={t_common('episodesNextWeek')}
            viewAll={() =>
              router.push(
                `/${t('language_split')}/${TagType.NEXT_WEEK}`
              )
            }
          />
          <ListMedia
            data={episodesNextWeekData}
            mediaType={episodesNextWeekData?.media_type}
          />

          <HeaderMediaList
            title={t_common('nowPlaying')}
            viewAll={() =>
              router.push(
                `/${t('language_split')}/${TagType.NOW_PLAYING}`
              )
            }
          />
          <ListMedia
            data={nowPlayingData}
            mediaType={nowPlayingData?.media_type}
          />
        </>
      )}
    </>
  );
};

export default SecondaryContent;
