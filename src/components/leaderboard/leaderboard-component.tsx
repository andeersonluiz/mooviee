import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ButtonChild from './child/button-child';
import { use, useEffect, useRef, useState } from 'react';
import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';
import { LeaderboardType } from '@/utils/enums';
import { useTranslations } from 'next-intl';
import { Leaderboarder } from '@/modules/data/model/leaderboard';
import LeaderboardTile from './child/leaderboard-tile';
import { CircularProgress } from '@nextui-org/progress';
import { isNull } from 'util';
import { getDeviceType } from '@/utils/ssr_functions';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';

const LeaderboardComponent = ({ moveToTop }: { moveToTop: () => void }) => {
  const [listLeaderboard, setListLeaderboard] = useState<Leaderboarder[] | null>(null);
  const context = use(MovieAndTvShowContext);
  const t = useTranslations('metadata');
  const leaderboardTranslation = useTranslations('leaderboard');
  const itemSelected = useRef<LeaderboardType>(0);
  const [isLoading, setIsLoading] = useState(true);
  const useAgentData = useUserAgentData();
  const fetchData = async () => {
    const data = await context!.getLeaderboardUseCase.execute(t('language'), itemSelected.current);

    setIsLoading(false);
    setListLeaderboard(data);
    moveToTop();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Table stickyHeader aria-label='leaderboard' className=''>
      <TableHead>
        <TableRow className=''>
          <TableCell align='center' colSpan={6} className='!m-0 border-b-slate-700 !p-0'>
            <div className='flex flex-col overflow-hidden !border-0 !border-b-transparent bg-slate-900 !p-0'>
              <p className='justify-center p-6 text-center text-2xl font-bold text-slate-200'>
                {leaderboardTranslation('title')}
              </p>
              <div className='flex flex-row gap-6 px-4 pb-2'>
                <ButtonChild
                  title={leaderboardTranslation('mostPopular')}
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
                  title={leaderboardTranslation('mostRated')}
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
              <div className='flex h-[757.5px] flex-1 justify-center text-center'>
                <CircularProgress size='lg' color='warning' className='' aria-label='loading...' />
              </div>
            </td>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody className='flex flex-col gap-4 p-4'>
          {listLeaderboard?.map((item) => {
            return (
              <TableRow key={item.id}>
                <LeaderboardTile
                  media={item}
                  position={listLeaderboard.indexOf(item) + 1}
                  isUpcoming={itemSelected.current == 2}
                />
              </TableRow>
            );
          })}
        </TableBody>
      )}
    </Table>
  );
};

export default LeaderboardComponent;
