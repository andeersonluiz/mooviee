import { BASE_IMAGE_URL } from '@/config/settings';
import { Recommendations } from '@/modules/data/model/serie-info';
import Image from 'next/image';
import { useState } from 'react';
import placeholder from '../../../../assets/placeholder.png';
import DivTile from '@/components/custom-tags/divTile';
import { MediaType } from '@/modules/data/model/media-type';
import { useTranslations } from 'next-intl';

const RecommendationTile = ({
  recommendation,
}: {
  recommendation: Recommendations;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [src, setSrc] = useState(
    `${BASE_IMAGE_URL}${recommendation?.poster_path}`
  );
  const t = useTranslations('metadata');
  const isMovie =
    recommendation.media_type == MediaType.Movie;

  return (
    <DivTile
      path={`/${t('language_split')}/${isMovie ? 'movie' : 'serie'}/${recommendation.id}`}
      className='cursor-pointer p-4 hover:bg-neutral-800'
    >
      <Image
        src={src}
        alt={src}
        width={180}
        height={120}
        onError={() => setSrc(placeholder.src)}
        onLoad={async () => {
          setIsLoaded(true);
        }}
        className={`${isLoaded ? 'opacity-100' : 'opacity-0'} h-[180px] w-[120px] bg-cover bg-center shadow-none transition-opacity duration-500 ease-linear`}
      />
      <p
        className={`${isLoaded ? 'opacity-100' : 'opacity-0'} line-clamp-2 w-[120px] pt-2 text-sm font-semibold text-white`}
      >
        {recommendation.name}
      </p>
    </DivTile>
  );
};

export default RecommendationTile;
