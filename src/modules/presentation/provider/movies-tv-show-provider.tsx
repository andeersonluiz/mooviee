'use client';

import { MoviesAndShowsRepository } from '@/modules/domain/repositories/movies-and-shows-repository';
import { MoviesAndShowsRepositoryImpl } from '@/modules/data/repositories/movies-and-shows-repository-impl';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ApiService } from '@/modules/data/datasource/api-service';
import GetCollectionInfoUseCase from '@/modules/domain/useCases/get-collection-info-usecase';
import GetMovieInfoUseCase from '@/modules/domain/useCases/get-movie-info-usecase';
import GetMoviesUseCase from '@/modules/domain/useCases/get-movies-usecase';
import GetPersonInfoUseCase from '@/modules/domain/useCases/get-series-usecase';
import GetSeriesInfoUseCase from '@/modules/domain/useCases/get-series-info-usecase';
import SearchCollectionUseCase from '@/modules/domain/useCases/search-collection-usecase';
import SearchMultiUseCase from '@/modules/domain/useCases/search-multi-usecase';
import GetTrendingMoviesUseCase from '@/modules/domain/useCases/get-trending-movies-usecase';
import GetTrendingSeriesUseCase from '@/modules/domain/useCases/get-trending-series-usecase';
import GetSeriesUseCase from '@/modules/domain/useCases/get-series-usecase';
import GetGenreListUseCase from '@/modules/domain/useCases/get-genre-list-usecase';
import GetTrendingAllUseCase from '@/modules/domain/useCases/get-trending-all-usecase';
import GetLeaderboardUseCase from '@/modules/domain/useCases/get-leaderboard-usecase';
import { Genre } from '@/modules/data/model/serie-info';
import { useTranslations } from 'next-intl';

export interface MoviesAndTvShowProps {
  getCollectionInfoUseCase: GetCollectionInfoUseCase;
  getMovieInfoUseCase: GetMovieInfoUseCase;
  getMoviesUseCase: GetMoviesUseCase;
  getPersonInfoUseCase: GetPersonInfoUseCase;
  getSeriesInfoUseCase: GetSeriesInfoUseCase;
  getSeriesUseCase: GetSeriesUseCase;
  getTrendingMoviesUseCase: GetTrendingMoviesUseCase;
  getTrendingSeriesUseCase: GetTrendingSeriesUseCase;
  searchCollectionUseCase: SearchCollectionUseCase;
  searchMultiUseCase: SearchMultiUseCase;
  getTrendingAllUseCase: GetTrendingAllUseCase;
  getLeaderboardUseCase: GetLeaderboardUseCase;
  getGenreListUseCase: GetGenreListUseCase;
}

interface GenreProps {
  listGenres: Genre[] | null;
}

export const MovieAndTvShowContext = createContext<MoviesAndTvShowProps | null>(null);
export const GenreContext = createContext<GenreProps | null>(null);
export const UserAgentContext = createContext<string | null>(null);

export const MoviesAndTvShowProvider = ({ children }: { children: React.ReactNode }) => {
  const apiService: ApiService = new ApiService();
  const moviesAndTvShowRepository: MoviesAndShowsRepository = new MoviesAndShowsRepositoryImpl(
    apiService
  );

  const getMoviesUseCase = new GetMoviesUseCase(moviesAndTvShowRepository);
  const getCollectionInfoUseCase = new GetCollectionInfoUseCase(moviesAndTvShowRepository);
  const getMovieInfoUseCase = new GetMovieInfoUseCase(moviesAndTvShowRepository);
  const getPersonInfoUseCase = new GetPersonInfoUseCase(moviesAndTvShowRepository);
  const getSeriesInfoUseCase = new GetSeriesInfoUseCase(moviesAndTvShowRepository);
  const getSeriesUseCase = new GetSeriesUseCase(moviesAndTvShowRepository);
  const getTrendingMoviesUseCase = new GetTrendingMoviesUseCase(moviesAndTvShowRepository);
  const getTrendingSeriesUseCase = new GetTrendingSeriesUseCase(moviesAndTvShowRepository);
  const searchCollectionUseCase = new SearchCollectionUseCase(moviesAndTvShowRepository);
  const searchMultiUseCase = new SearchMultiUseCase(moviesAndTvShowRepository);
  const getTrendingAllUseCase = new GetTrendingAllUseCase(moviesAndTvShowRepository);
  const getLeaderboardUseCase = new GetLeaderboardUseCase(moviesAndTvShowRepository);

  const getGenreListUseCase = new GetGenreListUseCase(moviesAndTvShowRepository);

  return (
    <MovieAndTvShowContext.Provider
      value={{
        getCollectionInfoUseCase,
        getMovieInfoUseCase,
        getMoviesUseCase,
        getPersonInfoUseCase,
        getSeriesInfoUseCase,
        getSeriesUseCase,
        getTrendingMoviesUseCase,
        getTrendingSeriesUseCase,
        searchCollectionUseCase,
        searchMultiUseCase,
        getTrendingAllUseCase,
        getLeaderboardUseCase,
        getGenreListUseCase,
      }}
    >
      {children}
    </MovieAndTvShowContext.Provider>
  );
};
