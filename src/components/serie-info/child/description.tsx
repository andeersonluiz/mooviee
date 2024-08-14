import { SerieInfo } from '@/modules/data/model/serie-info';
import { convertRunTime } from '@/utils/functions';
import { useTranslations } from 'next-intl';

const DescriptionSerie = ({
  serie,
}: {
  serie: SerieInfo;
}) => {
  const tSerieInfo = useTranslations('serieInfo');
  console.log(serie.episode_run_time);
  return (
    <div className=''>
      <p className='px-8 pb-4 pt-8 text-3xl font-bold text-white'>{`${serie.name}${serie.first_air_date != '' ? ` (${new Date(serie.first_air_date).getFullYear()})` : ''} `}</p>
      <div className='flex flex-wrap items-center gap-4 px-8'>
        {serie.certification_value && (
          <div className='w-fit rounded-lg border-1 border-slate-200 p-1 text-center text-sm text-slate-200'>
            {serie.certification_value}
          </div>
        )}
        {serie.episode_run_time.length != 0 && (
          <p className='text-sm text-slate-200'>
            {convertRunTime(serie.episode_run_time[0])}
          </p>
        )}
        {serie.number_of_seasons && (
          <p className='text-sm text-slate-200'>
            {tSerieInfo('seasons')}{' '}
            {serie.number_of_seasons}
          </p>
        )}
        {serie.number_of_episodes && (
          <p className='text-sm text-slate-200'>
            {tSerieInfo('episodes')}{' '}
            {serie.number_of_episodes}
          </p>
        )}
        {serie.vote_average == 0 ? (
          <></>
        ) : (
          <div className='flex flex-row gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='rgb(226 232 240)'
              className='size-5'
            >
              <path
                fillRule='evenodd'
                d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                clipRule='evenodd'
                mask='url(#half-fill)'
              />
            </svg>
            <p className='text-sm text-slate-200'>
              {serie.vote_average.toFixed(2)}
            </p>
          </div>
        )}
      </div>
      <div className='p-8'>
        <p className='text-slate-200'>
          {serie.overview == ''
            ? tSerieInfo('noOverview')
            : serie.overview}
        </p>
      </div>
    </div>
  );
};

export default DescriptionSerie;
