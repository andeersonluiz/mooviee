'use client';

import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';

import { useTranslations } from 'next-intl';

import FooterContent from '@/components/footer/footer-content';
import HeaderMobileComponent from '@/components/header-mobile/header-mobile-component';
import HeaderComponent from '@/components/header/header-component';
import PlayIcon from '@/components/icon/play-icon';
import DialogTrailer from '@/components/movie-info/child/dialog-trailer';
import MovieInfoComponent from '@/components/movie-info/movie-info-component';
import { BASE_IMAGE_URL } from '@/config/settings';
import useResize from '@/hooks/resize';
import { MovieInfo } from '@/modules/data/model/movie-info';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { DialogTrigger } from 'react-aria-components';
import placeholderBackdrop from '../../../../../assets/placeholder_backdrop.png';

const MovieInfoPage: React.FC = () => {
  const t = useTranslations('metadata');
  const context = useContext(MovieAndTvShowContext)!;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [movie, setMovie] = useState<MovieInfo | null>(
    null
  );
  const [src, setSrc] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();
  const userAgentInfo = useUserAgentData();
  useResize();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result =
          await context?.getMovieInfoUseCase.execute(
            Number(id),
            t('language')
          );
        console.log(result);
        setSrc(`${BASE_IMAGE_URL}${result!.backdrop_path}`);
        result!.credits.cast = result?.credits.cast.splice(
          0,
          20
        )!;
        console.log('aa', result);
        setMovie(result);
        document.title = 'Movieee - ' + result?.title!;
        setIsLoading(false);
      } catch (e) {
        router.push(`/${t('language_split')}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex min-h-screen flex-col'>
      <div
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} flex flex-1 flex-col overflow-x-hidden transition-opacity duration-300`}
      >
        {movie != null ? (
          <>
            <div
              className={`relative h-[500px] w-full flex-col`}
            >
              {userAgentInfo.isMobile ? (
                <HeaderMobileComponent selectedIndex={-1} />
              ) : (
                <HeaderComponent selectedIndex={-1} />
              )}
              <div
                className={`absolute top-0 -z-10 h-full w-full bg-black opacity-50`}
              ></div>
              <div
                className={`absolute top-0 -z-20 h-full w-full bg-[#4d4d4d]`}
              >
                <Image
                  src={src}
                  alt={`${movie?.title} image`}
                  onError={() =>
                    setSrc(placeholderBackdrop.src)
                  }
                  fill
                  objectFit={
                    src == '' ? 'contain' : 'cover'
                  }
                  className='w-full'
                />
              </div>
              {movie.videos.length != 0 && (
                <DialogTrigger>
                  <div
                    onClick={() => setIsModalOpen(true)}
                    className='absolute bottom-0 m-8 flex cursor-pointer flex-row items-center gap-3 rounded-xl bg-slate-900 px-6 py-4'
                  >
                    <PlayIcon className='size-6' />

                    <p className='text-lg text-white'>
                      Trailer{' '}
                    </p>
                  </div>
                  <div
                    className={`${isModalOpen ? 'opacity-0' : 'opacity-0'} transition-opacity duration-1000`}
                  >
                    <DialogTrailer
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      keyVideo={
                        movie.videos.find(
                          (item) => item.type == 'Trailer'
                        )?.key || movie.videos[0].key
                      }
                    />
                  </div>
                </DialogTrigger>
              )}
            </div>
            <MovieInfoComponent movie={movie} />
          </>
        ) : (
          <div className='h-[100vh] bg-neutral-950'>
            {userAgentInfo.isMobile ? (
              <HeaderMobileComponent selectedIndex={-1} />
            ) : (
              <HeaderComponent selectedIndex={-1} />
            )}
          </div>
        )}
      </div>
      <div className='pt-6'>
        <FooterContent />
      </div>
    </div>
  );
};

export default MovieInfoPage;
