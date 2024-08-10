'use client';

import {
  GenreContext,
  MovieAndTvShowContext,
} from '@/modules/presentation/provider/movies-tv-show-provider';

import { useTranslations } from 'next-intl';
import { Suspense, use, useEffect, useState } from 'react';

import FooterContent from '@/components/footer/footer-content';
import HeaderMobileComponent from '@/components/header-mobile/header-mobile-component';
import HeaderComponent from '@/components/header/header-component';
import LeaderboardMobileComponent from '@/components/leaderboard-mobile/leaderboard-mobile-component';
import LeaderboardComponent from '@/components/leaderboard/leaderboard-component';
import MainContent from '@/components/main-content/main-content';
import SecondaryContent from '@/components/secondary-content/secondary-content';
import useResize from '@/hooks/resize';
import { Genre } from '@/modules/data/model/serie-info';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import { heightHomePageTailwind } from '@/styles/style-values';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MainPage: React.FC = (props: any) => {
  const t = useTranslations('metadata');
  const context = use(MovieAndTvShowContext)!;
  const [listGenres, setListGenres] = useState<
    Genre[] | null
  >(null);
  const userAgentInfo = useUserAgentData();
  useResize();

  useEffect(() => {
    const fetchApi = async () => {
      const data =
        await context!.getGenreListUseCase.execute(
          t('language')
        );
      setListGenres(data);
    };

    fetchApi();
  }, []);

  return (
    <GenreContext.Provider value={{ listGenres }}>
      <Suspense fallback={<p>Carregando...</p>}>
        <main>
          <div
            className={`relative ${heightHomePageTailwind} `}
          >
            {userAgentInfo.isMobile ? (
              <HeaderMobileComponent />
            ) : (
              <HeaderComponent />
            )}
            <MainContent />
            <div className='absolute -bottom-3 z-0 h-[20px] w-full bg-neutral-950 shadow-2xl blur-sm' />
          </div>
          <div className={`flex flex-col`}>
            <div
              className={`shadow-3xl flex h-fit min-h-[1000px] flex-col items-center bg-neutral-950 xl:flex-row`}
            >
              <div
                className={`relative w-full overflow-hidden xl:w-[60%]`}
              >
                <SecondaryContent />
              </div>
              {userAgentInfo.isDesktop ? (
                <div
                  id='table_id'
                  className='!m-8 flex h-[900px] w-[70%] overflow-y-auto overflow-x-hidden border-4 border-slate-700 border-r-transparent bg-slate-900 xl:w-[40%]'
                >
                  <LeaderboardComponent
                    moveToTop={() =>
                      document
                        .getElementById('table_id')!
                        .scrollTo(0, 0)
                    }
                  />
                </div>
              ) : (
                <div className='w-full bg-slate-900'>
                  <LeaderboardMobileComponent />
                </div>
              )}
            </div>
          </div>
          <FooterContent />
        </main>
      </Suspense>
    </GenreContext.Provider>
  );
};

export default MainPage;
