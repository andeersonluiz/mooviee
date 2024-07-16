import { MediaType, TrendingAll } from '@/modules/data/model/trending-all';
import { TrendingMovies } from '@/modules/data/model/trending-movies';
import { Result } from '@/modules/data/model/trending-all';
import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';
import { TrendingType } from '@/utils/enums';
import { useTranslations } from 'next-intl';
import { Suspense, use, useContext, useEffect, useState, useRef } from 'react';
import { Genre } from '@/modules/data/model/serie-info';
import MovieBanner from './child/item-banner';
import { BASE_IMAGE_URL } from '@/modules/config/settings';
import ItemBanner from './child/item-banner';
import CatalogTrending from './child/catalog-trending';
import Image from 'next/image';
import TrendingLabel from './child/trending-label';
import BackgroundImage from './child/background-image';
import { getMoveValue } from '@/utils/functions';
import {
  gapTrendingContainerTailwind,
  paddingLeftTrendingContainerTailwind,
} from '@/styles/style-values';

const MainContent = () => {
  const context = use(MovieAndTvShowContext);
  const [trendingList, setTrendingList] = useState<TrendingAll | null>(null);
  const [trendingSelected, setTrendingSelected] = useState<Result | null>(null);
  const [isVisibleNext, setIsVisibleNext] = useState(false);
  const [isVisibleBack, setIsVisibleBack] = useState(false);
  const [temp, setTemp] = useState(false);

  const t = useTranslations('metadata');
  const t_common = useTranslations('common');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const isStart = useRef(true);
  const isEnd = useRef(false);
  const scrollLeft = useRef(0);
  console.log('render...');
  const [isLoadingTrendingSelected, setLoadingTrendingSelected] = useState(false);
  const isLoading = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      const trendingListData = await context!.getTrendingAllUseCase.execute(
        t('language'),
        TrendingType.DAY
      );

      setTrendingList(trendingListData);
      setTrendingSelected(trendingListData?.results[0]!);
      console.log('aa ', trendingListData?.results[0]!.backdrop_path);

      //backRef.current?.addEventListener('mouseenter', timeoutRef.current);
    };

    fetchData();
  }, []);

  const handleScrollNext = () => {
    console.log('moving 200');
    const container = scrollContainerRef.current;
    const moveValue = getMoveValue(document.getElementById('id_trending')?.offsetWidth!);
    const value = container!.scrollLeft + moveValue;

    container!.scrollTo({
      left: value,
      behavior: 'smooth', // Opção para animação suave (opcional)
    });
  };
  const handleScrollBack = () => {
    isEnd.current = false;
    const container = scrollContainerRef.current;

    const moveValue = -getMoveValue(document.getElementById('id_trending')?.offsetWidth!);
    container!.scrollTo({
      left: container!.scrollLeft + moveValue,
      behavior: 'smooth', // Opção para animação suave (opcional)
    });
  };

  const updateScrollLeft = () => {
    const container = scrollContainerRef.current!;
    scrollLeft.current = container.scrollLeft;
    const moveValue = window.innerWidth;

    if (scrollLeft.current + moveValue >= container.scrollWidth) {
      setIsVisibleNext(false);
      isEnd.current = true;
    } else {
      setIsVisibleNext(true);
      isEnd.current = false;
    }

    if (scrollLeft.current == 0) {
      setIsVisibleBack(false);
      isStart.current = true;
    } else {
      setIsVisibleBack(true);
      isStart.current = false;
    }
  };
  const showArrow = () => {
    if (!isEnd.current) {
      setIsVisibleNext(true);
    }
    if (!isStart.current) {
      setIsVisibleBack(true);
    }
  };

  const removeArrow = () => {
    setIsVisibleNext(false);
    setIsVisibleBack(false);
  };

  useEffect(() => {
    scrollContainerRef.current?.addEventListener('mouseenter', showArrow);
    //quando sai do container o evento mouseleva é acionado, entao é necessario adicionar esses eventos
    nextRef.current?.addEventListener('mouseenter', showArrow);
    backRef.current?.addEventListener('mouseenter', showArrow);
    scrollContainerRef.current?.addEventListener('mouseleave', removeArrow);
    scrollContainerRef.current?.addEventListener('scrollend', updateScrollLeft);
  }, [trendingList]);

  useEffect(() => {
    isLoading.current = false;
    setTemp(!temp);
  }, [trendingSelected]);
  console.log('render with isLoading.current:', isLoading.current);
  return (
    <>
      {trendingSelected != null && trendingList != null ? (
        <>
          <div className='shadow-2xl shadow-neutral-800'>
            <div className='absolute inset-0 -z-10 bg-black bg-opacity-50'></div>
            {!isLoading.current && <BackgroundImage media={trendingSelected} />}
            <div>{!isLoading.current && <ItemBanner media={trendingSelected} />}</div>
            <TrendingLabel />
            <div>
              <div
                ref={scrollContainerRef}
                id='id_trending'
                className={`${paddingLeftTrendingContainerTailwind} no-scrollbar absolute bottom-6 flex h-[300px] w-full flex-row ${gapTrendingContainerTailwind} overflow-hidden pr-7`}
              >
                {trendingList.results.map((trendingItem) => {
                  return (
                    <CatalogTrending
                      key={trendingItem.id}
                      media={trendingItem}
                      onClick={async () => {
                        isLoading.current = true;

                        setTrendingSelected(trendingItem);
                      }}
                    />
                  );
                })}
              </div>
              <div
                ref={backRef}
                onClick={handleScrollBack}
                className={`${!isVisibleBack ? 'hidden' : ''} absolute bottom-28 h-[150px] w-[50px] cursor-pointer rounded-md bg-black bg-opacity-30 px-2 hover:bg-opacity-55`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='white'
                  className='size-7 h-[150px] align-middle'
                >
                  <path
                    fillRule='evenodd'
                    d='M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>

              <div
                ref={nextRef}
                onClick={() => {
                  console.log('cliquei');
                  handleScrollNext();
                }}
                className={`${!isVisibleNext ? 'hidden' : ''} absolute bottom-28 right-0 h-[150px] w-[50px] cursor-pointer rounded-md bg-transparent px-2 hover:bg-black hover:bg-opacity-55`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='white'
                  className='size-7 h-[150px] align-middle'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  );
};
export default MainContent;
/* 
    
*/
