import useScroll from '@/hooks/scroll';
import { Recommendations, SerieInfo } from '@/modules/data/model/serie-info';
import { convertRunTime } from '@/utils/functions';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import CastTile from './cast-tile';
import ArrowBackIcon from '@/components/icon/arrow-back-icon';
import ArrowNextIcon from '@/components/icon/arrow-next-icon';
import ArrowGoIcon from '@/components/icon/arrow-go-icon';
import RecommendationTile from './recommendation-tile';

const RecommendationList = ({ recommendations }: { recommendations: Recommendations[] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tSerieInfo = useTranslations('serieInfo');

  const [isVisibleNext, setIsVisibleNext] = useState(false);
  const [isVisibleBack, setIsVisibleBack] = useState(false);
  const scrollHook = useScroll(scrollContainerRef, setIsVisibleNext, setIsVisibleBack, 4);

  return (
    <>
      {recommendations.length != 0 && (
        <div className='flex w-full flex-col p-0 pb-8 pr-4'>
          <p className='font-base w-full p-8 text-center text-2xl text-white'>
            {tSerieInfo('recommendation')}
          </p>
          <div className='relative'>
            <div
              ref={scrollContainerRef}
              onMouseEnter={() => scrollHook.showArrow()}
              onMouseLeave={() => scrollHook.removeArrow()}
              onScroll={() => scrollHook.updateScrollLeft()}
              className='no-scrollbar flex flex-row gap-4 overflow-x-scroll'
            >
              {recommendations.map((item) => (
                <RecommendationTile key={item.id} recommendation={item} />
              ))}
            </div>

            <div
              onMouseEnter={scrollHook.showArrow}
              onClick={scrollHook.handleScrollBack}
              className={`${!isVisibleBack ? 'hidden' : ''} absolute top-[42%] flex h-[120px] w-[50px] -translate-y-1/2 cursor-pointer justify-center bg-transparent px-2 hover:bg-black hover:bg-opacity-55`}
            >
              <ArrowBackIcon className='size-7 h-[120px] align-middle' />
            </div>
            <div
              onMouseEnter={scrollHook.showArrow}
              onClick={scrollHook.handleScrollNext}
              className={`${!isVisibleNext ? 'hidden' : ''} absolute right-[15px] top-[42%] flex h-[120px] w-[50px] -translate-y-1/2 cursor-pointer justify-center bg-transparent hover:bg-black hover:bg-opacity-55`}
            >
              <ArrowNextIcon className='size-7 h-[120px] align-middle' />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendationList;
