import { Leaderboarder } from '@/modules/data/model/leaderboard';
import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import { LeaderboardType } from '@/utils/enums';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { CircularProgress } from '@nextui-org/progress';
import { useTranslations } from 'next-intl';
import { use, useEffect, useRef, useState } from 'react';
import ButtonChild from './child/button-child';
import LeaderboardTile from './child/leaderboard-tile';

const LeaderboardComponent = ({
  moveToTop,
}: {
  moveToTop: () => void;
}) => {
  const [listLeaderboard, setListLeaderboard] = useState<
    Leaderboarder[] | null
  >(null);
  const context = use(MovieAndTvShowContext);
  const t = useTranslations('metadata');
  const leaderboardTranslation =
    useTranslations('leaderboard');
  const itemSelected = useRef<LeaderboardType>(0);
  const [isLoading, setIsLoading] = useState(true);
  const useAgentData = useUserAgentData();
  const fetchData = async () => {
    const data =
      await context!.getLeaderboardUseCase.execute(
        t('language'),
        itemSelected.current
      );

    setIsLoading(false);
    setListLeaderboard(data);
    moveToTop();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Table
      stickyHeader
      aria-label='leaderboard'
      className=''
    >
      <TableHead>
        <TableRow className=''>
          <TableCell
            align='center'
            colSpan={6}
            className='!m-0 border-b-slate-700 !p-0'
          >
            <div className='flex flex-col overflow-hidden !border-0 !border-b-transparent bg-slate-900 !p-0'>
              <p className='justify-center p-6 text-center text-2xl font-bold text-slate-200'>
                {leaderboardTranslation('title')}
              </p>
              <div className='flex flex-row gap-6 px-4 pb-4'>
                <ButtonChild
                  title={leaderboardTranslation(
                    'mostPopular'
                  )}
                  isSelected={itemSelected.current == 0}
                  disabled={isLoading}
                  onClick={() => {
                    if (!isLoading) {
                      setIsLoading(true);
                      itemSelected.current = 0;

                      fetchData();
                    }
                  }}
                />
                <ButtonChild
                  title={leaderboardTranslation(
                    'mostRated'
                  )}
                  isSelected={itemSelected.current == 1}
                  disabled={isLoading}
                  onClick={() => {
                    if (!isLoading) {
                      setIsLoading(true);

                      itemSelected.current = 1;
                      fetchData();
                    }
                  }}
                />
                <ButtonChild
                  title={leaderboardTranslation('upcoming')}
                  isSelected={itemSelected.current == 2}
                  disabled={isLoading}
                  onClick={() => {
                    setIsLoading(true);

                    itemSelected.current = 2;
                    fetchData();
                  }}
                />
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableHead>

      {isLoading ? (
        <TableBody>
          <TableRow>
            <td>
              <div className='flex h-[759px] flex-1 justify-center text-center'>
                <CircularProgress
                  size='lg'
                  color='warning'
                  className=''
                  aria-label='loading...'
                />
              </div>
            </td>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody>
          {listLeaderboard?.map((item) => (
            <TableRow key={item.id}>
              <div className='flex flex-col gap-4 p-4'>
                <LeaderboardTile
                  media={item}
                  position={
                    listLeaderboard.indexOf(item) + 1
                  }
                  isUpcoming={itemSelected.current == 2}
                />
              </div>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};

export default LeaderboardComponent;
