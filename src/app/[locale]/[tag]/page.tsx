'use client';

import FooterContent from '@/components/footer/footer-content';
import HeaderMobileComponent from '@/components/header-mobile/header-mobile-component';
import HeaderComponent from '@/components/header/header-component';
import LoadingPage from '@/components/loading/loading-page';
import MediaTile from '@/components/secondary-content/child/media-tile';
import useResize from '@/hooks/resize';
import { MediaType } from '@/modules/data/model/media-type';
import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import {
  MovieListType,
  SerieListType,
  TagType,
  TrendingType,
} from '@/utils/enums';
import { removeDuplicatesById } from '@/utils/functions';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const TagPage: React.FC = () => {
  const { tag } = useParams();
  const router = useRouter();
  const userAgentInfo = useUserAgentData();

  const context = useContext(MovieAndTvShowContext)!;

  const t = useTranslations('metadata');
  const tTagList = useTranslations('tagList');

  const [medias, setMedias] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);

  const page = useRef(2);
  const tagType = useRef<TagType>();
  const isEnd = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);
  const mediaType = useRef<MediaType | null>();

  useResize();

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

    const fetchData = async () => {
      page.current = 2;
      isEnd.current = false;
      try {
        const index = (
          Object.values(TagType) as string[]
        ).indexOf(tag.toString());
        const type = Object.values(TagType)[index];
        tagType.current = type;
        let resultFirstPage;
        let resultSecondPage;
        switch (type) {
          case TagType.TRENDING:
            [resultFirstPage, resultSecondPage] =
              await Promise.all([
                context?.getTrendingAllUseCase.execute(
                  t('language'),
                  TrendingType.WEEK,
                  1
                ),
                context?.getTrendingAllUseCase.execute(
                  t('language'),
                  TrendingType.WEEK,
                  2
                ),
              ]);
            mediaType.current = null;
            break;
          case TagType.NEXT_WEEK:
            [resultFirstPage, resultSecondPage] =
              await Promise.all([
                context?.getSeriesUseCase.execute(
                  t('language'),
                  SerieListType.ON_THE_AIR,
                  1
                ),
                context?.getSeriesUseCase.execute(
                  t('language'),
                  SerieListType.ON_THE_AIR,
                  2
                ),
              ]);

            mediaType.current = MediaType.Tv;
            break;
          case TagType.NOW_PLAYING:
            [resultFirstPage, resultSecondPage] =
              await Promise.all([
                context?.getMoviesUseCase.execute(
                  t('language'),
                  MovieListType.NOW_PLAYING,
                  1
                ),
                context?.getMoviesUseCase.execute(
                  t('language'),
                  MovieListType.NOW_PLAYING,
                  2
                ),
              ]);

            mediaType.current = MediaType.Movie;

            break;
        }

        await new Promise((res) => setTimeout(res, 300));
        const result = [
          ...resultFirstPage?.results!,
          ...resultSecondPage?.results!,
        ];
        setMedias(removeDuplicatesById(result));
        document.title = `Movieee - ${tTagList(tag)}`;
        setIsLoading(false);
      } catch (e) {
        router.push(`/${t('language_split')}`);
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
    if (loadMore && !isEnd.current) {
      const loadMoreData = async () => {
        page.current = page.current + 1;
        let result;
        switch (tagType.current) {
          case TagType.TRENDING:
            result =
              await context?.getTrendingAllUseCase.execute(
                t('language'),
                TrendingType.WEEK,
                page.current
              );
            break;
          case TagType.NEXT_WEEK:
            result =
              await context?.getSeriesUseCase.execute(
                t('language'),
                SerieListType.ON_THE_AIR,
                page.current
              );
            break;
          case TagType.NOW_PLAYING:
            result =
              await context?.getMoviesUseCase.execute(
                t('language'),
                MovieListType.NOW_PLAYING,
                page.current
              );

            break;
        }

        if (result?.total_pages == page.current) {
          isEnd.current = true;
        }

        setMedias(
          removeDuplicatesById([
            ...medias!,
            ...result?.results!,
          ])
        );
        setLoadMore(false);
      };
      loadMoreData();
    }
  }, [loadMore]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className='flex min-h-screen flex-col'>
      {userAgentInfo.isMobile ? (
        <HeaderMobileComponent selectedIndex={-1} />
      ) : (
        <HeaderComponent selectedIndex={-1} />
      )}
      <main
        className={`flex flex-1 flex-col transition-opacity duration-300`}
      >
        {medias != null ? (
          <>
            <div className={`flex h-full w-full flex-col`}>
              <div className='px-8 pb-6 pt-8 text-center text-5xl font-bold text-white'>
                {tTagList(tag)}
              </div>
            </div>
            <div
              ref={listRef}
              className={`${userAgentInfo.isDesktop ? 'justify-between pl-8 pr-[47px]' : 'justify-center px-0'} flex w-fit flex-wrap gap-x-2 gap-y-4 self-center py-10 text-center`}
            >
              {medias.map((media) => (
                <>
                  <MediaTile
                    key={media.id}
                    media={media}
                    isMovie={
                      mediaType.current == null
                        ? media.media_type ==
                          MediaType.Movie
                        : mediaType.current ==
                          MediaType.Movie
                    }
                  ></MediaTile>{' '}
                </>
              ))}
            </div>
          </>
        ) : (
          <div className='bg-neutral-950'>
            {userAgentInfo.isMobile ? (
              <HeaderMobileComponent selectedIndex={-1} />
            ) : (
              <HeaderComponent selectedIndex={-1} />
            )}
          </div>
        )}
      </main>

      <FooterContent />
    </div>
  );
};
export default TagPage;
