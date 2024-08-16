import { Status } from '@/utils/enums';
import { MediaType } from './media-type';

export interface SerieInfo {
  adult: boolean;
  backdrop_path: string;
  episode_run_time: number[];
  first_air_date: string;
  last_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  last_episode_to_air: TEpisodeToAir;
  name: string;
  next_episode_to_air: TEpisodeToAir;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  overview: string;
  popularity: number;
  poster_path: string;
  status: Status;
  tagline: string;
  vote_average: number;
  vote_count: number;
  certification_value: string;
  aggregate_credits: AggregateCredits;
  recommendations: Recommendations[];
}

export interface AggregateCredits {
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  roles?: Role[];
  total_episode_count: number;
  order?: number;
  jobs?: Job[];
  department?: string;
}

export interface Job {
  job: string;
  episode_count: number;
}

export interface Role {
  character: string;
  episode_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface TEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  runtime: number | null;
  season_number: number;
  still_path: null | string;
}

export interface Network {
  logo_path: null | string;
  name: string;
}

export interface Recommendations {
  id: number;
  name: string;
  poster_path: string;
  media_type: MediaType;
}
