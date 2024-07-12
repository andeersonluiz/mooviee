import { SerieListType } from '@/utils/enums';
import { MoviesAndShowsRepository } from '../repositories/movies-and-shows-repository';

export default class GetSeriesInfoUseCase {
  constructor(private moviesAndTvShowsRepository: MoviesAndShowsRepository) {}

  async execute(locale: string, type: SerieListType) {
    return await this.moviesAndTvShowsRepository.getSeries(locale, type);
  }
}
