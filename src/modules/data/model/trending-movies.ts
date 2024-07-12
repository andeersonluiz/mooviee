export interface TrendingMovies {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  id: number;
  popularity: number;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
}
