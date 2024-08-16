import { Cast } from '@/modules/data/model/movie-info';
import { Genre } from '@/modules/data/model/serie-info';

export function getMoveValue(
  width: number,
  childWidth: number,
  gap: number,
  padding = 0
) {
  const widthContent = childWidth + padding + gap * 4;

  let size = 0;
  let totalSum = 0;
  while (totalSum <= width) {
    totalSum += widthContent;
    size = size + 1;
  }
  let restSize = 1;
  if (totalSum - width > 0) {
    restSize =
      (widthContent - (totalSum - width)) / widthContent;
  }

  if (restSize < 0.85) {
    size -= 1;
  }
  const sumValue = size * widthContent;

  return sumValue;
}

export function getMinMaxDate() {
  const date = new Date();
  const dayMin = String(date.getDate()).padStart(2, '0');
  const monthMin = String(date.getMonth() + 1).padStart(
    2,
    '0'
  );
  const yearMin = date.getFullYear();

  const minDate = `${yearMin}-${monthMin}-${dayMin}`;

  date.setDate(date.getDate() + 31);

  const dayMax = String(date.getDate()).padStart(2, '0');
  const monthMax = String(date.getMonth() + 1).padStart(
    2,
    '0'
  );
  const yearMax = date.getFullYear();

  const maxDate = `${yearMax}-${monthMax}-${dayMax}`;

  return [minDate, maxDate];
}

export function formatGenres(
  genre_ids: number[],
  genres: Genre[]
): string[] {
  const listGenres = genre_ids
    .map((item: any) => {
      const res = genres?.find(
        (genre) => genre.id == Number(item)
      );
      if (res) {
        return res.name;
      }
    })
    .filter((name): name is string => name !== undefined);
  return listGenres;
}

export function convertDateToLocal(
  date: Date,
  locale: string
) {
  return Intl.DateTimeFormat(locale).format(new Date(date));
}

export function getType(text: any) {
  if (text.title != null) {
    return {
      isMovie: true,
      isSerie: false,
      isPerson: false,
    };
  } else if (text.name != null) {
    return {
      isMovie: true,
      isSerie: false,
      isPerson: false,
    };
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

export function getEnumKeyByValue(
  enumObj: any,
  value: string
): string | undefined {
  return Object.keys(enumObj).find(
    (key) => enumObj[key] === value
  );
}

export function removeDuplicatesById(arr: any) {
  const seen = new Set<number>();
  return arr.filter((item: any) => {
    if (seen.has(item.id)) {
      return false;
    } else {
      seen.add(item.id);
      return true;
    }
  });
}

export function generateCrewTags(arr: Cast[]) {
  const listTags: string[] = [];
  arr.forEach((item) => {
    if (
      item.department != null &&
      !listTags.includes(item.department)
    ) {
      listTags.push(item.department);
    }
  });
  listTags.sort();
  return listTags;
}
