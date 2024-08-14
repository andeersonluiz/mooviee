'use client';

import { MoviesAndShowsRepository } from '@/modules/domain/repositories/movies-and-shows-repository';
import {
  LeaderboardType,
  MovieFilterType,
  MovieListType,
  SerieFilterType,
  SerieListType,
  TrendingType,
} from '@/utils/enums';
import { ApiService } from '../datasource/api-service';
import { CollectionInfo } from '../model/collection-info';
import { CollectionList } from '../model/collection-list';
import { Leaderboarder } from '../model/leaderboard';
import { MediaType } from '../model/media-type';
import { MovieInfo } from '../model/movie-info';
import { MovieList } from '../model/movie-list';
import { MultiList } from '../model/multi-list';
import { PersonInfo } from '../model/person-info';
import { Genre, SerieInfo } from '../model/serie-info';
import { SerieList } from '../model/serie-list';
import { TrendingAll } from '../model/trending-all';
import { TrendingMovies } from '../model/trending-movies';
import { TrendingSeries } from '../model/trending-series';

export class MoviesAndShowsRepositoryImpl
  implements MoviesAndShowsRepository
{
  private readonly apiService: ApiService;
  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async getGenreList(
    locale: string
  ): Promise<Genre[] | null> {
    return await this.apiService.getGenreList(locale);
  }

  async getMovies(
    locale: string,
    type: MovieListType,
    page: number
  ): Promise<MovieList | null> {
    return await this.apiService.getMovies(
      locale,
      type,
      page
    );
  }

  async getMoviesAll(
    locale: string,
    type: MovieFilterType,
    page: number,
    desc: boolean
  ): Promise<MovieList | null> {
    return await this.apiService.getMoviesAll(
      locale,
      type,
      page,
      desc
    );
  }

  async getSeries(
    locale: string,
    type: SerieListType,
    page: number
  ): Promise<SerieList | null> {
    return await this.apiService.getSeries(
      locale,
      type,
      page
    );
  }

  async getSeriesAll(
    locale: string,
    type: SerieFilterType,
    page: number,
    desc: boolean
  ): Promise<SerieList | null> {
    return await this.apiService.getSeriesAll(
      locale,
      type,
      page,
      desc
    );
  }

  async getMovieInfo(
    id: number,
    locale: string
  ): Promise<MovieInfo | null> {
    return await this.apiService.getMovieInfo(id, locale);
  }
  async getSerieInfo(
    id: number,
    locale: string
  ): Promise<SerieInfo | null> {
    return await this.apiService.getSerieInfo(id, locale);
  }
  async getPersonInfo(
    id: number,
    locale: string
  ): Promise<PersonInfo | null> {
    return await this.apiService.getPersonInfo(id, locale);
  }
  async getCollectionInfo(
    id: number,
    locale: string
  ): Promise<CollectionInfo | null> {
    return await this.apiService.getCollectionInfo(
      id,
      locale
    );
  }

  async searchCollections(
    query: string,
    locale: string
  ): Promise<CollectionList | null> {
    return await this.apiService.searchCollections(
      query,
      locale
    );
  }

  async searchMulti(
    query: string,
    locale: string
  ): Promise<MultiList | null> {
    return await this.apiService.searchMulti(query, locale);
  }

  async getTrendingMovies(
    locale: string,
    type: TrendingType
  ): Promise<TrendingMovies | null> {
    return await this.apiService.getTrendingMovies(
      locale,
      type
    );
  }
  async getTrendingSeries(
    locale: string,
    type: TrendingType
  ): Promise<TrendingSeries | null> {
    return await this.apiService.getTrendingSeries(
      locale,
      type
    );
  }
  async getTrendingAll(
    locale: string,
    type: TrendingType,
    page: number
  ): Promise<TrendingAll | null> {
    return await this.apiService.getTrendingAll(
      locale,
      type,
      page
    );
  }

  async getleaderboard(
    locale: string,
    type: LeaderboardType
  ): Promise<Leaderboarder[] | null> {
    let movies: MovieList | null, series: SerieList | null;
    let promiseMovies: Promise<MovieList | null>,
      promiseSeries: Promise<SerieList | null>;
    switch (type) {
      case LeaderboardType.POPULAR:
        promiseMovies = this.apiService.getMovies(
          locale,
          MovieListType.POPULAR,
          1
        );
        promiseSeries = this.apiService.getSeries(
          locale,
          SerieListType.POPULAR
        );
        [movies, series] = await Promise.all([
          promiseMovies,
          promiseSeries,
        ]);
        break;
      case LeaderboardType.TOP_RATED:
        promiseMovies = this.apiService.getMovies(
          locale,
          MovieListType.TOP_RATED
        );
        promiseSeries = this.apiService.getSeries(
          locale,
          SerieListType.TOP_RATED
        );
        [movies, series] = await Promise.all([
          promiseMovies,
          promiseSeries,
        ]);
        break;
      case LeaderboardType.UPCOMING:
        movies = await this.apiService.getMovies(
          locale,
          MovieListType.UPCOMING
        );
        series = await this.apiService.getSeries(
          locale,
          SerieListType.UPCOMING
        );
        break;
    }
    if (movies == null || series == null) {
      return null;
    }
    const allData = [
      ...movies?.results!,
      ...series?.results!,
    ] as unknown as Leaderboarder[];
    if (type == LeaderboardType.TOP_RATED) {
      allData.sort(
        (a, b) => b.vote_average - a.vote_average
      );
    } else {
      allData.sort((a, b) => b.popularity - a.popularity);
    }

    const result = allData.slice(0, 20);
    result.forEach((item) => {
      if (typeof item.name == 'undefined') {
        item.media_type = MediaType.Movie;
      } else {
        item.media_type = MediaType.Tv;
      }
    });
    return result;
  }
}
