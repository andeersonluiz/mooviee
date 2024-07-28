import {
  gapTrendingContainer,
  paddingLeftTrendingContainer,
  widthCatalogTrending,
} from '@/styles/style-values';
import { Genre } from '@/modules/data/model/serie-info';
import { headers } from 'next/headers';

function roundNumber(number: number): number {
  // Se a parte decimal do número for maior que 0.85, arredonde para cima
  if (number % 1 < 0.85) {
    return Math.ceil(number) - 1;
  } else {
    // Caso contrário, mantenha o número original
    return number;
  }
}

export function getMoveValue(width: number, padding = 0) {
  const widthContent = widthCatalogTrending + padding + gapTrendingContainer * 4;

  let size = 0;
  let totalSum = 0;
  while (totalSum <= width) {
    totalSum += widthContent;
    size = size + 1;
  }
  let restSize = 1;
  if (totalSum - width > 0) {
    restSize = (widthContent - (totalSum - width)) / widthContent;
  }
  /*console.log('totalSum', totalSum);
  console.log(width, width);
  console.log('(totalSum - width)', totalSum - width);
  console.log('widthContent', widthContent);
  console.log('size', size);
  console.log('restSize', restSize);*/
  if (restSize < 0.85) {
    size -= 1;
  }
  let sumValue = size * widthContent;
  //console.log('sumValue', sumValue);

  return sumValue;
}

export function getMinMaxDate() {
  var date = new Date();
  const dayMin = String(date.getDate()).padStart(2, '0');
  const monthMin = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa do 0 em JavaScript
  const yearMin = date.getFullYear();

  const minDate = `${yearMin}-${monthMin}-${dayMin}`;

  date.setDate(date.getDate() + 31);

  const dayMax = String(date.getDate()).padStart(2, '0');
  const monthMax = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa do 0 em JavaScript
  const yearMax = date.getFullYear();

  const maxDate = `${yearMax}-${monthMax}-${dayMax}`;

  return [minDate, maxDate];
}

export function formatGenres(genre_ids: number[], genres: Genre[]): string {
  return genre_ids
    .map((item: any) => {
      const res = genres?.find((genre) => genre.id == Number(item));
      if (res) {
        return res.name;
      }
    })
    .join(', ');
}

export function convertDateToLocal(date: Date, locale: string) {
  return Intl.DateTimeFormat(locale).format(new Date(date));
}

export const getDeviceType = async () => {
  const { headers } = await import('next/headers');
  const userAgent = headers().get('user-agent');

  if (userAgent != null) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);
    return {
      isMobile,
      isTablet,
      isDesktop: !isMobile && !isTablet,
    };
  } else {
    return { isMobile: false, isTablet: false, isDesktop: false };
  }
};
