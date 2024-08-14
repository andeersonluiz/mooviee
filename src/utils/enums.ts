export enum MovieListType {
  POPULAR,
  TOP_RATED,
  UPCOMING,
  NOW_PLAYING,
}

export enum MovieFilterType {
  POPULARITY = 'popularity',
  TITLE = 'title',
  REVENUE = 'revenue',
  RATING = 'rating',
  RELEASE_DATE = 'release-date',
}

export enum SerieListType {
  POPULAR,
  TOP_RATED,
  ON_THE_AIR,
  UPCOMING,
}

export enum SerieFilterType {
  POPULARITY = 'popularity',
  RATING = 'rating',
  AIR_DATE = 'air-date',
}

export enum TagType {
  TRENDING = 'trending',
  NOW_PLAYING = 'now-playing',
  NEXT_WEEK = 'next-week',
}

export enum TrendingType {
  DAY = 'day',
  WEEK = 'week',
}

export enum LeaderboardType {
  POPULAR,
  TOP_RATED,
  UPCOMING,
}

export enum ItemType {
  MOVIE,
  SERIE,
}

export enum Status {
  ReturningSeries = 'Returning Series',
  Planned = 'Planned',
  InProduction = 'In Production',
  Ended = 'Ended',
  Canceled = 'Canceled',
  Pilot = 'Pilot',
  Rumored = 'Rumored',
  Released = 'Released',
}
