'use client';

import {
  GenreContext,
  MovieAndTvShowContext,
} from '@/modules/presentation/provider/movies-tv-show-provider';
import Image from 'next/image';

import { useTranslations } from 'next-intl';
import { Suspense, use, useEffect, useRef, useState } from 'react';

import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { MovieList } from '@/modules/data/model/movie-list';
import { languageIndexOptions } from '@/config/settings';
import { isTemplateExpression } from 'typescript';
import HeaderComponent from '@/components/header/header-component';
import movie from '../../../assets/movie.jpg';
import HeaderComponentSearch from '@/components/header/header-search-component';
import { jsonMovieTrendingDay } from '@/test/mockData/api-service-data';
import { Genre } from '@/modules/data/model/serie-info';
import { TrendingType } from '@/utils/enums';
import MainContent from '@/components/main-content/main-content';
import { heightHomePage, heightHomePageTailwind } from '@/styles/style-values';
import LeaderboardComponent from '@/components/leaderboard/leaderboard-component';
import SecondaryContent from '@/components/secondary-content/secondary-content';
import FooterContent from '@/components/footer/footer-content';
import { getDeviceType } from '@/utils/ssr_functions';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import LeaderboardMobileComponent from '@/components/leaderboard-mobile/leaderboard-mobile-component';
import HeaderMobileComponent from '@/components/header-mobile/header-mobile-component';
import useDebouncer from '@/hooks/debouncer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MainPage: React.FC = (props: any) => {
  const t = useTranslations('metadata');
  const context = use(MovieAndTvShowContext)!;
  const [listGenres, setListGenres] = useState<Genre[] | null>(null);
  const userAgentInfo = useUserAgentData();

  useEffect(() => {
    userAgentInfo.isDesktop
      ? (document.body.style.overflow = 'auto')
      : (document.body.style.overflow = 'hidden');

    const handleResize = async () => {
      const deviceType = await getDeviceType();
      if (JSON.stringify(deviceType) != JSON.stringify(userAgentInfo)) {
        window.location.reload();
      }
    };

    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await context!.getGenreListUseCase.execute(t('language'));
      setListGenres(data);
    };

    fetchApi();
  }, []);

  return (
    <GenreContext.Provider value={{ listGenres }}>
      <Suspense fallback={<p>Carregando...</p>}>
        <main>
          <div className={`relative ${heightHomePageTailwind} `}>
            {userAgentInfo.isMobile ? <HeaderMobileComponent /> : <HeaderComponent />}
            <MainContent />
            <div className='absolute -bottom-3 z-0 h-[20px] w-full bg-neutral-950 shadow-2xl blur-sm' />
          </div>
          <div className={`flex flex-col`}>
            <div
              className={`shadow-3xl flex h-fit min-h-[1000px] flex-col items-center bg-neutral-950 xl:flex-row`}
            >
              <div className={`relative w-full overflow-hidden xl:w-[60%]`}>
                <SecondaryContent />
              </div>
              {userAgentInfo.isDesktop ? (
                <div
                  id='table_id'
                  className='!m-8 flex h-[900px] w-[70%] overflow-y-auto overflow-x-hidden border-4 border-slate-700 border-r-transparent bg-slate-900 xl:w-[40%]'
                >
                  <LeaderboardComponent
                    moveToTop={() => document.getElementById('table_id')!.scrollTo(0, 0)}
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
