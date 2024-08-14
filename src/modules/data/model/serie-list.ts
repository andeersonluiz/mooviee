import { MediaType } from './media-type';

export interface SerieList {
  page: number;
  results: Serie[];
  total_pages: number;
  total_results: number;
  media_type: MediaType;
}

export interface Serie {
  adult: boolean;
  id: number;
  popularity: number;
  poster_path: string;
  first_air_date: Date;
  name: string;
  vote_average: number;
  vote_count: number;
}
