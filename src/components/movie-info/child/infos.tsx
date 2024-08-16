import { MovieInfo } from '@/modules/data/model/movie-info';
import { Status } from '@/utils/enums';
import { getEnumKeyByValue } from '@/utils/functions';
import { useTranslations } from 'next-intl';

const InfosMovie = ({ movie }: { movie: MovieInfo }) => {
  const tMovieInfo = useTranslations('movieInfo');
  const tStatus = useTranslations('status');

  const t = useTranslations('metadata');

  return (
    <>
      {movie.genres.length != 0 && (
        <div className='flex flex-col gap-3'>
          <p className='pb-2 text-xl font-semibold text-white'>
            {tMovieInfo('genres')}
          </p>
          <div className='flex flex-wrap gap-4'>
            {movie.genres!.map((item) => (
              <div
                key={item.name}
                className='h-fit w-fit cursor-default rounded-lg border-1 border-slate-200 p-[6px] text-sm text-slate-200'
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {movie.status && (
        <div className='flex flex-col gap-3'>
          <p className='text-xl font-semibold text-white'>
            {' '}
            {tMovieInfo('status')}
          </p>
          <p className='text-slate-200'>
            {tStatus(
              getEnumKeyByValue(Status, movie.status)
            )}
          </p>
        </div>
      )}
      {movie.budget != 0 && (
        <div className='flex flex-col gap-3'>
          <p className='text-xl font-semibold text-white'>
            {tMovieInfo('budget')}
          </p>
          <p className='text-slate-200'>
            {movie.budget.toLocaleString(t('language'), {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
        </div>
      )}
    </>
  );
};

export default InfosMovie;
