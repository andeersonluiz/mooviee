'use client';

import {
  GenreContext,
  MovieAndTvShowContext,
} from '@/modules/presentation/provider/movies-tv-show-provider';

import { useTranslations } from 'next-intl';
import { Genre, SerieInfo } from '@/modules/data/model/serie-info';

import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import HeaderMobileComponent from '@/components/header-mobile/header-mobile-component';
import HeaderComponent from '@/components/header/header-component';
import { heightHomePageTailwind } from '@/styles/style-values';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { BASE_IMAGE_URL } from '@/config/settings';
import Image from 'next/image';
import placeholderBackdrop from '../../../../../assets/placeholder_backdrop.png';
import { convertRunTime, formatGenres } from '@/utils/functions';
import CastTile from '@/components/serie-info/child/cast-tile';
import FooterContent from '@/components/footer/footer-content';
import useScroll from '@/hooks/scroll';
import ArrowNextIcon from '@/components/icon/arrow-next-icon';
import ArrowBackIcon from '@/components/icon/arrow-back-icon';
import ArrowGoIcon from '@/components/icon/arrow-go-icon';
import DescriptionSerie from '@/components/serie-info/child/description';
import InfosSerie from '@/components/serie-info/child/infos';
import CastList from '@/components/serie-info/child/cast-list';
import RecommendationList from '@/components/serie-info/child/recommendations-list';
import PlayIcon from '@/components/icon/play-icon';
import { Dialog, DialogTrigger } from 'react-aria-components';
import DialogTrailer from '@/components/serie-info/child/dialog-trailer';

const SeriePage: React.FC = () => {
  const t = useTranslations('metadata');
  const context = useContext(MovieAndTvShowContext)!;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [serie, setSerie] = useState<SerieInfo | null>(null);
  const [src, setSrc] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();
  const userAgentInfo = useUserAgentData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await context?.getSeriesInfoUseCase.execute(Number(id), t('language'));
        console.log(result);
        setSrc(`${BASE_IMAGE_URL}${result!.backdrop_path}`);
        result!.aggregate_credits.cast = result?.aggregate_credits.cast.splice(0, 20)!;
        console.log('aa', result?.networks[0].logo_path!);
        setSerie(result);

        setIsLoading(false);
      } catch (e) {
        router.push('/');
      }
    };

    fetchData();
  }, []);

  console.log(typeof serie?.first_air_date);

  return (
    <main
      className={`${isLoading ? 'opacity-0' : 'opacity-100'} flex flex-col overflow-x-hidden transition-opacity duration-300`}
    >
      {serie != null ? (
        <>
          <div className={`relative h-[500px] w-full`}>
            {userAgentInfo.isMobile ? <HeaderMobileComponent /> : <HeaderComponent />}
            <div className={`absolute top-0 -z-10 h-full w-full bg-black opacity-50`}></div>
            <div className={`absolute top-0 -z-20 h-full w-full bg-[#4d4d4d]`}>
              <Image
                src={src}
                alt={`${serie?.name} image`}
                onError={() => setSrc(placeholderBackdrop.src)}
                fill
                objectFit={src == '' ? 'contain' : 'cover'}
                className='w-full'
              />
            </div>
            <DialogTrigger>
              <div
                onClick={() => setIsModalOpen(true)}
                className='absolute bottom-0 m-8 flex cursor-pointer flex-row items-center gap-3 rounded-xl bg-slate-900 px-6 py-4'
              >
                <PlayIcon className='size-6' />

                <p className='text-lg text-white'>Trailer </p>
              </div>
              <div
                className={`${isModalOpen ? 'opacity-0' : 'opacity-0'} opacity-0 transition-opacity duration-1000`}
              >
                <DialogTrailer
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  keyVideo='dQw4w9WgXcQ'
                />
              </div>
            </DialogTrigger>
          </div>
          <div className='relative flex flex-row gap-4 bg-neutral-950'>
            <div className='flex w-[70%] flex-col'>
              <DescriptionSerie serie={serie!} />
            </div>
            <div className='flex w-[30%] flex-col gap-6 px-8 pt-8'>
              <InfosSerie serie={serie!} />
            </div>
          </div>
          <CastList credits={serie!.aggregate_credits} />
          <RecommendationList recommendations={serie!.recommendations} />
        </>
      ) : (
        <div className='h-[100vh] bg-neutral-950'>
          {userAgentInfo.isMobile ? <HeaderMobileComponent /> : <HeaderComponent />}
        </div>
      )}
      <FooterContent />
    </main>
  );
};
// last_air_date in_production  next_episode_to_air last_episode_to_air
// recommendations aggregate_credits
export default SeriePage;
