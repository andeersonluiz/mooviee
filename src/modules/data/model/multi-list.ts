import { MediaType } from './media-type';

export interface MultiList {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  id: number;
  name: string;
  poster_path: string;
  media_type: MediaType;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  title: string;
  known_for_department: string;
}
