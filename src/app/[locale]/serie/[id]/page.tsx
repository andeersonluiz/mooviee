'use client';

import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';

import { SerieInfo } from '@/modules/data/model/serie-info';
import { useTranslations } from 'next-intl';

import FooterContent from '@/components/footer/footer-content';
import HeaderMobileComponent from '@/components/header-mobile/header-mobile-component';
import HeaderComponent from '@/components/header/header-component';
import SerieInfoComponent from '@/components/serie-info/serie-info-component';
import { BASE_IMAGE_URL } from '@/config/settings';
import useResize from '@/hooks/resize';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import placeholderBackdrop from '../../../../../assets/placeholder_backdrop.png';

const SeriePage: React.FC = () => {
  const t = useTranslations('metadata');
  const context = useContext(MovieAndTvShowContext)!;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [serie, setSerie] = useState<SerieInfo | null>(
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
          await context?.getSeriesInfoUseCase.execute(
            Number(id),
            t('language')
          );
        console.log(result);
        setSrc(`${BASE_IMAGE_URL}${result!.backdrop_path}`);
        result!.aggregate_credits.cast =
          result?.aggregate_credits.cast.splice(0, 20)!;
        console.log('aa', result);
        setSerie(result);
        document.title = 'Movieee - ' + result?.name!;
        setIsLoading(false);
      } catch (e) {
        router.push(`/${t('language_split')}`);
      }
    };

    fetchData();
  }, []);

  console.log(typeof serie?.first_air_date);

  return (
    <div className='flex min-h-screen flex-col'>
      <div
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} flex flex-1 flex-col overflow-x-hidden transition-opacity duration-300`}
      >
        {serie != null ? (
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
                  alt={`${serie?.name} image`}
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
            </div>
            <SerieInfoComponent serie={serie} />
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
// last_air_date in_production  next_episode_to_air last_episode_to_air
// recommendations aggregate_credits
export default SeriePage;
