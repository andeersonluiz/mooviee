import {
  afterEach,
  describe,
  expect,
  it,
} from '@jest/globals';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { after, before } from 'node:test';
import * as jsonMock from '../../../test/mockData/api-service-data';
import {
  MovieListType,
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
import { SerieInfo } from '../model/serie-info';
import { SerieList } from '../model/serie-list';
import { TrendingMovies } from '../model/trending-movies';
import { TrendingSeries } from '../model/trending-series';
import { ApiService } from './api-service';

const handlers = [
  http.get(
    'https://api.themoviedb.org/3/movie/popular',
    () => {
      return HttpResponse.json(
        jsonMock.listMoviePopularJson
      );
    }
  ),
  http.get(
    'https:api.themoviedb.org/3/movie/top_rated',
    () => {
      return HttpResponse.json(
        jsonMock.listMovieTopRatedJson
      );
    }
  ),
  http.get(
    'https://api.themoviedb.org/3/movie/upcoming',
    () => {
      return HttpResponse.json(
        jsonMock.listMovieUpcomingJson
      );
    }
  ),
  http.get(
    'https://api.themoviedb.org/3/tv/popular',
    () => {
      return HttpResponse.json(
        jsonMock.listSeriePopularJson
      );
    }
  ),
  http.get(
    'https://api.themoviedb.org/3/tv/top_rated',
    () => {
      return HttpResponse.json(
        jsonMock.listSerieTopRatedJson
      );
    }
  ),
  http.get(
    'https://api.themoviedb.org/3/tv/on_the_air',
    () => {
      return HttpResponse.json(
        jsonMock.listSerieOnTheAirJson
      );
    }
  ),

  http.get(
    'https://api.themoviedb.org/3/movie/:id',
    (res) => {
      const id_value = Number(res.params['id']);

      if (id_value == 786892) {
        return HttpResponse.json(jsonMock.movieJsonFilled);
      } else if (id_value == 1311527) {
        return HttpResponse.json(
          jsonMock.movieJsonNoFilled
        );
      } else if (id_value == 0) {
        return HttpResponse.json({});
      } else {
        return HttpResponse.json('');
      }
    }
  ),

  http.get('https://api.themoviedb.org/3/tv/:id', (res) => {
    const id_value = Number(res.params['id']);

    if (id_value == 76479) {
      return HttpResponse.json(jsonMock.serieJsonFilled);
    } else if (id_value == 249300) {
      return HttpResponse.json(jsonMock.serieJsonNoFilled);
    } else if (id_value == 0) {
      return HttpResponse.json({});
    } else {
      return HttpResponse.json('');
    }
  }),

  http.get(
    'https://api.themoviedb.org/3/person/:id',
    (res) => {
      const id_value = Number(res.params['id']);

      if (id_value == 35) {
        return HttpResponse.json(jsonMock.personJsonFilled);
      } else if (id_value == 3290589) {
        return HttpResponse.json(
          jsonMock.personJsonNotFilled
        );
      } else if (id_value == 0) {
        return HttpResponse.json({});
      } else {
        return HttpResponse.json('');
      }
    }
  ),

  http.get(
    'https://api.themoviedb.org/3/collection/:id',
    (res) => {
      const id_value = Number(res.params['id']);

      if (id_value == 9485) {
        return HttpResponse.json(
          jsonMock.collectionJsonFilled
        );
      } else if (id_value == 546080) {
        return HttpResponse.json(
          jsonMock.collectionJsonNoFilled
        );
      } else if (id_value == 0) {
        return HttpResponse.json({});
      } else {
        return HttpResponse.json('');
      }
    }
  ),

  http.get(
    'https://api.themoviedb.org/3/search/collection',
    (res) => {
      const url = new URL(res.request.url);
      const query = url.searchParams.get('query');

      if (query == 'fast') {
        return HttpResponse.json(
          jsonMock.jsonCollectionFilled
        );
      } else if (query == 'blabla') {
        return HttpResponse.json(jsonMock.jsonSearchEmpty);
      } else if (query == 'teste') {
        return HttpResponse.json('');
      } else {
        return HttpResponse.json({});
      }
    }
  ),
  http.get(
    'https://api.themoviedb.org/3/search/multi',
    (res) => {
      const url = new URL(res.request.url);
      const query = url.searchParams.get('query');

      if (query == 'tom') {
        return HttpResponse.json(jsonMock.jsonMultiFilled);
      } else if (query == 'blablablabla') {
        return HttpResponse.json(jsonMock.jsonSearchEmpty);
      } else if (query == 'teste') {
        return HttpResponse.json('');
      } else {
        return HttpResponse.json({});
      }
    }
  ),
  http.get(
    'https://api.themoviedb.org/3/trending/movie/:time_window',
    (res) => {
      const id_value = res.params['time_window'];

      if (id_value == 'day') {
        return HttpResponse.json(
          jsonMock.jsonMovieTrendingDay
        );
      } else if (id_value == 'week') {
        return HttpResponse.json(
          jsonMock.jsonMovieTrendingWeek
        );
      } else {
        return HttpResponse.json({});
      }
    }
  ),
  http.get(
    'https://api.themoviedb.org/3/trending/tv/:time_window',
    (res) => {
      const id_value = res.params['time_window'];
      console.log('interceptei A');
      if (id_value == 'day') {
        return HttpResponse.json(
          jsonMock.jsonSerieTrendingDay
        );
      } else if (id_value == 'week') {
        return HttpResponse.json(
          jsonMock.jsonSerieTrendingWeek
        );
      } else {
        return HttpResponse.json({});
      }
    }
  ),
];

const server = setupServer(...handlers);

describe('api service tests', () => {
  before(() => server.listen());
  afterEach(() => server.resetHandlers());
  after(() => server.close());

  it("(getMovies) - should return object of type 'MovieList' with param 'results' and length of 20", async () => {
    const apiService = new ApiService();

    const moviesPopular: MovieList | null =
      await apiService.getMovies('pt-BR');
    expect(moviesPopular?.results).toHaveLength(20);

    const moviesTopRated: MovieList | null =
      await apiService.getMovies(
        'pt-BR',
        MovieListType.TOP_RATED
      );
    expect(moviesTopRated?.results).toHaveLength(20);

    const moviesUpcoming: MovieList | null =
      await apiService.getMovies(
        'pt-BR',
        MovieListType.UPCOMING
      );

    expect(moviesUpcoming?.results).toHaveLength(20);
  });
  it("(getMovies) - should return object of type 'MovieList' with all fields != 'undefined'", async () => {
    const apiService = new ApiService();
    const moviesPopular: MovieList | null =
      await apiService.getMovies('pt-BR');
    if (moviesPopular?.results) {
      expect(typeof moviesPopular.page).not.toEqual(
        'undefined'
      );
      expect(typeof moviesPopular.total_pages).not.toEqual(
        'undefined'
      );
      expect(
        typeof moviesPopular.total_results
      ).not.toEqual('undefined');
      const results = moviesPopular.results;
      results.forEach((movie) => {
        expect(typeof movie.adult).not.toEqual('undefined');
        expect(typeof movie.id).not.toEqual('undefined');
        expect(typeof movie.popularity).not.toEqual(
          'undefined'
        );
        expect(typeof movie.poster_path).not.toEqual(
          'undefined'
        );
        expect(typeof movie.release_date).not.toEqual(
          'undefined'
        );
        expect(typeof movie.title).not.toEqual('undefined');
        expect(typeof movie.vote_average).not.toEqual(
          'undefined'
        );
        expect(typeof movie.vote_count).not.toEqual(
          'undefined'
        );
      });
    }

    const moviesTopRated: MovieList | null =
      await apiService.getMovies(
        'pt-BR',
        MovieListType.TOP_RATED
      );
    if (moviesTopRated?.results) {
      expect(typeof moviesTopRated.page).not.toEqual(
        'undefined'
      );
      expect(typeof moviesTopRated.total_pages).not.toEqual(
        'undefined'
      );
      expect(
        typeof moviesTopRated.total_results
      ).not.toEqual('undefined');
      const results = moviesTopRated.results;
      results.forEach((movie) => {
        expect(typeof movie.adult).not.toEqual('undefined');
        expect(typeof movie.id).not.toEqual('undefined');
        expect(typeof movie.popularity).not.toEqual(
          'undefined'
        );
        expect(typeof movie.poster_path).not.toEqual(
          'undefined'
        );
        expect(typeof movie.release_date).not.toEqual(
          'undefined'
        );
        expect(typeof movie.title).not.toEqual('undefined');
        expect(typeof movie.vote_average).not.toEqual(
          'undefined'
        );
        expect(typeof movie.vote_count).not.toEqual(
          'undefined'
        );
      });
    }

    const moviesUpcoming: MovieList | null =
      await apiService.getMovies(
        'pt-BR',
        MovieListType.UPCOMING
      );
    if (moviesUpcoming?.results) {
      expect(typeof moviesUpcoming.page).not.toEqual(
        'undefined'
      );
      expect(typeof moviesUpcoming.total_pages).not.toEqual(
        'undefined'
      );
      expect(
        typeof moviesUpcoming.total_results
      ).not.toEqual('undefined');
      const results = moviesUpcoming.results;
      results.forEach((movie) => {
        expect(typeof movie.adult).not.toEqual('undefined');
        expect(typeof movie.id).not.toEqual('undefined');
        expect(typeof movie.popularity).not.toEqual(
          'undefined'
        );
        expect(typeof movie.poster_path).not.toEqual(
          'undefined'
        );
        expect(typeof movie.release_date).not.toEqual(
          'undefined'
        );
        expect(typeof movie.title).not.toEqual('undefined');
        expect(typeof movie.vote_average).not.toEqual(
          'undefined'
        );
        expect(typeof movie.vote_count).not.toEqual(
          'undefined'
        );
      });
    }
  });
  it('(getMovies) - should return null when pass invalid json', async () => {
    const apiService = new ApiService();
    server.use(
      http.get(
        'https://api.themoviedb.org/3/movie/popular',
        () => {
          return HttpResponse.json('');
        }
      ),
      http.get(
        'https://api.themoviedb.org/3/movie/top_rated',
        () => {
          return HttpResponse.json('');
        }
      ),
      http.get(
        'https://api.themoviedb.org/3/movie/upcoming',
        () => {
          return HttpResponse.json('');
        }
      )
    );

    const moviesPopular: MovieList | null =
      await apiService.getMovies('pt-BR');
    const moviesTopRated: MovieList | null =
      await apiService.getMovies(
        'pt-BR',
        MovieListType.TOP_RATED
      );
    const moviesUpcoming: MovieList | null =
      await apiService.getMovies(
        'pt-BR',
        MovieListType.UPCOMING
      );

    expect(moviesPopular).toBe(null);
    expect(moviesTopRated).toBe(null);
    expect(moviesUpcoming).toBe(null);
  });
  it('(getMovies) - should return null when pass valid json without parameter "results" ', async () => {
    const apiService = new ApiService();
    server.use(
      http.get(
        'https://api.themoviedb.org/3/movie/popular',
        () => {
          return HttpResponse.json({ page: 0 });
        }
      ),
      http.get(
        'https://api.themoviedb.org/3/movie/top_rated',
        () => {
          return HttpResponse.json({ page: 0 });
        }
      ),
      http.get(
        'https://api.themoviedb.org/3/movie/upcoming',
        () => {
          return HttpResponse.json({ page: 0 });
        }
      )
    );
    const moviesPopular: MovieList | null =
      await apiService.getMovies('pt-BR');
    const moviesTopRated: MovieList | null =
      await apiService.getMovies(
        'pt-BR',
        MovieListType.TOP_RATED
      );
    const moviesUpcoming: MovieList | null =
      await apiService.getMovies(
        'pt-BR',
        MovieListType.UPCOMING
      );

    expect(moviesPopular).toBe(null);
    expect(moviesTopRated).toBe(null);
    expect(moviesUpcoming).toBe(null);
  });
  it('(getMovies) - should return null when pass invalid "MovieListType" ', async () => {
    const apiService = new ApiService();

    const movies: MovieList | null =
      await apiService.getMovies(
        'pt-BR',
        'news' as unknown as MovieListType
      );

    expect(movies).toBe(null);
  });

  it("(getSeries) - should return object of type 'SerieList' with param 'results' and length of 20", async () => {
    const apiService = new ApiService();

    const seriesPopular: SerieList | null =
      await apiService.getSeries('en-US');
    expect(seriesPopular?.results).toHaveLength(20);

    const seriesTopRated: SerieList | null =
      await apiService.getSeries(
        'en-US',
        SerieListType.TOP_RATED
      );
    expect(seriesTopRated?.results).toHaveLength(20);

    const seriesOnTheAir: SerieList | null =
      await apiService.getSeries(
        'en-US',
        SerieListType.ON_THE_AIR
      );

    expect(seriesOnTheAir?.results).toHaveLength(20);
  });
  it("(getSeries) - should return object of type 'SerieList' with all fields != 'undefined'", async () => {
    const apiService = new ApiService();
    const seriesPopular: SerieList | null =
      await apiService.getSeries('en-US');
    if (seriesPopular?.results) {
      expect(typeof seriesPopular.page).not.toEqual(
        'undefined'
      );
      expect(typeof seriesPopular.total_pages).not.toEqual(
        'undefined'
      );
      expect(
        typeof seriesPopular.total_results
      ).not.toEqual('undefined');
      const results = seriesPopular.results;
      results.forEach((serie) => {
        expect(typeof serie.adult).not.toEqual('undefined');
        expect(typeof serie.id).not.toEqual('undefined');
        expect(typeof serie.popularity).not.toEqual(
          'undefined'
        );
        expect(typeof serie.poster_path).not.toEqual(
          'undefined'
        );
        expect(typeof serie.first_air_date).not.toEqual(
          'undefined'
        );
        expect(typeof serie.name).not.toEqual('undefined');
        expect(typeof serie.vote_average).not.toEqual(
          'undefined'
        );
        expect(typeof serie.vote_count).not.toEqual(
          'undefined'
        );
      });
    }

    const seriesTopRated: SerieList | null =
      await apiService.getSeries(
        'en-US',
        SerieListType.TOP_RATED
      );
    if (seriesTopRated?.results) {
      expect(typeof seriesTopRated.page).not.toEqual(
        'undefined'
      );
      expect(typeof seriesTopRated.total_pages).not.toEqual(
        'undefined'
      );
      expect(
        typeof seriesTopRated.total_results
      ).not.toEqual('undefined');
      const results = seriesTopRated.results;
      results.forEach((serie) => {
        expect(typeof serie.adult).not.toEqual('undefined');
        expect(typeof serie.id).not.toEqual('undefined');
        expect(typeof serie.popularity).not.toEqual(
          'undefined'
        );
        expect(typeof serie.poster_path).not.toEqual(
          'undefined'
        );
        expect(typeof serie.first_air_date).not.toEqual(
          'undefined'
        );
        expect(typeof serie.name).not.toEqual('undefined');
        expect(typeof serie.vote_average).not.toEqual(
          'undefined'
        );
        expect(typeof serie.vote_count).not.toEqual(
          'undefined'
        );
      });
    }

    const seriesOnTheAir: SerieList | null =
      await apiService.getSeries(
        'en-US',
        SerieListType.ON_THE_AIR
      );
    if (seriesOnTheAir?.results) {
      expect(typeof seriesOnTheAir.page).not.toEqual(
        'undefined'
      );
      expect(typeof seriesOnTheAir.total_pages).not.toEqual(
        'undefined'
      );
      expect(
        typeof seriesOnTheAir.total_results
      ).not.toEqual('undefined');
      const results = seriesOnTheAir.results;
      results.forEach((serie) => {
        expect(typeof serie.adult).not.toEqual('undefined');
        expect(typeof serie.id).not.toEqual('undefined');
        expect(typeof serie.popularity).not.toEqual(
          'undefined'
        );
        expect(typeof serie.poster_path).not.toEqual(
          'undefined'
        );
        expect(typeof serie.first_air_date).not.toEqual(
          'undefined'
        );
        expect(typeof serie.name).not.toEqual('undefined');
        expect(typeof serie.vote_average).not.toEqual(
          'undefined'
        );
        expect(typeof serie.vote_count).not.toEqual(
          'undefined'
        );
      });
    }
  });
  it('(getSeries) - should return null when pass invalid json', async () => {
    const apiService = new ApiService();
    server.use(
      http.get(
        'https://api.themoviedb.org/3/tv/popular',
        () => {
          return HttpResponse.json('');
        }
      ),
      http.get(
        'https://api.themoviedb.org/3/tv/top_rated',
        () => {
          return HttpResponse.json('');
        }
      ),
      http.get(
        'https://api.themoviedb.org/3/tv/on_the_air',
        () => {
          return HttpResponse.json('');
        }
      )
    );

    const seriesPopular: SerieList | null =
      await apiService.getSeries('en-US');
    const seriesTopRated: SerieList | null =
      await apiService.getSeries(
        'en-US',
        SerieListType.TOP_RATED
      );
    const seriesOnTheAir: SerieList | null =
      await apiService.getSeries(
        'en-US',
        SerieListType.ON_THE_AIR
      );

    expect(seriesPopular).toBe(null);
    expect(seriesTopRated).toBe(null);
    expect(seriesOnTheAir).toBe(null);
  });
  it('(getSeries) - should return null when pass valid json without parameter "results"', async () => {
    const apiService = new ApiService();
    server.use(
      http.get(
        'https://api.themoviedb.org/3/tv/popular',
        () => {
          return HttpResponse.json({ page: 0 });
        }
      ),
      http.get(
        'https://api.themoviedb.org/3/tv/top_rated',
        () => {
          return HttpResponse.json({ page: 0 });
        }
      ),
      http.get(
        'https://api.themoviedb.org/3/tv/on_the_air',
        () => {
          return HttpResponse.json({ page: 0 });
        }
      )
    );

    const seriesPopular: SerieList | null =
      await apiService.getSeries('en-US');
    const seriesTopRated: SerieList | null =
      await apiService.getSeries(
        'en-US',
        SerieListType.TOP_RATED
      );
    const seriesOnTheAir: SerieList | null =
      await apiService.getSeries(
        'en-US',
        SerieListType.ON_THE_AIR
      );

    expect(seriesPopular).toBe(null);
    expect(seriesTopRated).toBe(null);
    expect(seriesOnTheAir).toBe(null);
  });
  it('(getSeries) - should return null when pass invalid "SerieListType" ', async () => {
    const apiService = new ApiService();

    const series: SerieList | null =
      await apiService.getSeries(
        'en-US',
        'news' as unknown as SerieListType
      );

    expect(series).toBe(null);
  });

  it("(getMovieInfo) - should return object of type 'MovieInfo' with all fields != 'undefined' with id 786892 (much parameters)", async () => {
    const apiService = new ApiService();
    const movie: MovieInfo | null =
      await apiService.getMovieInfo(786892, 'pt-BR');
    if (movie) {
      expect(typeof movie.adult).not.toEqual('undefined');
      expect(typeof movie.id).not.toEqual('undefined');
      expect(typeof movie.backdrop_path).not.toEqual(
        'undefined'
      );
      expect(
        typeof movie.belongs_to_collection
      ).not.toEqual('undefined');
      expect(typeof movie.budget).not.toEqual('undefined');
      expect(typeof movie.credits).not.toEqual('undefined');
      movie.credits.cast.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
      movie.credits.crew.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
      expect(typeof movie.genres).not.toEqual('undefined');
      movie.genres.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );

      expect(typeof movie.overview).not.toEqual(
        'undefined'
      );
      expect(typeof movie.popularity).not.toEqual(
        'undefined'
      );
      expect(typeof movie.poster_path).not.toEqual(
        'undefined'
      );
      expect(typeof movie.recommendations).not.toEqual(
        'undefined'
      );
      movie.recommendations.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
      expect(typeof movie.release_date).not.toEqual(
        'undefined'
      );
      expect(typeof movie.revenue).not.toEqual('undefined');
      expect(typeof movie.runtime).not.toEqual('undefined');
      expect(typeof movie.status).not.toEqual('undefined');
      expect(typeof movie.tagline).not.toEqual('undefined');
      expect(typeof movie.title).not.toEqual('undefined');
      expect(typeof movie.vote_count).not.toEqual(
        'undefined'
      );
      expect(typeof movie.vote_average).not.toEqual(
        'undefined'
      );
      expect(typeof movie.certification_value).not.toEqual(
        'undefined'
      );
    }
  });
  it("(getMovieInfo) - should return object of type 'MovieInfo' with all fields != 'undefined' with id 1311527 (few parameters)", async () => {
    const apiService = new ApiService();
    const movie: MovieInfo | null =
      await apiService.getMovieInfo(1311527, 'pt-BR');
    if (movie) {
      expect(typeof movie.adult).not.toEqual('undefined');
      expect(typeof movie.id).not.toEqual('undefined');
      expect(typeof movie.backdrop_path).not.toEqual(
        'undefined'
      );
      expect(
        typeof movie.belongs_to_collection
      ).not.toEqual('undefined');
      expect(typeof movie.budget).not.toEqual('undefined');
      expect(typeof movie.credits).not.toEqual('undefined');
      movie.credits.cast.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
      movie.credits.crew.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
      expect(typeof movie.genres).not.toEqual('undefined');
      movie.genres.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );

      expect(typeof movie.overview).not.toEqual(
        'undefined'
      );
      expect(typeof movie.popularity).not.toEqual(
        'undefined'
      );
      expect(typeof movie.poster_path).not.toEqual(
        'undefined'
      );
      expect(typeof movie.recommendations).not.toEqual(
        'undefined'
      );
      console.log('ooi');
      console.log(movie.recommendations);
      movie.recommendations.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
      expect(typeof movie.release_date).not.toEqual(
        'undefined'
      );
      expect(typeof movie.revenue).not.toEqual('undefined');
      expect(typeof movie.runtime).not.toEqual('undefined');
      expect(typeof movie.status).not.toEqual('undefined');
      expect(typeof movie.tagline).not.toEqual('undefined');
      expect(typeof movie.title).not.toEqual('undefined');
      expect(typeof movie.vote_count).not.toEqual(
        'undefined'
      );
      expect(typeof movie.vote_average).not.toEqual(
        'undefined'
      );
      expect(typeof movie.certification_value).not.toEqual(
        'undefined'
      );
    }
  });
  it("(getMovieInfo) - should return object of type 'null' after sended id 0 (not found)", async () => {
    const apiService = new ApiService();
    const movie: MovieInfo | null =
      await apiService.getMovieInfo(0, 'pt-BR');
    expect(movie).toBe(null);
  });
  it("(getMovieInfo) - should return object of type 'null' after sended invalid id", async () => {
    const apiService = new ApiService();
    const movie: MovieInfo | null =
      await apiService.getMovieInfo(-1, 'pt-BR');
    expect(movie).toBe(null);
  });

  it("(getSerieInfo) - should return object of type 'SerieInfo' with all fields != 'undefined' with id 76479 (much parameters)", async () => {
    const apiService = new ApiService();
    const serie: SerieInfo | null =
      await apiService.getSerieInfo(76479, 'pt-BR');
    if (serie) {
      expect(typeof serie.adult).not.toEqual('undefined');
      expect(typeof serie.id).not.toEqual('undefined');
      expect(typeof serie.backdrop_path).not.toEqual(
        'undefined'
      );
      expect(typeof serie.episode_run_time).not.toEqual(
        'undefined'
      );
      serie.episode_run_time.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
      expect(typeof serie.first_air_date).not.toEqual(
        'undefined'
      );
      expect(typeof serie.last_air_date).not.toEqual(
        'undefined'
      );
      expect(typeof serie.homepage).not.toEqual(
        'undefined'
      );
      expect(typeof serie.in_production).not.toEqual(
        'undefined'
      );
      expect(typeof serie.name).not.toEqual('undefined');
      expect(typeof serie.next_episode_to_air).not.toEqual(
        'undefined'
      );
      expect(typeof serie.last_episode_to_air).not.toEqual(
        'undefined'
      );
      expect(typeof serie.networks).not.toEqual(
        'undefined'
      );
      expect(typeof serie.number_of_episodes).not.toEqual(
        'undefined'
      );
      expect(typeof serie.number_of_seasons).not.toEqual(
        'undefined'
      );
      expect(typeof serie.overview).not.toEqual(
        'undefined'
      );
      expect(typeof serie.popularity).not.toEqual(
        'undefined'
      );
      expect(typeof serie.poster_path).not.toEqual(
        'undefined'
      );
      expect(typeof serie.status).not.toEqual('undefined');
      expect(typeof serie.tagline).not.toEqual('undefined');
      expect(typeof serie.vote_average).not.toEqual(
        'undefined'
      );
      expect(typeof serie.vote_count).not.toEqual(
        'undefined'
      );
      expect(typeof serie.certification_value).not.toEqual(
        'undefined'
      );
      serie.aggregate_credits.cast.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
      serie.aggregate_credits.crew.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
      expect(typeof serie.recommendations).not.toEqual(
        'undefined'
      );
      serie.recommendations.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
    }
  });
  it("(getSerieInfo) - should return object of type 'SerieInfo' with all fields != 'undefined' with id 249300 (few parameters)", async () => {
    const apiService = new ApiService();
    const serie: SerieInfo | null =
      await apiService.getSerieInfo(249300, 'pt-BR');
    if (serie) {
      expect(typeof serie.adult).not.toEqual('undefined');
      expect(typeof serie.id).not.toEqual('undefined');
      expect(typeof serie.backdrop_path).not.toEqual(
        'undefined'
      );
      expect(typeof serie.episode_run_time).not.toEqual(
        'undefined'
      );
      serie.episode_run_time.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
      expect(typeof serie.first_air_date).not.toEqual(
        'undefined'
      );
      expect(typeof serie.last_air_date).not.toEqual(
        'undefined'
      );
      expect(typeof serie.homepage).not.toEqual(
        'undefined'
      );
      expect(typeof serie.in_production).not.toEqual(
        'undefined'
      );
      expect(typeof serie.name).not.toEqual('undefined');
      expect(typeof serie.next_episode_to_air).not.toEqual(
        'undefined'
      );
      expect(typeof serie.last_episode_to_air).not.toEqual(
        'undefined'
      );
      expect(typeof serie.networks).not.toEqual(
        'undefined'
      );
      expect(typeof serie.number_of_episodes).not.toEqual(
        'undefined'
      );
      expect(typeof serie.number_of_seasons).not.toEqual(
        'undefined'
      );
      expect(typeof serie.overview).not.toEqual(
        'undefined'
      );
      expect(typeof serie.popularity).not.toEqual(
        'undefined'
      );
      expect(typeof serie.poster_path).not.toEqual(
        'undefined'
      );
      expect(typeof serie.status).not.toEqual('undefined');
      expect(typeof serie.tagline).not.toEqual('undefined');
      expect(typeof serie.vote_average).not.toEqual(
        'undefined'
      );
      expect(typeof serie.vote_count).not.toEqual(
        'undefined'
      );
      expect(typeof serie.certification_value).not.toEqual(
        'undefined'
      );
      serie.aggregate_credits.cast.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
      serie.aggregate_credits.crew.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
      expect(typeof serie.recommendations).not.toEqual(
        'undefined'
      );
      serie.recommendations.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
    }
  });
  it("(getSerieInfo) - should return object of type 'null' after sended id 0 (not found)", async () => {
    const apiService = new ApiService();
    const serie: SerieInfo | null =
      await apiService.getSerieInfo(0, 'pt-BR');
    expect(serie).toBe(null);
  });
  it("(getSerieInfo) -  should return object of type 'null' after sended invalid id", async () => {
    const apiService = new ApiService();
    const serie: SerieInfo | null =
      await apiService.getSerieInfo(-1, 'pt-BR');
    expect(serie).toBe(null);
  });

  it("(getPersonInfo) - should return object of type 'PersonInfo' with all fields != 'undefined' with id 35 (many params)", async () => {
    const apiService = new ApiService();
    const person: PersonInfo | null =
      await apiService.getPersonInfo(35, 'pt-BR');
    if (person) {
      expect(typeof person.adult).not.toEqual('undefined');
      expect(typeof person.id).not.toEqual('undefined');
      expect(typeof person.popularity).not.toEqual(
        'undefined'
      );
      expect(typeof person.also_known_as).not.toEqual(
        'undefined'
      );
      expect(typeof person.biography).not.toEqual(
        'undefined'
      );
      expect(typeof person.birthday).not.toEqual(
        'undefined'
      );
      expect(typeof person.deathday).not.toEqual(
        'undefined'
      );
      expect(typeof person.gender).not.toEqual('undefined');
      expect(
        typeof person.known_for_department
      ).not.toEqual('undefined');
      expect(typeof person.name).not.toEqual('undefined');
      expect(typeof person.place_of_birth).not.toEqual(
        'undefined'
      );
      expect(typeof person.profile_path).not.toEqual(
        'undefined'
      );
      expect(typeof person.combined_credits).not.toEqual(
        'undefined'
      );
      person.combined_credits.cast.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
      person.combined_credits.crew.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
    }
  });
  it("(getPersonInfo) - should return object of type 'PersonInfo' with all fields != 'undefined' with id 3290589 (few params)", async () => {
    const apiService = new ApiService();
    const person: PersonInfo | null =
      await apiService.getPersonInfo(3290589, 'pt-BR');
    if (person) {
      console.log(typeof person.birthday);
      expect(typeof person.adult).not.toEqual('undefined');
      expect(typeof person.id).not.toEqual('undefined');
      expect(typeof person.popularity).not.toEqual(
        'undefined'
      );
      expect(typeof person.also_known_as).not.toEqual(
        'undefined'
      );
      expect(typeof person.biography).not.toEqual(
        'undefined'
      );
      expect(typeof person.birthday).not.toEqual(
        'undefined'
      );
      expect(typeof person.deathday).not.toEqual(
        'undefined'
      );
      expect(typeof person.gender).not.toEqual('undefined');
      expect(
        typeof person.known_for_department
      ).not.toEqual('undefined');
      expect(typeof person.name).not.toEqual('undefined');
      expect(typeof person.place_of_birth).not.toEqual(
        'undefined'
      );
      expect(typeof person.profile_path).not.toEqual(
        'undefined'
      );
      expect(typeof person.combined_credits).not.toEqual(
        'undefined'
      );
      person.combined_credits.cast.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
      person.combined_credits.crew.map((item) =>
        expect(typeof item).not.toEqual('undefined')
      );
    }
  });
  it("(getPersonInfo) - should return object of type 'null' after sended id 0 (not found)", async () => {
    const apiService = new ApiService();
    const person: PersonInfo | null =
      await apiService.getPersonInfo(0, 'pt-BR');
    expect(person).toBe(null);
  });
  it("(getPersonInfo) - should return object of type 'null' after sended invalid id", async () => {
    const apiService = new ApiService();
    const person: PersonInfo | null =
      await apiService.getPersonInfo(-1, 'pt-BR');
    expect(person).toBe(null);
  });

  it("(getCollectionInfo) - should return object of type 'CollectionInfo' with all fields != 'undefined' with id 9485 (many params)", async () => {
    const apiService = new ApiService();
    const collection: CollectionInfo | null =
      await apiService.getCollectionInfo(9485, 'pt-BR');
    if (collection) {
      expect(typeof collection.name).not.toEqual(
        'undefined'
      );
      expect(typeof collection.id).not.toEqual('undefined');
      expect(typeof collection.overview).not.toEqual(
        'undefined'
      );
      expect(typeof collection.poster_path).not.toEqual(
        'undefined'
      );
      expect(typeof collection.parts).not.toEqual(
        'undefined'
      );
      collection.parts.map((part) => {
        expect(typeof part.id).not.toEqual('undefined');
        expect(typeof part.title).not.toEqual('undefined');
        expect(typeof part.original_title).not.toEqual(
          'undefined'
        );
        expect(typeof part.overview).not.toEqual(
          'undefined'
        );
        expect(typeof part.poster_path).not.toEqual(
          'undefined'
        );
        expect(typeof part.release_date).not.toEqual(
          'undefined'
        );
      });
    }
  });
  it("(getCollectionInfo) - should return object of type 'CollectionInfo' with all fields != 'undefined' with id 546080 (many params)", async () => {
    const apiService = new ApiService();
    const collection: CollectionInfo | null =
      await apiService.getCollectionInfo(546080, 'pt-BR');
    if (collection) {
      expect(typeof collection.name).not.toEqual(
        'undefined'
      );
      expect(typeof collection.id).not.toEqual('undefined');
      expect(typeof collection.overview).not.toEqual(
        'undefined'
      );
      expect(typeof collection.poster_path).not.toEqual(
        'undefined'
      );
      expect(typeof collection.parts).not.toEqual(
        'undefined'
      );
      collection.parts.map((part) => {
        expect(typeof part.id).not.toEqual('undefined');
        expect(typeof part.title).not.toEqual('undefined');
        expect(typeof part.original_title).not.toEqual(
          'undefined'
        );
        expect(typeof part.overview).not.toEqual(
          'undefined'
        );
        expect(typeof part.poster_path).not.toEqual(
          'undefined'
        );
        expect(typeof part.release_date).not.toEqual(
          'undefined'
        );
      });
    }
  });
  it("(getCollectionInfo) - should return object of type 'null' after sended id 0 (not found)", async () => {
    const apiService = new ApiService();
    const collection: CollectionInfo | null =
      await apiService.getCollectionInfo(0, 'pt-BR');
    expect(collection).toBe(null);
  });
  it("(getCollectionInfo) - should return object of type 'null' after sended invalid id", async () => {
    const apiService = new ApiService();
    const collection: CollectionInfo | null =
      await apiService.getCollectionInfo(-1, 'pt-BR');
    expect(collection).toBe(null);
  });

  it("(searchCollection) - should return result with length of 7 after search 'fast' and all fields != 'undefined'", async () => {
    const apiService = new ApiService();
    const collectionList: CollectionList | null =
      await apiService.searchCollections('fast', 'en-US');
    expect(collectionList?.results).toHaveLength(7);

    expect(typeof collectionList?.page).not.toEqual(
      'undefined'
    );
    expect(typeof collectionList?.total_pages).not.toEqual(
      'undefined'
    );
    expect(
      typeof collectionList?.total_results
    ).not.toEqual('undefined');
    collectionList?.results.map((collection) => {
      expect(typeof collection.id).not.toEqual('undefined');
      expect(typeof collection.name).not.toEqual(
        'undefined'
      );
      expect(typeof collection.poster_path).not.toEqual(
        'undefined'
      );
    });
  });
  it("(searchCollection) - should return result with length of 0 after search 'blabla'", async () => {
    const apiService = new ApiService();
    const collectionList: CollectionList | null =
      await apiService.searchCollections('blabla', 'en-US');
    expect(collectionList?.results).toHaveLength(0);
  });
  it('(searchCollection) - should return null after search invalid value', async () => {
    const apiService = new ApiService();
    const collectionList: CollectionList | null =
      await apiService.searchCollections(
        -1 as unknown as string,
        'en-US'
      );
    expect(collectionList).toBe(null);
  });
  it('(searchCollection) - should return null after search value and API is offline', async () => {
    const apiService = new ApiService();
    const collectionList: CollectionList | null =
      await apiService.searchCollections('teste', 'en-US');
    expect(collectionList).toBe(null);
  });

  it("(searchMulti) - should return result with length of 20 after search 'tom' and all fields != 'undefined'", async () => {
    const apiService = new ApiService();
    const multiList: MultiList | null =
      await apiService.searchMulti('tom', 'en-US');
    expect(multiList?.results).toHaveLength(20);
    expect(typeof multiList?.page).not.toEqual('undefined');
    expect(typeof multiList?.total_pages).not.toEqual(
      'undefined'
    );
    expect(typeof multiList?.total_results).not.toEqual(
      'undefined'
    );
    multiList?.results.map((multi) => {
      expect(typeof multi.id).not.toEqual('undefined');
      if (multi.media_type == MediaType.Movie) {
        expect(typeof multi.title).not.toEqual('undefined');
      } else if (multi.media_type == MediaType.Person) {
        expect(
          typeof multi.known_for_department
        ).not.toEqual('undefined');
        expect(typeof multi.name).not.toEqual('undefined');
      } else {
        expect(typeof multi.name).not.toEqual('undefined');
      }
      expect(typeof multi.poster_path).not.toEqual(
        'undefined'
      );
      expect(typeof multi.media_type).not.toEqual(
        'undefined'
      );
      expect(typeof multi.genre_ids).not.toEqual(
        'undefined'
      );
      expect(typeof multi.popularity).not.toEqual(
        'undefined'
      );
      expect(typeof multi.vote_average).not.toEqual(
        'undefined'
      );
      expect(typeof multi.vote_count).not.toEqual(
        'undefined'
      );
    });
  });
  it("(searchMulti) - should return result with length of 0 after search 'blablablabla'", async () => {
    const apiService = new ApiService();
    const multiList: MultiList | null =
      await apiService.searchMulti('blablablabla', 'en-US');
    expect(multiList?.results).toHaveLength(0);
  });
  it('(searchMulti) - should return null after search invalid value', async () => {
    const apiService = new ApiService();
    const multiList: MultiList | null =
      await apiService.searchMulti(
        -1 as unknown as string,
        'en-US'
      );
    expect(multiList).toBe(null);
  });
  it('(searchMulti) - should return null after search value and API is offline', async () => {
    const apiService = new ApiService();
    const multiList: MultiList | null =
      await apiService.searchMulti('teste', 'en-US');
    expect(multiList).toBe(null);
  });

  it("(getTrendingMovies) - should return result with length of 20 after get trending movies with TrendingType 'DAY' and all fields != 'undefined'", async () => {
    const apiService = new ApiService();
    const trendingMovies: TrendingMovies | null =
      await apiService.getTrendingMovies(
        'en-US',
        TrendingType.DAY
      );

    expect(trendingMovies?.results).toHaveLength(20);
    expect(typeof trendingMovies?.page).not.toEqual(
      'undefined'
    );
    expect(typeof trendingMovies?.total_pages).not.toEqual(
      'undefined'
    );
    expect(
      typeof trendingMovies?.total_results
    ).not.toEqual('undefined');

    trendingMovies?.results.map((movie) => {
      expect(typeof movie.id).not.toEqual('undefined');
      expect(typeof movie.adult).not.toEqual('undefined');
      expect(typeof movie.poster_path).not.toEqual(
        'undefined'
      );
      expect(typeof movie.popularity).not.toEqual(
        'undefined'
      );
      expect(typeof movie.vote_average).not.toEqual(
        'undefined'
      );
      expect(typeof movie.vote_count).not.toEqual(
        'undefined'
      );
      expect(typeof movie.title).not.toEqual('undefined');
    });
  });

  it("(getTrendingMovies) - should return result with length of 20 after get trending movies with TrendingType 'WEEK' and all fields != 'undefined'", async () => {
    const apiService = new ApiService();
    const trendingMovies: TrendingMovies | null =
      await apiService.getTrendingMovies(
        'en-US',
        TrendingType.WEEK
      );

    expect(trendingMovies?.results).toHaveLength(20);
    expect(typeof trendingMovies?.page).not.toEqual(
      'undefined'
    );
    expect(typeof trendingMovies?.total_pages).not.toEqual(
      'undefined'
    );
    expect(
      typeof trendingMovies?.total_results
    ).not.toEqual('undefined');

    trendingMovies?.results.map((movie) => {
      expect(typeof movie.id).not.toEqual('undefined');
      expect(typeof movie.adult).not.toEqual('undefined');
      expect(typeof movie.poster_path).not.toEqual(
        'undefined'
      );
      expect(typeof movie.popularity).not.toEqual(
        'undefined'
      );
      expect(typeof movie.vote_average).not.toEqual(
        'undefined'
      );
      expect(typeof movie.vote_count).not.toEqual(
        'undefined'
      );
      expect(typeof movie.title).not.toEqual('undefined');
    });
  });

  it("(getTrendingMovies) - should return null when send invalid 'TrendingType' or API is offline", async () => {
    const apiService = new ApiService();
    const trendingMovies: TrendingMovies | null =
      await apiService.getTrendingMovies(
        'en-US',
        'month' as unknown as TrendingType
      );
    expect(trendingMovies).toBe(null);
  });

  it("(getTrendingSeries) - should return result with length of 20 after get trending movies with TrendingType 'DAY' and all fields != 'undefined'", async () => {
    const apiService = new ApiService();
    const trendingSeries: TrendingSeries | null =
      await apiService.getTrendingSeries(
        'en-US',
        TrendingType.DAY
      );

    expect(trendingSeries?.results).toHaveLength(20);
    expect(typeof trendingSeries?.page).not.toEqual(
      'undefined'
    );
    expect(typeof trendingSeries?.total_pages).not.toEqual(
      'undefined'
    );
    expect(
      typeof trendingSeries?.total_results
    ).not.toEqual('undefined');

    trendingSeries?.results.map((serie) => {
      expect(typeof serie.id).not.toEqual('undefined');
      expect(typeof serie.adult).not.toEqual('undefined');
      expect(typeof serie.poster_path).not.toEqual(
        'undefined'
      );
      expect(typeof serie.popularity).not.toEqual(
        'undefined'
      );
      expect(typeof serie.vote_average).not.toEqual(
        'undefined'
      );
      expect(typeof serie.vote_count).not.toEqual(
        'undefined'
      );
      expect(typeof serie.name).not.toEqual('undefined');
    });
  });

  it("(getTrendingSeries) - should return result with length of 20 after get trending movies with TrendingType 'WEEK' and all fields != 'undefined'", async () => {
    const apiService = new ApiService();
    const trendingSeries: TrendingSeries | null =
      await apiService.getTrendingSeries(
        'en-US',
        TrendingType.WEEK
      );

    expect(trendingSeries?.results).toHaveLength(20);
    expect(typeof trendingSeries?.page).not.toEqual(
      'undefined'
    );
    expect(typeof trendingSeries?.total_pages).not.toEqual(
      'undefined'
    );
    expect(
      typeof trendingSeries?.total_results
    ).not.toEqual('undefined');

    trendingSeries?.results.map((serie) => {
      expect(typeof serie.id).not.toEqual('undefined');
      expect(typeof serie.adult).not.toEqual('undefined');
      expect(typeof serie.poster_path).not.toEqual(
        'undefined'
      );
      expect(typeof serie.popularity).not.toEqual(
        'undefined'
      );
      expect(typeof serie.vote_average).not.toEqual(
        'undefined'
      );
      expect(typeof serie.vote_count).not.toEqual(
        'undefined'
      );
      expect(typeof serie.name).not.toEqual('undefined');
    });
  });

  it("(getTrendingSeries) - should return null when send invalid 'TrendingType' or API is offline", async () => {
    const apiService = new ApiService();
    const trendingSeries: TrendingSeries | null =
      await apiService.getTrendingSeries(
        'en-US',
        'month' as unknown as TrendingType
      );
    expect(trendingSeries).toBe(null);
  });
});
