'use client';

import FooterContent from '@/components/footer/footer-content';
import HeaderMobileComponent from '@/components/header-mobile/header-mobile-component';
import HeaderComponent from '@/components/header/header-component';
import ArrowDownIcon from '@/components/icon/arrow-down-icon';
import ArrowUpIcon from '@/components/icon/arrow-up-icon';
import MediaTile from '@/components/secondary-content/child/media-tile';
import useResize from '@/hooks/resize';
import { Serie } from '@/modules/data/model/serie-list';
import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import { SerieFilterType } from '@/utils/enums';
import { removeDuplicatesById } from '@/utils/functions';
import { CircularProgress } from '@nextui-org/progress';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const SeriePage: React.FC = () => {
  const context = useContext(MovieAndTvShowContext)!;
  const t = useTranslations('metadata');
  const tSerieList = useTranslations('serieList');
  const [series, setSeries] = useState<Serie[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFilter, setIsLoadingFilter] =
    useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [isLoadingMoreData, setIsLoadingMoreData] =
    useState(false);
  const [selected, setSelected] = useState(0);
  const [desc, setDesc] = useState(true);
  const router = useRouter();
  const page = useRef(2);
  const filter = useRef<SerieFilterType>(
    SerieFilterType.POPULARITY
  );
  const isEnd = useRef(false);
  const userAgentInfo = useUserAgentData();
  const listRef = useRef<HTMLDivElement>(null);
  const arrayFilter = Object.values(SerieFilterType);
  useResize();

  const fetchData = async () => {
    setIsLoadingFilter(true);
    page.current = 2;
    isEnd.current = false;
    console.log(
      `search page number:${page}, filter: ${filter.current}, desc:${desc} `
    );
    try {
      const [resultFirstPage, resultSecondPage] =
        await Promise.all([
          context?.getSeriesAllUseCase.execute(
            t('language'),
            filter.current,
            desc,
            1
          ),
          context?.getSeriesAllUseCase.execute(
            t('language'),
            filter.current,
            desc,
            2
          ),
        ]);
      await new Promise((res) => setTimeout(res, 300));
      const result = [
        ...resultFirstPage?.results!,
        ...resultSecondPage?.results!,
      ];
      setSeries(removeDuplicatesById(result));
      document.title = `Movieee - ${tSerieList('serie')}`;
      setIsLoading(false);
      setIsLoadingFilter(false);
    } catch (e) {
      router.push(`/${t('language_split')}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (listRef.current != null) {
        if (
          window.innerHeight + Math.round(window.scrollY) >=
          document.body.offsetHeight * 0.8
        ) {
          if (!loadMore && !isEnd.current) {
            setLoadMore(true);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true,
      capture: true,
    });

    fetchData();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [desc, selected]);

  useEffect(() => {
    if (loadMore && !isEnd.current) {
      console.log('loading data....');
      setIsLoadingMoreData(true);
      const loadMoreData = async () => {
        page.current = page.current + 1;

        const result =
          await context?.getSeriesAllUseCase.execute(
            t('language'),
            filter.current,
            desc,
            page.current
          );

        if (result?.total_pages == page.current) {
          isEnd.current = true;
        }

        setSeries(
          removeDuplicatesById([
            ...series!,
            ...result?.results!,
          ])
        );
        setIsLoadingMoreData(false);
        setLoadMore(false);
      };
      loadMoreData();
    }
  }, [loadMore]);
  return (
    <div className='flex min-h-screen flex-col'>
      {userAgentInfo.isMobile ? (
        <HeaderMobileComponent selectedIndex={2} />
      ) : (
        <HeaderComponent selectedIndex={2} />
      )}
      <main
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} flex flex-1 flex-col transition-opacity duration-300`}
      >
        {series != null ? (
          <>
            <div className={`flex h-full w-full flex-col`}>
              <div className='px-8 pb-6 pt-8 text-center text-5xl font-bold text-white'>
                {tSerieList('serie')}
              </div>
              <div className='px-8 pb-3 text-center text-sm font-light text-white'>
                {tSerieList('sortBy')}
              </div>
              <div
                className={`${userAgentInfo.isDesktop ? 'px-8' : 'px-3'} flex flex-wrap justify-center gap-4`}
              >
                {arrayFilter.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      const value =
                        arrayFilter.indexOf(item);
                      filter.current = arrayFilter[value];

                      if (selected == value) {
                        setDesc(!desc);
                      } else {
                        setSelected(value);
                        setDesc(true);
                      }
                    }}
                    className={`${
                      selected == arrayFilter.indexOf(item)
                        ? 'border-black bg-neutral-700'
                        : 'border-gray-600'
                    } flex flex-row items-center justify-center gap-2 rounded-md border-1 px-2 py-[6px] text-lg text-white hover:bg-neutral-600`}
                  >
                    {!desc &&
                    selected ==
                      arrayFilter.indexOf(item) ? (
                      <ArrowUpIcon className='size-5' />
                    ) : (
                      <ArrowDownIcon className='size-5' />
                    )}
                    {tSerieList(item)}
                  </button>
                ))}
              </div>
            </div>
            {isLoadingFilter ? (
              <div className='flex h-full w-full flex-1 items-center justify-center text-center'>
                <CircularProgress
                  size='lg'
                  color='warning'
                  className=''
                  aria-label='loading...'
                />
              </div>
            ) : (
              <div
                ref={listRef}
                className={`${userAgentInfo.isDesktop ? 'justify-between pl-8 pr-[47px]' : 'justify-center px-0'} flex w-fit flex-wrap gap-x-2 gap-y-4 self-center py-10 text-center`}
              >
                {series.map((movie) => (
                  <MediaTile
                    key={movie.id}
                    media={movie}
                    isMovie={false}
                  ></MediaTile>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className='bg-neutral-950'>
            {userAgentInfo.isMobile ? (
              <HeaderMobileComponent selectedIndex={1} />
            ) : (
              <HeaderComponent selectedIndex={1} />
            )}
          </div>
        )}
      </main>

      <FooterContent />
    </div>
  );
};

export default SeriePage;
