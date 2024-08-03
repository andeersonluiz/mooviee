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

export function getMoveValue(width: number, childWidth: number, gap: number, padding = 0) {
  const widthContent = childWidth + padding + gap * 4;

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

export function formatGenres(genre_ids: number[], genres: Genre[]): string[] {
  const listGenres = genre_ids
    .map((item: any) => {
      const res = genres?.find((genre) => genre.id == Number(item));
      if (res) {
        return res.name;
      }
    })
    .filter((name): name is string => name !== undefined);
  return listGenres;
}

export function convertDateToLocal(date: Date, locale: string) {
  return Intl.DateTimeFormat(locale).format(new Date(date));
}

export function getType(text: any) {
  if (text.title != null) {
    return { isMovie: true, isSerie: false, isPerson: false };
  } else if (text.name != null) {
    return { isMovie: true, isSerie: false, isPerson: false };
  }
}

export function convertRunTime(minutes: number) {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}hrs ${remainingMinutes}mins`;
  } else {
    return `${minutes}mins`;
  }
}
