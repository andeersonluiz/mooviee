'use client';
import { MovieFilterType } from '@/utils/enums';
import { MoviesAndShowsRepository } from '../repositories/movies-and-shows-repository';

export default class GetMoviesAllUseCase {
  constructor(
    private moviesAndShowsRepository: MoviesAndShowsRepository
  ) {}

  async execute(
    locale: string,
    type: MovieFilterType,
    desc: boolean,
    page = 1
  ) {
    return await this.moviesAndShowsRepository.getMoviesAll(
      locale,
      type,
      page,
      desc
    );
  }
}
