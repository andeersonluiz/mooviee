export interface TrendingSeries {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  id: number;
  name: string;
  poster_path: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
}
