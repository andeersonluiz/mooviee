'use client';
import { CollectionInfo } from '@/modules/data/model/collection-info';
import { CollectionList } from '@/modules/data/model/collection-list';
import { Leaderboarder } from '@/modules/data/model/leaderboard';
import { MovieInfo } from '@/modules/data/model/movie-info';
import { MovieList } from '@/modules/data/model/movie-list';
import { MultiList } from '@/modules/data/model/multi-list';
import { PersonInfo } from '@/modules/data/model/person-info';
import { Genre, SerieInfo } from '@/modules/data/model/serie-info';

import { SerieList } from '@/modules/data/model/serie-list';
import { TrendingAll } from '@/modules/data/model/trending-all';
import { TrendingMovies } from '@/modules/data/model/trending-movies';
import { TrendingSeries } from '@/modules/data/model/trending-series';
import { LeaderboardType, MovieListType, SerieListType, TrendingType } from '@/utils/enums';

export interface MoviesAndShowsRepository {
  getMovies(locale: string, type: MovieListType): Promise<MovieList | null>;
  getSeries(locale: string, type: SerieListType): Promise<SerieList | null>;

  getMovieInfo(id: number, locale: string): Promise<MovieInfo | null>;
  getSerieInfo(id: number, locale: string): Promise<SerieInfo | null>;
  getPersonInfo(id: number, locale: string): Promise<PersonInfo | null>;
  getCollectionInfo(id: number, locale: string): Promise<CollectionInfo | null>;

  getGenreList(locale: string): Promise<Genre[] | null>;

  searchCollections(query: string, locale: string): Promise<CollectionList | null>;
  searchMulti(query: string, locale: string): Promise<MultiList | null>;

  getTrendingMovies(locale: string, type: TrendingType): Promise<TrendingMovies | null>;
  getTrendingSeries(locale: string, type: TrendingType): Promise<TrendingSeries | null>;
  getTrendingAll(locale: string, type: TrendingType): Promise<TrendingAll | null>;

  getleaderboard(locale: string, type: LeaderboardType): Promise<Leaderboarder[] | null>;
}
