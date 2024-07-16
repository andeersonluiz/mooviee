import { TrendingType } from '@/utils/enums';
import { MoviesAndShowsRepository } from '../repositories/movies-and-shows-repository';

export default class GetTrendingAllUseCase {
  constructor(private movieAndTvShowRepository: MoviesAndShowsRepository) {}

  async execute(locale: string, type: TrendingType) {
    return this.movieAndTvShowRepository.getTrendingAll(locale, type);
  }
}
