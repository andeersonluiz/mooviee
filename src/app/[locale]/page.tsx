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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Index: React.FC = (props: any) => {
  console.log(`render ${new Date().getMilliseconds()}`);

  const t = useTranslations('metadata');

  const context = use(MovieAndTvShowContext)!;
  const [movies, setMovies] = useState<MovieList | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  console.log(languageIndexOptions);
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
        <main className='relative h-[90vh] scroll-auto'>
          <HeaderComponent />
          <div>
            <div className='absolute inset-0 -z-10 bg-black bg-opacity-50'></div>
            <div
              style={{ backgroundImage: `url(${url})` }}
              className='absolute inset-0 -z-20 bg-cover bg-center'
            ></div>
          </div>
          <div className='absolute top-44 mx-8 block w-[600px] items-start lg:mx-10 xl:mx-32 2xl:mx-48'>
            <div className='h-16'>
              <h1 className='auto-a line-clamp-3 p-2 text-6xl font-bold text-white'>
                {data['title'].toUpperCase()}
              </h1>
              <h1 className='p-3 text-base font-semibold text-white'>
                {` ${new Date(data['release_date']).getFullYear()} | ${data['media_type'][0].toUpperCase()}${data['media_type'].substring(1).toLowerCase()} | ${data[
                  'genre_ids'
                ]
                  .map((item: any) => {
                    const res = genres?.find((genre) => genre.id == Number(item));
                    if (res) {
                      return res.name;
                    }
                  })
                  .join(', ')}`}
              </h1>
              <h1 className='line-clamp-5 p-3 text-lg text-white'>{data['overview']}</h1>
            </div>
          </div>
        </main>
      </Suspense>
      <div className='static'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos facilis harum vero esse
        officia nihil, et aliquam perspiciatis officiis. Illo qui nobis labore sit facere possimus
        modi minima aut libero.
      </div>
    </>
  );
};

export default Index;

/*

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
