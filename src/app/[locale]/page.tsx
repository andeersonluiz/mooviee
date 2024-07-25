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
import HeaderComponentSearch from '@/components/header/header-component-search';
import { jsonMovieTrendingDay } from '@/test/mockData/api-service-data';
import { Genre } from '@/modules/data/model/serie-info';
import { TrendingType } from '@/utils/enums';
import MainContent from '@/components/main-content/main-content';
import { heightHomePage, heightHomePageTailwind } from '@/styles/style-values';
import LeaderboardComponent from '@/components/leaderboard/leaderboardComponent';
import SecondaryContent from '@/components/secondary-content/secondary-content';
import FooterContent from '@/components/footer/footer-content';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Index: React.FC = (props: any) => {
  const t = useTranslations('metadata');
  const t_common = useTranslations('common');

  const context = use(MovieAndTvShowContext)!;
  const [movies, setMovies] = useState<MovieList | null>(null);
  const [listGenres, setListGenres] = useState<Genre[] | null>(null);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await context!.getGenreListUseCase.execute(t('language'));
      setListGenres(data);
    };

    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      //await new Promise((r) => setTimeout(r, 2000));
      //const data = await context.getMoviesUseCase.execute(t('language'), MovieListType.POPULAR);
    };

    fetchApi();
  }, []);
  const data = jsonMovieTrendingDay['results'][0];
  const url = ' https://image.tmdb.org/t/p/original/fqv8v6AycXKsivp1T5yKtLbGXce.jpg';
  return (
    <GenreContext.Provider value={{ listGenres }}>
      <Suspense fallback={<p>Carregando...</p>}>
        <main>
          <div className={`relative ${heightHomePageTailwind} `}>
            <HeaderComponent />
            <MainContent />
            <div className='absolute -bottom-3 z-30 h-[20px] w-full bg-neutral-950 shadow-2xl blur-sm' />
          </div>
          <div className={`flex flex-1 flex-col`}>
            <div
              className={`shadow-3xl flex h-fit min-h-[1000px] flex-row items-center bg-neutral-950`}
            >
              <div className={`relative w-[70%] overflow-hidden`}>
                <SecondaryContent />
              </div>
              <div className='m-8 flex h-[900px] w-[600px] overflow-y-auto overflow-x-hidden border-4 border-slate-700 border-r-transparent bg-slate-900'>
                <LeaderboardComponent />
              </div>
            </div>
          </div>
          <FooterContent />
        </main>
      </Suspense>
    </GenreContext.Provider>
  );
};

export default Index;

/*
 <div
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0) 0%, gray 10%, gray 90%, rgba(0, 0, 0, 0))',
          }}
          className={`h-[${heightHomePage}px] `}
        >
          <div className='h-[${heightHomePage}px] relative'>
            <div className='relative z-20 rounded-md border border-transparent bg-neutral-950 p-16'>
              <p className='px-8 py-2 text-xl font-bold text-white transition-opacity duration-300'>
                {' '}
                {t_common('trendingWeek')}
              </p>
            </div>
            <div className='absolute -inset-1 z-10 rounded-md bg-gradient-to-t from-neutral-800 via-black to-neutral-800 blur-2xl'></div>
          </div>
        </div>


      <div>
            <div className='absolute -z-10 h-full w-full bg-black bg-opacity-50'></div>
            <Image
              src={movie}
              alt='movie'
              className='absolute -z-20 h-full w-full object-cover'
            ></Image>
          </div>

<div className='flex justify-center'>
            <div className='relative m-5 h-[750px] w-[1333px] items-center justify-center'>
              <div className='absolute inset-0 z-10 box-border h-full w-full bg-black bg-opacity-50 p-2'>
                <div className='pointer-events-none absolute inset-0 h-full w-full border-8 border-red-500 blur-sm filter'></div>
                <div className='relative h-full w-full'>
                  <Image
                    src={movie}
                    alt='movie'
                    className='relative z-0 h-full w-full object-cover'
                  ></Image>
                </div>
              </div>
            </div> */
