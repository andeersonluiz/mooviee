export interface MovieList {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
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
