import { SerieListType } from '@/utils/enums';
import { MoviesAndShowsRepository } from '../repositories/movies-and-shows-repository';

export default class GetSeriesInfoUseCase {
  constructor(private moviesAndTvShowsRepository: MoviesAndShowsRepository) {}

  async execute(id: number, locale: string) {
    return await this.moviesAndTvShowsRepository.getSerieInfo(id, locale);
  }
}
