import { TrendingType } from '@/utils/enums';
import { MoviesAndShowsRepository } from '../repositories/movies-and-shows-repository';

export default class GetTrendingSeriesUseCase {
  constructor(private moviesAndShowsRepository: MoviesAndShowsRepository) {}

  async execute(locale: string, type: TrendingType) {
    return await this.moviesAndShowsRepository.getTrendingSeries(locale, type);
  }
}
