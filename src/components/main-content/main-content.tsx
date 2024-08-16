import useScroll from '@/hooks/scroll';
import {
  Result,
  TrendingAll,
} from '@/modules/data/model/trending-all';
import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import {
  gapTrendingContainerTailwind,
  paddingLeftTrendingContainerTailwind,
  paddingLeftTrendingContainerTailwindMobile,
} from '@/styles/style-values';
import { TrendingType } from '@/utils/enums';
import { CircularProgress } from '@nextui-org/progress';
import { useTranslations } from 'next-intl';
import { use, useEffect, useRef, useState } from 'react';
import ArrowBackIcon from '../icon/arrow-back-icon';
import ArrowNextIcon from '../icon/arrow-next-icon';
import BackgroundImage from './child/background-image';
import CatalogTrending from './child/catalog-trending';
import ItemBanner from './child/item-banner';
import TrendingLabel from './child/trending-label';

const MainContent = () => {
  const context = use(MovieAndTvShowContext);
  const [trendingList, setTrendingList] =
    useState<TrendingAll | null>(null);
  const [trendingSelected, setTrendingSelected] =
    useState<Result | null>(null);
  const [isVisibleNext, setIsVisibleNext] = useState(false);
  const [isVisibleBack, setIsVisibleBack] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollHook = useScroll(
    scrollContainerRef,
    setIsVisibleNext,
    setIsVisibleBack,
    8
  );
  const [temp, setTemp] = useState(false);
  const t = useTranslations('metadata');
  const isLoading = useRef(false);
  const userAgentInfo = useUserAgentData();

  useEffect(() => {
    const fetchData = async () => {
      const trendingListData =
        await context!.getTrendingAllUseCase.execute(
          t('language'),
          TrendingType.DAY
        );

      setTrendingList(trendingListData);
      setTrendingSelected(trendingListData?.results[0]!);
    };

    fetchData();
  }, []);

  useEffect(() => {
    isLoading.current = false;
    setTemp(!temp);
  }, [trendingSelected]);
  return (
    <>
      {trendingSelected != null && trendingList != null ? (
        <>
          <div className='shadow-2xl shadow-neutral-800'>
            <div className='absolute inset-0 -z-10 bg-black bg-opacity-80'></div>
            {!isLoading.current && (
              <BackgroundImage media={trendingSelected} />
            )}
            <div>
              {!isLoading.current && (
                <ItemBanner media={trendingSelected} />
              )}
            </div>
            <TrendingLabel />
            <div>
              <div
                ref={scrollContainerRef}
                onMouseEnter={() => scrollHook.showArrow()}
                onMouseLeave={() =>
                  scrollHook.removeArrow()
                }
                onScroll={() =>
                  scrollHook.updateScrollLeft()
                }
                className={`${userAgentInfo.isDesktop ? paddingLeftTrendingContainerTailwind : paddingLeftTrendingContainerTailwindMobile} ${userAgentInfo.isDesktop ? 'overflow-hidden' : 'overflow-x-scroll'} no-scrollbar absolute bottom-6 flex h-[300px] w-full flex-row ${gapTrendingContainerTailwind} overflow-hidden pr-7`}
              >
                {trendingList.results.map(
                  (trendingItem) => {
                    return (
                      <CatalogTrending
                        key={trendingItem.id}
                        media={trendingItem}
                        mediaSelected={trendingSelected}
                        onClick={async () => {
                          if (
                            trendingSelected != trendingItem
                          ) {
                            isLoading.current = true;

                            setTrendingSelected(
                              trendingItem
                            );

                            window.scroll({
                              top: 0,
                              behavior: 'smooth',
                            });
                          }
                        }}
                      />
                    );
                  }
                )}
              </div>
              <div
                onMouseEnter={scrollHook.showArrow}
                onClick={scrollHook.handleScrollBack}
                className={`${!isVisibleBack ? 'hidden' : ''} absolute bottom-28 h-[150px] w-[50px] cursor-pointer rounded-md bg-transparent px-2 hover:bg-black hover:bg-opacity-55`}
              >
                <ArrowBackIcon className='size-7 h-[150px] align-middle' />
              </div>

              <div
                onMouseEnter={scrollHook.showArrow}
                onClick={scrollHook.handleScrollNext}
                className={`${!isVisibleNext ? 'hidden' : ''} absolute bottom-28 right-[15px] h-[150px] w-[50px] cursor-pointer rounded-md bg-transparent px-2 hover:bg-black hover:bg-opacity-55`}
              >
                <ArrowNextIcon className='size-7 h-[150px] align-middle' />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='flex h-full w-full items-center justify-center pt-8'>
          <CircularProgress
            size='lg'
            color='warning'
            className=''
            aria-label='loading...'
          />
        </div>
      )}
    </>
  );
};
export default MainContent;
/* 
    
*/
