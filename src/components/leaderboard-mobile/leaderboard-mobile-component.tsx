import { Leaderboarder } from '@/modules/data/model/leaderboard';
import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';
import { LeaderboardType } from '@/utils/enums';
import { CircularProgress } from '@nextui-org/progress';
import { useTranslations } from 'next-intl';
import { use, useEffect, useRef, useState } from 'react';
import HeaderMediaList from '../secondary-content/child/header-media-list';
import ListMediaLeadboarder from './child/list-media-leaderboard';

const LeaderboardMobileComponent = () => {
  const [listLeaderboard, setListLeaderboard] = useState<
    Leaderboarder[] | null
  >(null);
  const context = use(MovieAndTvShowContext);
  const t = useTranslations('metadata');
  const leaderboardTranslation =
    useTranslations('leaderboard');
  const itemSelected = useRef<LeaderboardType>(0);
  const tableRef = useRef<HTMLTableElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mostPopular, setMostPopular] = useState<
    Leaderboarder[] | null
  >(null);
  const [mostRated, setMostRated] = useState<
    Leaderboarder[] | null
  >(null);
  const [nowPlaying, setNowPlaying] = useState<
    Leaderboarder[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      const dataMostPopularPromise =
        context!.getLeaderboardUseCase.execute(
          t('language'),
          0
        );
      const dataMostRatedPromise =
        context!.getLeaderboardUseCase.execute(
          t('language'),
          1
        );
      const dataNowPlayingPromise =
        context!.getLeaderboardUseCase.execute(
          t('language'),
          2
        );
      const [
        dataMostPopular,
        dataMostRated,
        dataNowPlaying,
      ] = await Promise.all([
        dataMostPopularPromise,
        dataMostRatedPromise,
        dataNowPlayingPromise,
      ]);
      setMostPopular(dataMostPopular);
      setMostRated(dataMostRated);
      setNowPlaying(dataNowPlaying);
      console.log(dataMostPopular);
      console.log(dataMostRated);
      console.log(dataNowPlaying);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    var data = await context!.getLeaderboardUseCase.execute(
      t('language'),
      itemSelected.current
    );
    setIsLoading(false);
    setListLeaderboard(data);
  };

  useEffect(() => {
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
          <p
            className={`content-center py-8 text-center text-2xl font-bold text-white`}
          >
            {leaderboardTranslation('title')}
          </p>
          <hr className='mx-8'></hr>
          <div className='pt-8'>
            <HeaderMediaList
              title={leaderboardTranslation('mostPopular')}
            />
          </div>
          <ListMediaLeadboarder data={mostPopular} />

          <HeaderMediaList
            title={leaderboardTranslation('mostRated')}
          />
          <ListMediaLeadboarder data={mostRated} />

          <HeaderMediaList
            title={leaderboardTranslation('upcoming')}
          />
          <ListMediaLeadboarder
            data={nowPlaying}
            isUpcoming={true}
          />
        </>
      )}
    </>
  );
};

export default LeaderboardMobileComponent;
