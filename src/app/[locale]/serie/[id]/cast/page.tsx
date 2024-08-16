'use client';

import CastListSerieTile from '@/components/cast-list/children/cast-list-serie-tile';
import FooterContent from '@/components/footer/footer-content';
import HeaderMobileComponent from '@/components/header-mobile/header-mobile-component';
import HeaderComponent from '@/components/header/header-component';
import LoadingPage from '@/components/loading/loading-page';
import useResize from '@/hooks/resize';
import { SerieInfo } from '@/modules/data/model/serie-info';
import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import {
  generateCrewTags,
  removeDuplicatesById,
} from '@/utils/functions';
import { CircularProgress } from '@nextui-org/progress';
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
  const [serie, setSerie] = useState<SerieInfo | null>(
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
          await context.getSeriesInfoUseCase.execute(
            Number(id),
            t('language')
          );
        setListCrewTags(
          generateCrewTags(
            result?.aggregate_credits.crew == null
              ? []
              : result?.aggregate_credits.crew
          )
        );
        window.document.title = `Movieee - ${result?.name} (${tCastList('cast')})`;

        setSerie(result);
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

      {isLoading ? (
        <main className='flex h-full flex-1 justify-center'>
          <CircularProgress
            size='lg'
            color='warning'
            className=''
            aria-label='loading...'
          />
        </main>
      ) : (
        <main
          className={`flex flex-1 flex-col transition-opacity duration-500`}
        >
          <h1 className='p-8 text-center text-4xl font-bold text-white'>
            {tCastList('cast')}:{` ${serie?.name}`}
          </h1>

          <div
            className={`${userAgentData.isDesktop ? 'flex-row' : 'flex-col'} flex h-full`}
          >
            <div className='flex flex-1 flex-col'>
              <h2 className='px-12 py-4 text-start text-2xl font-bold text-white'>
                {tCastList('cast')}
              </h2>

              <div className='flex flex-wrap py-2'>
                {serie?.aggregate_credits.cast.length ==
                0 ? (
                  <p className='px-12 text-lg text-white'>
                    {tCastList('noCastInfo')}
                  </p>
                ) : (
                  serie?.aggregate_credits.cast.map(
                    (cast) => (
                      <div key={cast.id}>
                        <CastListSerieTile cast={cast} />
                      </div>
                    )
                  )
                )}
              </div>
            </div>

            <div className='flex flex-1 flex-col'>
              <h2 className='px-12 py-4 text-start text-2xl font-bold text-white'>
                {tCastList('crew')}
              </h2>
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
                        serie?.aggregate_credits.crew.filter(
                          (item) => item.department == tag
                        )
                      ).map((crew: any) => (
                        <CastListSerieTile
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
      )}

      <div className='pt-8'>
        <FooterContent />
      </div>
    </div>
  );
};
export default CastListPage;
