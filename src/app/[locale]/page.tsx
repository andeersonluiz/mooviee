'use client';

import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';
import Image from 'next/image';

import { useTranslations } from 'next-intl';
import { Suspense, use, useEffect, useRef, useState } from 'react';

import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { MovieList } from '@/modules/data/model/movie-list';
import { languageIndexOptions } from '@/modules/config/settings';
import { isTemplateExpression } from 'typescript';
import HeaderComponent from '@/components/header/header-component';
import movie from '../../../assets/movie.jpg';
import HeaderComponentSearch from '@/components/header/header-component-search';
import { jsonMovieTrendingDay } from '@/test/mockData/api-service-data';
import { Genre } from '@/modules/data/model/serie-info';
import { TrendingType } from '@/utils/enums';
import MainContent from '@/components/main-content/main-content';
import { heightHomePage, heightHomePageTailwind } from '@/styles/style-values';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Index: React.FC = (props: any) => {
  console.log(`render ${new Date().getMilliseconds()}`);

  const t = useTranslations('metadata');
  const t_common = useTranslations('common');

  const context = use(MovieAndTvShowContext)!;
  const [movies, setMovies] = useState<MovieList | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  console.log('heightHomePageTailwind', heightHomePageTailwind);
  useEffect(() => {
    console.log('fetch api');
    const fetchApi = async () => {
      //await new Promise((r) => setTimeout(r, 2000));
      //const data = await context.getMoviesUseCase.execute(t('language'), MovieListType.POPULAR);
      //const data = await context.getGenreListUseCase.execute(t('language'));

      setMovies(null);
      setGenres(null);
    };

    fetchApi();
  }, []);
  const data = jsonMovieTrendingDay['results'][0];
  console.log(`fim render ${new Date().getMilliseconds()}`);
  const url = ' https://image.tmdb.org/t/p/original/fqv8v6AycXKsivp1T5yKtLbGXce.jpg';
  return (
    <>
      <Suspense fallback={<p>Carregando...</p>}>
        <main className={`relative ${heightHomePageTailwind}`}>
          <HeaderComponent />
          <MainContent />
        </main>

        <div className={`${heightHomePageTailwind} shadow-3xl bg-neutral-950`}>
          <p className='p-8 text-xl font-bold text-white transition-opacity duration-300'>
            {t_common('trendingWeek')}
          </p>
        </div>
      </Suspense>
    </>
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
