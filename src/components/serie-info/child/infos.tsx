import { SerieInfo } from '@/modules/data/model/serie-info';
import { Status } from '@/utils/enums';
import {
  convertDateToLocal,
  getEnumKeyByValue,
} from '@/utils/functions';
import { useTranslations } from 'next-intl';

const InfosSerie = ({ serie }: { serie: SerieInfo }) => {
  const tSerieInfo = useTranslations('serieInfo');
  const tStatus = useTranslations('status');

  const t = useTranslations('metadata');

  return (
    <>
      {serie.genres.length != 0 && (
        <div className='flex flex-col gap-3'>
          <p className='pb-2 text-xl font-semibold text-white'>
            {tSerieInfo('genres')}
          </p>
          <div className='flex flex-wrap gap-4'>
            {serie.genres!.map((item) => (
              <div
                key={item.name}
                className='0 h-fit w-fit cursor-default rounded-lg border-1 border-slate-200 p-[6px] text-sm text-slate-200'
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {serie.status && (
        <div className='flex flex-col gap-3'>
          <p className='text-xl font-semibold text-white'>
            {' '}
            {tSerieInfo('status')}{' '}
          </p>
          <p className='text-slate-200'>
            {tStatus(
              getEnumKeyByValue(Status, serie.status)
            )}
          </p>
        </div>
      )}
      {serie.next_episode_to_air && (
        <div className='flex flex-col gap-3'>
          <p className='text-xl font-semibold text-white'>
            {' '}
            {tSerieInfo('lastEpisode')}
          </p>
          <p className='text-slate-200'>{`${serie.next_episode_to_air.season_number}x${serie.next_episode_to_air.episode_number} (${convertDateToLocal(new Date(serie.next_episode_to_air.air_date), t('language'))})`}</p>
        </div>
      )}
    </>
  );
};

export default InfosSerie;
