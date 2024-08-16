'use client';
import { SerieFilterType } from '@/utils/enums';
import { MoviesAndShowsRepository } from '../repositories/movies-and-shows-repository';

export default class GetSeriesAllUseCase {
  constructor(
    private moviesAndShowsRepository: MoviesAndShowsRepository
  ) {}

  async execute(
    locale: string,
    type: SerieFilterType,
    desc: boolean,
    page = 1
  ) {
    return await this.moviesAndShowsRepository.getSeriesAll(
      locale,
      type,
      page,
      desc
    );
  }
}
