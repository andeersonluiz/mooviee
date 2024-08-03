import { TrendingAll } from '@/modules/data/model/trending-all';
import { TrendingType } from '@/utils/enums';
import { getMoveValue } from '@/utils/functions';
import { useTranslations } from 'next-intl';
import { use, useEffect, useRef, useState } from 'react';
import { MediaType } from '@/modules/data/model/media-type';
import { headers } from 'next/headers';
import { getDeviceType } from '@/utils/ssr_functions';
import MediaTile from '@/components/secondary-content/child/media-tile';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';

const ListMediaLeadboarder = ({
  data,
  mediaType = null,
  isUpcoming = false,
}: {
  data: any;
  mediaType?: MediaType | null;
  isUpcoming?: boolean;
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
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
        id='id_trending_week'
        className={`flex flex-row gap-0 px-2 pb-4 pt-2 align-top scrollbar-hide ${userAgentData.isDesktop ? 'overflow-hidden' : 'overflow-x-scroll'} xl:gap-5`}
      >
        {data?.map((item: any) => (
          <MediaTile
            key={item.id}
            media={item}
            isUpcoming={isUpcoming}
            onClick={() => null}
            isMovie={
              mediaType == null ? item.media_type == MediaType.Movie : mediaType == MediaType.Movie
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ListMediaLeadboarder;
