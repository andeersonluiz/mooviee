import useScroll from '@/hooks/scroll';
import { AggregateCredits, SerieInfo } from '@/modules/data/model/serie-info';
import { convertRunTime } from '@/utils/functions';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import CastTile from './cast-tile';
import ArrowBackIcon from '@/components/icon/arrow-back-icon';
import ArrowNextIcon from '@/components/icon/arrow-next-icon';
import ArrowGoIcon from '@/components/icon/arrow-go-icon';

const CastList = ({ credits }: { credits: AggregateCredits }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tSerieInfo = useTranslations('serieInfo');

  const [isVisibleNext, setIsVisibleNext] = useState(false);
  const [isVisibleBack, setIsVisibleBack] = useState(false);
  const scrollHook = useScroll(scrollContainerRef, setIsVisibleNext, setIsVisibleBack, 4);

  return (
    <>
      {credits.cast.length != 0 && (
        <div className='flex w-full flex-col p-0 pr-4'>
          <div className='flex flex-row items-center pb-4 pl-4 pt-16'>
            <p className='pr-4 text-2xl font-bold text-white'>{tSerieInfo('cast')}</p>

            <div className='flex cursor-pointer flex-row items-center' onClick={() => null}>
              <p className={`text-lg text-slate-100`}>{`${tSerieInfo('viewAll')}`}</p>
              <ArrowGoIcon className='size-7 stroke-slate-100' />
            </div>
          </div>
          <div className='relative'>
            <div
              ref={scrollContainerRef}
              onMouseEnter={() => scrollHook.showArrow()}
              onMouseLeave={() => scrollHook.removeArrow()}
              onScroll={() => scrollHook.updateScrollLeft()}
              className='no-scrollbar flex flex-row gap-4 overflow-x-scroll'
            >
              {credits.cast.map((item) => (
                <CastTile key={item.id} cast={item} />
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

export default CastList;
