import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import { getMoveValue } from '@/utils/functions';
import { RefObject, useRef } from 'react';

export default function useScroll(
  scrollContainerRef: RefObject<HTMLDivElement>,
  setIsVisibleNext: any,
  setIsVisibleBack: any,
  gap: number
) {
  const isEnd = useRef(false);
  const scrollLeft = useRef(0);
  const isStart = useRef(true);
  const userAgentData = useUserAgentData();

  const handleScrollNext = () => {
    const container = scrollContainerRef.current;
    const moveValue = getMoveValue(
      container?.offsetWidth!,
      container!.children[0].scrollWidth,
      gap
    );
    console.log(container!.children[0].scrollWidth);
    const value = container!.scrollLeft + moveValue;

    container!.scrollTo({
      left: value,
      behavior: 'smooth', // Opção para animação suave (opcional)
    });
  };

  const handleScrollBack = () => {
    isEnd.current = false;
    const container = scrollContainerRef.current;
    const moveValue = -getMoveValue(
      container?.offsetWidth!,
      container!.children[0].scrollWidth,
      gap
    );
    container!.scrollTo({
      left: container!.scrollLeft + moveValue,
      behavior: 'smooth', // Opção para animação suave (opcional)
    });
  };

  const updateScrollLeft = () => {
    if (userAgentData.isDesktop) {
      const container = scrollContainerRef.current!;
      scrollLeft.current = container.scrollLeft;
      const moveValue = window.innerWidth;

      if (
        scrollLeft.current + moveValue >=
        container.scrollWidth
      ) {
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
    }
  };
  const showArrow = () => {
    const container = scrollContainerRef.current!;
    if (
      userAgentData.isDesktop &&
      container.scrollWidth > window.innerWidth
    ) {
      if (!isEnd.current) {
        setIsVisibleNext(true);
      }
      if (!isStart.current) {
        setIsVisibleBack(true);
      }
    }
  };

  const removeArrow = () => {
    if (userAgentData.isDesktop) {
      setIsVisibleNext(false);
      setIsVisibleBack(false);
    }
  };

  return {
    updateScrollLeft,
    handleScrollNext,
    handleScrollBack,
    showArrow,
    removeArrow,
  };
}
