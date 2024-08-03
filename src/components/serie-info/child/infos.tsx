import { SerieInfo } from '@/modules/data/model/serie-info';
import { convertDateToLocal, convertRunTime } from '@/utils/functions';
import { useTranslations } from 'next-intl';

const InfosSerie = ({ serie }: { serie: SerieInfo }) => {
  const tSerieInfo = useTranslations('serieInfo');
  const t = useTranslations('metadata');

  return (
    <>
      <div className='flex flex-col gap-3'>
        <p className='text-lg font-semibold text-white'> {tSerieInfo('genres')}</p>
        <div className='flex flex-wrap gap-4'>
          {serie.genres!.map((item) => (
            <div className='h-fit w-fit cursor-pointer rounded-lg border-1 border-slate-200 p-[6px] text-sm text-slate-200 hover:border-gray-400 hover:bg-gray-600'>
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <p className='text-lg font-semibold text-white'> {tSerieInfo('status')} </p>
        <p className='text-slate-200'> {serie.status!}</p>
      </div>
      {serie.next_episode_to_air && (
        <div className='flex flex-col gap-3'>
          <p className='text-lg font-semibold text-white'> {tSerieInfo('lastEpisode')}</p>
          <p className='text-slate-200'>{`${serie.next_episode_to_air.season_number}x${serie.next_episode_to_air.episode_number} (${convertDateToLocal(new Date(serie.next_episode_to_air.air_date), t('language'))})`}</p>
        </div>
      )}
    </>
  );
};

export default InfosSerie;
