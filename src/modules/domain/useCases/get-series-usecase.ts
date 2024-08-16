import { SerieListType } from '@/utils/enums';
import { MoviesAndShowsRepository } from '../repositories/movies-and-shows-repository';

export default class GetSeriesUseCase {
  constructor(
    private moviesAndShowsRepository: MoviesAndShowsRepository
  ) {}

  async execute(
    locale: string,
    type: SerieListType,
    page = 1
  ) {
    return await this.moviesAndShowsRepository.getSeries(
      locale,
      type,
      page
    );
  }
}
