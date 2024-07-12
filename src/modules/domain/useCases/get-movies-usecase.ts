'use client';
import { MovieListType } from '@/utils/enums';
import { MoviesAndShowsRepository } from '../repositories/movies-and-shows-repository';

export default class GetMoviesUseCase {
  constructor(private moviesAndShowsRepository: MoviesAndShowsRepository) {}

  async execute(locale: string, type: MovieListType) {
    return await this.moviesAndShowsRepository.getMovies(locale, type);
  }
}
