export interface TrendingAll {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  backdrop_path: string;
  id: number;
  title: string;
  name: string;
  overview: string;
  poster_path: string;
  media_type: MediaType;
  adult: boolean;
  genre_ids: number[];
  popularity: number;
  release_date: Date;
  first_air_date: Date;

  vote_average: number;
  vote_count: number;
}

export enum MediaType {
  Movie = 'movie',
  Tv = 'tv',
}
