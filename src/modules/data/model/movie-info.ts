import { Status } from '@/utils/enums';
import { MediaType } from './media-type';

export interface MovieInfo {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  id: number;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: Status;
  tagline: string;
  vote_average: number;
  vote_count: number;
  certification_value: string;
  credits: Credits;
  recommendations: Recommendations[];
  videos: VideosInfo[];
}

interface VideosInfo {
  key: string;
  type: string;
}
interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Credits {
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
  character?: string;
  order?: number;
  department?: string;
  job?: string;
}

interface Genre {
  id: number;
  name: string;
}

export interface Recommendations {
  id: number;
  title: string;
  poster_path: string;
  media_type: MediaType;
}
