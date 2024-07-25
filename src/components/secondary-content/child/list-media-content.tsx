import { TrendingAll } from '@/modules/data/model/trending-all';
import { TrendingType } from '@/utils/enums';
import { getMoveValue } from '@/utils/functions';
import { useTranslations } from 'next-intl';
import { use, useEffect, useRef, useState } from 'react';
import MediaTile from './media_tile';
import { MediaType } from '@/modules/data/model/media-type';

const ListMedia = ({ data, mediaType = null }: { data: any; mediaType?: MediaType | null }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const isStart = useRef(true);
  const isEnd = useRef(false);
  const scrollLeft = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisibleNext, setIsVisibleNext] = useState(false);
  const [isVisibleBack, setIsVisibleBack] = useState(false);

  const handleScrollNext = () => {
    const container = scrollContainerRef.current;
    const moveValue = getMoveValue(document.getElementById('id_trending_week')?.offsetWidth!, 12);
    const value = container!.scrollLeft + moveValue;

    container!.scrollTo({
      left: value,
      behavior: 'smooth', // Opção para animação suave (opcional)
    });
  };
  const handleScrollBack = () => {
    isEnd.current = false;
    const container = scrollContainerRef.current;

    const moveValue = -getMoveValue(document.getElementById('id_trending_week')?.offsetWidth!, 12);
    container!.scrollTo({
      left: container!.scrollLeft + moveValue,
      behavior: 'smooth', // Opção para animação suave (opcional)
    });
  };

  const updateScrollLeft = () => {
    const container = scrollContainerRef.current!;
    scrollLeft.current = container.scrollLeft;
    const moveValue = document.getElementById('id_trending_week')?.offsetWidth!;

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
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (isLoaded) {
      scrollContainerRef.current?.addEventListener('mouseenter', showArrow);
      //quando sai do container o evento mouseleva é acionado, entao é necessario adicionar esses eventos
      nextRef.current?.addEventListener('mouseenter', showArrow);
      backRef.current?.addEventListener('mouseenter', showArrow);
      scrollContainerRef.current?.addEventListener('mouseleave', removeArrow);
      scrollContainerRef.current?.addEventListener('scrollend', updateScrollLeft);
    }
  }, [isLoaded]);

  return (
    <div
      className={`${isLoaded ? 'opacity-100' : 'opacity-0'} relative flex flex-row overflow-hidden transition-opacity duration-300`}
    >
      <div
        ref={scrollContainerRef}
        id='id_trending_week'
        className='flex flex-row gap-5 px-8 py-8 align-top scrollbar-hide sm:overflow-x-scroll md:overflow-hidden'
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
        ref={backRef}
        onClick={handleScrollBack}
        className={`${!isVisibleBack ? 'hidden' : ''} absolute top-[75px] ml-8 h-[150px] w-[50px] cursor-pointer rounded-md bg-opacity-30 px-2 hover:bg-black hover:bg-opacity-55`}
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
          handleScrollNext();
        }}
        className={`${!isVisibleNext ? 'hidden' : ''} absolute right-[0.1%] top-[75px] h-[150px] w-[50px] cursor-pointer rounded-md bg-transparent px-2 hover:bg-black hover:bg-opacity-55`}
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
  );
};

export default ListMedia;
