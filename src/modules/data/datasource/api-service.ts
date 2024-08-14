'use client';

import { getMinMaxDate } from '@/utils/functions';
import { API_TMDB_KEY } from '../../../config/keys';
import {
  ItemType,
  MovieFilterType,
  MovieListType,
  SerieFilterType,
  SerieListType,
  TrendingType,
} from '../../../utils/enums';
import { CollectionInfo } from '../model/collection-info';
import { CollectionList } from '../model/collection-list';
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

/* eslint-disable  @typescript-eslint/no-explicit-any */
export class ApiService {
  async getMovies(
    locale: string,
    type: MovieListType = MovieListType.POPULAR,
    page: number = 1
  ): Promise<MovieList | null> {
    console.log('call (getMovies) from datasource', locale);
    let url = '';
    switch (type) {
      case MovieListType.POPULAR:
        url = `https://api.themoviedb.org/3/movie/popular?language=${locale}&page=${page}&api_key=${API_TMDB_KEY}`;
        break;
      case MovieListType.TOP_RATED:
        url = `https://api.themoviedb.org/3/movie/top_rated?language=${locale}&page=${page}&api_key=${API_TMDB_KEY}`;
        break;
      case MovieListType.UPCOMING:
        const [minDate, maxDate] = getMinMaxDate();
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_TMDB_KEY}&language=${locale}&sort_by=popularity.desc&primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}&page=${page}`;
        break;
      case MovieListType.NOW_PLAYING:
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_TMDB_KEY}&language=${locale}&page=${page}&region=${locale.split('-')[1]}`;
        break;

      default:
        return null;
    }

    try {
      const res = await fetch(url);
      const json = await res.json();
      const result = json as MovieList;
      if ('results' in result) {
        result.media_type = MediaType.Movie;

        return result;
      }
      return null;
    } catch (e: any) {
      console.log('Error', e.stack);
      return null;
    }
  }
  async getMoviesAll(
    locale: string,
    type: MovieFilterType,
    page: number,
    desc: boolean
  ): Promise<MovieList | null> {
    let url = '';

    switch (type) {
      case MovieFilterType.POPULARITY:
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${locale}&page=${page}&sort_by=popularity.${desc ? 'desc' : 'asc'}&api_key=${API_TMDB_KEY}`;
        break;
      case MovieFilterType.TITLE:
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${locale}&page=${page}&sort_by=title.${desc ? 'desc' : 'asc'}&api_key=${API_TMDB_KEY}`;
        break;
      case MovieFilterType.REVENUE:
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${locale}&page=${page}&sort_by=revenue.${desc ? 'desc' : 'asc'}&api_key=${API_TMDB_KEY}`;
        break;
      case MovieFilterType.RATING:
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${locale}&page=${page}&sort_by=vote_average.${desc ? 'desc' : 'asc'}&api_key=${API_TMDB_KEY}`;
        break;
      case MovieFilterType.RELEASE_DATE:
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${locale}&page=${page}&sort_by=primary_release_date.${desc ? 'desc' : 'asc'}&api_key=${API_TMDB_KEY}`;
        break;
      default:
        return null;
    }
    try {
      const res = await fetch(url);
      const json = await res.json();
      const result = json as MovieList;
      if ('results' in result) {
        result.media_type = MediaType.Movie;
        return result;
      }
      return null;
    } catch (e: any) {
      console.log('Error', e.stack);
      return null;
    }
  }

  async getSeries(
    locale: string,
    type: SerieListType = SerieListType.POPULAR,
    page: number = 1
  ): Promise<SerieList | null> {
    let url = '';
    switch (type) {
      case SerieListType.POPULAR:
        url = `https://api.themoviedb.org/3/tv/popular?language=${locale}&page=${page}&api_key=${API_TMDB_KEY}`;
        break;
      case SerieListType.TOP_RATED:
        url = `https://api.themoviedb.org/3/tv/top_rated?language=${locale}&page=${page}&api_key=${API_TMDB_KEY}`;
        break;
      case SerieListType.ON_THE_AIR:
        url = `https://api.themoviedb.org/3/tv/on_the_air?language=${locale}&page=${page}&api_key=${API_TMDB_KEY}`;
        break;
      case SerieListType.UPCOMING:
        const [minDate, maxDate] = getMinMaxDate();
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_TMDB_KEY}&language=${locale}S&sort_by=popularity.desc&first_air_date.gte=${minDate}&first_air_date.lte=${maxDate}&page=${page}`;

        break;
      default:
        return null;
    }

    try {
      const res = await fetch(url);
      const json = await res.json();
      const result = json as SerieList;

      if ('results' in result) {
        result.media_type = MediaType.Tv;

        return result;
      }
      return null;
    } catch (e: any) {
      console.log('Error', e.stack);

      return null;
    }
  }

  async getSeriesAll(
    locale: string,
    type: SerieFilterType,
    page: number,

    desc: boolean
  ): Promise<SerieList | null> {
    let url = '';

    switch (type) {
      case SerieFilterType.POPULARITY:
        url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=${locale}&page=${page}&sort_by=popularity.${desc ? 'desc' : 'asc'}&api_key=${API_TMDB_KEY}`;
        break;
      case SerieFilterType.RATING:
        url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=${locale}&page=${page}&sort_by=vote_average.${desc ? 'desc' : 'asc'}&api_key=${API_TMDB_KEY}`;
        break;
      case SerieFilterType.AIR_DATE:
        url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=${locale}&page=${page}&sort_by=first_air_date.${desc ? 'desc' : 'asc'}&api_key=${API_TMDB_KEY}`;
        break;
      default:
        return null;
    }
    try {
      const res = await fetch(url);
      const json = await res.json();
      const result = json as SerieList;
      if ('results' in result) {
        result.media_type = MediaType.Tv;
        return result;
      }
      return null;
    } catch (e: any) {
      console.log('Error', e.stack);
      return null;
    }
  }

  async getMovieInfo(
    id: number,
    locale: string
  ): Promise<MovieInfo | null> {
    const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates%2Ccredits%2Crecommendations%2Cproviders%2Cvideos&language=${locale}&api_key=${API_TMDB_KEY}`;

    try {
      const res = await fetch(url);
      const json_value = await res.json();
      const code_country = locale.split('-')[1];
      json_value['certification_value'] =
        this.getCertificationValue(
          json_value,
          code_country,
          ItemType.MOVIE
        );
      if (
        json_value['certification_value'].startsWith(',')
      ) {
        json_value['certification_value'] =
          json_value['certification_value'].slice(1);
      }
      json_value['recommendations'] =
        json_value['recommendations']['results'];

      json_value['videos'] =
        json_value['videos']['results'];

      const result = json_value as MovieInfo;
      return result;
    } catch (e: any) {
      console.log('Error', e.stack);
      return null;
    }
  }

  async getSerieInfo(
    id: number,
    locale: string
  ): Promise<SerieInfo | null> {
    const url = `https://api.themoviedb.org/3/tv/${id}?append_to_response=content_ratings%2Caggregate_credits%2Ckeywords%2Crecommendations&language=${locale}&api_key=${API_TMDB_KEY}`;

    try {
      const res = await fetch(url);
      const json_value = await res.json();
      const code_country = locale.split('-')[1];
      json_value['certification_value'] =
        this.getCertificationValue(
          json_value,
          code_country,
          ItemType.SERIE
        );

      json_value['recommendations'] =
        json_value['recommendations']['results'];

      const result = json_value as SerieInfo;
      return result;
    } catch (e: any) {
      console.log('Error', e.stack);
      return null;
    }
  }

  async getPersonInfo(
    id: number,
    locale: string
  ): Promise<PersonInfo | null> {
    const url = `https://api.themoviedb.org/3/person/${id}?language=${locale}&api_key=${API_TMDB_KEY}`;
    try {
      const res = await fetch(url);
      const result = await res.json();
      if ('id' in result) {
        return result as PersonInfo;
      }
      return null;
    } catch (e: any) {
      console.log('Error', e.stack);
      return null;
    }
  }

  async getCollectionInfo(
    id: number,
    locale: string
  ): Promise<CollectionInfo | null> {
    const url = `https://api.themoviedb.org/3/collection/${id}?language=${locale}&api_key=${API_TMDB_KEY}`;
    try {
      const res = await fetch(url);
      const result = await res.json();
      if ('id' in result) {
        return result as CollectionInfo;
      }
      return null;
    } catch (e: any) {
      console.log('Error', e.stack);
      return null;
    }
  }

  async searchCollections(
    query: string,
    locale: string
  ): Promise<CollectionList | null> {
    const url = `https://api.themoviedb.org/3/search/collection?query=${query}&include_adult=false&language=${locale}&page=1&api_key=${API_TMDB_KEY}`;
    try {
      const res = await fetch(url);
      const result = await res.json();
      if ('results' in result) {
        return result as CollectionList;
      }
      return null;
    } catch (e: any) {
      console.log('Error', e.stack);
      return null;
    }
  }

  async searchMulti(
    query: string,
    locale: string
  ): Promise<MultiList | null> {
    const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=${locale}&page=1&api_key=${API_TMDB_KEY}`;
    try {
      const res = await fetch(url);
      const result = await res.json();
      if ('results' in result) {
        const multiList = result as MultiList;
        multiList.results.map((item) => {
          if (item.media_type == MediaType.Movie) {
            item.name = '';
            item.known_for_department = '';
          } else if (item.media_type == MediaType.Tv) {
            item.title = '';
            item.known_for_department = '';
          } else {
            item.name = '';
            item.poster_path = '';
            item.genre_ids = [];
            item.vote_average = 0;
            item.vote_count = 0;
          }
        });
        return multiList;
      }

      return null;
    } catch (e: any) {
      console.log('Error', e.stack);
      return null;
    }
  }

  async getTrendingSeries(
    locale: string,
    type: TrendingType
  ): Promise<TrendingSeries | null> {
    let url = '';
    switch (type) {
      case TrendingType.DAY:
        url = `https://api.themoviedb.org/3/trending/tv/${TrendingType.DAY}?language=${locale}&api_key=${API_TMDB_KEY}`;
        break;
      case TrendingType.WEEK:
        url = `https://api.themoviedb.org/3/trending/tv/${TrendingType.WEEK}?language=${locale}&api_key=${API_TMDB_KEY}`;
        break;
      default:
        return null;
    }

    try {
      const res = await fetch(url);
      const result = await res.json();
      if ('results' in result) {
        return result as TrendingSeries;
      }
      return null;
    } catch (e: any) {
      console.log('Error', e.stack);
      return null;
    }
  }

  async getTrendingMovies(
    locale: string,
    type: TrendingType
  ): Promise<TrendingMovies | null> {
    let url = '';
    switch (type) {
      case TrendingType.DAY:
        url = `https://api.themoviedb.org/3/trending/movie/${TrendingType.DAY}?language=${locale}&api_key=${API_TMDB_KEY}`;
        break;
      case TrendingType.WEEK:
        url = `https://api.themoviedb.org/3/trending/movie/${TrendingType.WEEK}?language=${locale}&api_key=${API_TMDB_KEY}`;
        break;
      default:
        return null;
    }

    try {
      const res = await fetch(url);
      const result = await res.json();
      if ('results' in result) {
        return result as TrendingMovies;
      }
      return null;
    } catch (e: any) {
      console.log('Error', e.stack);
      return null;
    }
  }

  async getTrendingAll(
    locale: string,
    type: TrendingType,
    page: number
  ): Promise<TrendingAll | null> {
    let url = '';
    switch (type) {
      case TrendingType.DAY:
        url = `https://api.themoviedb.org/3/trending/all/${TrendingType.DAY}?language=${locale}&page=${page}&api_key=${API_TMDB_KEY}`;
        break;
      case TrendingType.WEEK:
        url = `https://api.themoviedb.org/3/trending/all/${TrendingType.WEEK}?language=${locale}&page=${page}&api_key=${API_TMDB_KEY}`;
        break;
      default:
        return null;
    }

    try {
      const res = await fetch(url);
      const result = await res.json();
      if ('results' in result) {
        return result as TrendingAll;
      }
      return null;
    } catch (e: any) {
      console.log('Error', e.stack);
      return null;
    }
  }

  async getGenreList(
    locale: string
  ): Promise<Genre[] | null> {
    const urlMovie = `https://api.themoviedb.org/3/genre/movie/list?language=${locale}&api_key=${API_TMDB_KEY}`;
    const urlTv = `https://api.themoviedb.org/3/genre/tv/list?language=${locale}&api_key=${API_TMDB_KEY}`;

    try {
      const [resMovie, resTv] = await Promise.all([
        fetch(urlMovie),
        fetch(urlTv),
      ]);
      const resultMovie = await resMovie.json();
      const resultTv = await resTv.json();
      if ('genres' in resultMovie && 'genres' in resultTv) {
        const resultTemp = [
          ...resultMovie['genres'],
          ...resultTv['genres'],
        ];
        const result = resultTemp.reduce(
          (acumulator, current) => {
            const duplicate = acumulator.find(
              (item: any) => item['id'] === current['id']
            );
            if (!duplicate) {
              acumulator.push(current);
            }
            return acumulator;
          },
          []
        );

        return result as Genre[];
      }
      return null;
    } catch (e: any) {
      console.log('Error', e.stack);
      return null;
    }
  }

  private getCertificationValue(
    json: any,
    code_country: string,
    type: ItemType
  ): string {
    switch (type) {
      case ItemType.MOVIE: {
        const found_value_certification = json[
          'release_dates'
        ]['results'].find((value: any) => {
          return value['iso_3166_1'] == code_country;
        });
        if (!found_value_certification) {
          return '';
        } else {
          const certification_value =
            found_value_certification['release_dates'].map(
              (item: any) => item['certification']
            );

          const items = certification_value
            .toString()
            .split(',');
          const uniqueItems = [...new Set(items)];
          return uniqueItems.join(',');
        }
      }
      case ItemType.SERIE: {
        const found_value_certification = json[
          'content_ratings'
        ]['results'].find((value: any) => {
          return value['iso_3166_1'] == code_country;
        });
        if (!found_value_certification) {
          return '';
        } else {
          return found_value_certification['rating'];
        }
      }
    }
  }
}
