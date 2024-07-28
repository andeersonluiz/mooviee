import { MediaType } from './media-type';

export interface Leaderboarder {
  id: number;
  name: string;
  poster_path: string;
  media_type: MediaType;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  title: string;
  first_air_date: Date;
  release_date: Date;
}
