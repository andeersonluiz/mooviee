import { TrendingAll } from '@/modules/data/model/trending-all';
import { TrendingType } from '@/utils/enums';
import { getMoveValue } from '@/utils/functions';
import { useTranslations } from 'next-intl';
import { use, useEffect, useRef, useState } from 'react';
import MediaTile from './media-tile';
import { MediaType } from '@/modules/data/model/media-type';
import { headers } from 'next/headers';
import { getDeviceType } from '@/utils/ssr_functions';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import useScroll from '@/hooks/scroll';
import ArrowNextIcon from '@/components/icon/arrow-next-icon';
import ArrowBackIcon from '@/components/icon/arrow-back-icon';

const ListMedia = ({ data, mediaType = null }: { data: any; mediaType?: MediaType | null }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisibleNext, setIsVisibleNext] = useState(false);
  const [isVisibleBack, setIsVisibleBack] = useState(false);
  const scrollHook = useScroll(scrollContainerRef, setIsVisibleNext, setIsVisibleBack, 5);
  const userAgentData = useUserAgentData();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`${isLoaded ? 'opacity-100' : 'opacity-0'} relative flex flex-row overflow-hidden transition-opacity duration-300`}
    >
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => scrollHook.showArrow()}
        onMouseLeave={() => scrollHook.removeArrow()}
        onScroll={() => scrollHook.updateScrollLeft()}
        className={`flex flex-row gap-0 ${userAgentData.isDesktop ? 'overflow-hidden' : 'overflow-x-scroll'} px-2 pb-4 pt-2 align-top scrollbar-hide xl:gap-5`}
      >
        {data?.results.map((item: any) => (
          <MediaTile
            key={item.id}
            media={item}
            onClick={() => null}
            isMovie={
              mediaType == null ? item.media_type == MediaType.Movie : mediaType == MediaType.Movie
            }
          />
        ))}
      </div>

      <div
        onMouseEnter={scrollHook.showArrow}
        onClick={scrollHook.handleScrollBack}
        className={`${!isVisibleBack ? 'hidden' : ''} absolute top-[75px] ml-8 h-[150px] w-[50px] cursor-pointer rounded-md bg-opacity-30 px-2 hover:bg-black hover:bg-opacity-55`}
      >
        <ArrowBackIcon className='size-7 h-[150px] align-middle' />
      </div>

      <div
        onMouseEnter={scrollHook.showArrow}
        onClick={scrollHook.handleScrollNext}
        className={`${!isVisibleNext ? 'hidden' : ''} absolute right-[15px] top-[75px] h-[150px] w-[50px] cursor-pointer rounded-md bg-transparent px-2 hover:bg-black hover:bg-opacity-55`}
      >
        <ArrowNextIcon className='size-7 h-[150px] align-middle' />
      </div>
    </div>
  );
};

export default ListMedia;
