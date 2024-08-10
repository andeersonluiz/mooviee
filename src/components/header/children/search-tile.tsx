import DivTile from '@/components/custom-tags/divTile';
import { BASE_IMAGE_URL } from '@/config/settings';
import { MediaType } from '@/modules/data/model/media-type';
import { Result } from '@/modules/data/model/multi-list';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import placeholder from '../../../../assets/placeholder.png';

const SearchTile = ({ media }: { media: Result }) => {
  const isMovie = media.media_type == MediaType.Movie;
  const isSerie = media.media_type == MediaType.Tv;
  const tSearch = useTranslations('search');
  const [image, setImage] = useState(
    `${BASE_IMAGE_URL}${media.poster_path}`
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImage, setIsLoadingImage] =
    useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);
  const locale = window.location.href.split(/\/(en|br)/)[1];

  return (
    <DivTile
      path={`/${locale}/${isMovie ? 'movie' : 'serie'}/${media.id}`}
      className={`${isLoading ? 'opacity-0' : 'opacity-100'} flex w-full cursor-pointer px-4 py-2 transition-opacity duration-300 hover:bg-gray-900`}
    >
      <Image
        alt='image'
        src={image == '' ? placeholder : image}
        width={150 / 1.5}
        height={225 / 1.5}
        onError={() => setImage('')}
        onLoad={() => setIsLoadingImage(false)}
        className={`${isLoadingImage ? 'opacity-0' : 'opacity-100'} h-[150px] w-[100px] bg-cover transition-opacity duration-300`}
      />
      <div className='flex w-full flex-col gap-2 px-4'>
        <p className='w-fit rounded-lg border-1 p-[3px] text-sm text-white'>
          {isMovie
            ? tSearch('movie_tag')
            : isSerie
              ? tSearch('serie_tag')
              : tSearch('person_tag')}
        </p>

        <p className='line-clamp-2 text-lg font-bold text-white'>
          {isMovie
            ? media.title
            : isSerie
              ? media.name
              : media.original_name}
        </p>

        <p className='line-clamp-2 text-sm text-white'>
          {isMovie
            ? media.overview
            : isSerie
              ? media.overview
              : media.known_for_department}
        </p>
      </div>
    </DivTile>
  );
};

export default SearchTile;
