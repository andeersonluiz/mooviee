import { MediaType } from './media-type';

export interface PersonInfo {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: Date;
  deathday: Date;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  combined_credits: CombinedCredits;
}

export interface CombinedCredits {
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult: boolean;
  genre_ids: number[];
  id: number;
  popularity: number;
  poster_path: string;
  release_date?: Date;
  title?: string;
  vote_average: number;
  vote_count: number;
  character?: string;
  credit_id: string;
  order?: number;
  media_type: MediaType;
  original_name?: string;
  first_air_date?: Date;
  name?: string;
  episode_count?: number;
  department?: string;
  job?: string;
}
