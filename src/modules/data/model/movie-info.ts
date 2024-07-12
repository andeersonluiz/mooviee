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
  release_date: Date;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  certification_value: string;
  credits: Credits;
  recommendations: Recommendations[];
}

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface Credits {
  cast: Cast[];
  crew: Cast[];
}

interface Cast {
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

interface Recommendations {
  id: number;
  title: string;
  poster_path: string;
}
