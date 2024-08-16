'use client';

import CastListMovieTile from '@/components/cast-list/children/cast-list-movie-tile';
import FooterContent from '@/components/footer/footer-content';
import HeaderMobileComponent from '@/components/header-mobile/header-mobile-component';
import HeaderComponent from '@/components/header/header-component';
import LoadingPage from '@/components/loading/loading-page';
import useResize from '@/hooks/resize';
import { MovieInfo } from '@/modules/data/model/movie-info';
import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import {
  generateCrewTags,
  removeDuplicatesById,
} from '@/utils/functions';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const CastListPage: React.FC = () => {
  const { id } = useParams();
  const context = useContext(MovieAndTvShowContext)!;
  const userAgentData = useUserAgentData();
  const tCastList = useTranslations('castList');
  const t = useTranslations('metadata');
  const router = useRouter();
  const [movie, setMovies] = useState<MovieInfo | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [listCrewTags, setListCrewTags] = useState<
    string[]
  >([]);

  useResize();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result =
          await context.getMovieInfoUseCase.execute(
            Number(id),
            t('language')
          );
        setListCrewTags(
          generateCrewTags(
            result?.credits.crew == null
              ? []
              : result?.credits.crew
          )
        );
        window.document.title = `Movieee - ${result?.title} (${tCastList('cast')})`;

        setMovies(result);

        setIsLoading(false);
      } catch (e) {
        router.push(`/${t('language_split')}`);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className='flex min-h-screen flex-col'>
      {userAgentData.isMobile ? (
        <HeaderMobileComponent selectedIndex={-1} />
      ) : (
        <HeaderComponent selectedIndex={-1} />
      )}

      <main
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} flex flex-1 flex-col transition-opacity duration-500`}
      >
        <p className='p-8 text-center text-4xl font-bold text-white'>
          {tCastList('cast')}:{` ${movie?.title}`}
        </p>

        <div
          className={`${userAgentData.isDesktop ? 'flex-row' : 'flex-col'} flex h-full`}
        >
          <div className='flex flex-1 flex-col'>
            <p className='px-12 py-4 text-start text-2xl font-bold text-white'>
              {tCastList('cast')}
            </p>

            <div className='flex flex-wrap py-2'>
              {movie?.credits.cast.length == 0 ? (
                <p className='px-12 text-lg text-white'>
                  {tCastList('noCastInfo')}
                </p>
              ) : (
                movie?.credits.cast.map((cast) => (
                  <div className='' key={cast.id}>
                    <CastListMovieTile cast={cast} />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className='flex flex-1 flex-col'>
            <p className='px-12 py-4 text-start text-2xl font-bold text-white'>
              {tCastList('crew')}
            </p>
            {listCrewTags.length == 0 ? (
              <p className='px-12 py-2 text-lg text-white'>
                {tCastList('noCrewInfo')}
              </p>
            ) : (
              listCrewTags.map((tag) => (
                <div key={tag}>
                  <p className='px-12 text-start text-lg font-semibold text-white'>
                    {tCastList(tag)}
                  </p>
                  <div className='flex flex-wrap py-2'>
                    {removeDuplicatesById(
                      movie?.credits.crew.filter(
                        (item) => item.department == tag
                      )
                    ).map((crew: any) => (
                      <CastListMovieTile
                        key={`${tag} ${crew.id}`}
                        cast={crew}
                        isCrew={true}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <div className='pt-8'>
        <FooterContent />
      </div>
    </div>
  );
};
export default CastListPage;
