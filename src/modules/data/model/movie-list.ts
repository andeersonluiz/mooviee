import { MediaType } from './media-type';

export interface MovieList {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
  dates?: Dates;
  media_type: MediaType;
}

export interface Movie {
  adult: boolean;
  id: number;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface Dates {
  maximum: Date;
  minimum: Date;
}
