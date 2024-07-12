import { TrendingType } from '@/utils/enums';
import { MoviesAndShowsRepository } from '../repositories/movies-and-shows-repository';

export default class GetTrendingMoviesUseCase {
  constructor(private moviesAndShowsRepository: MoviesAndShowsRepository) {}

  async execute(locale: string, type: TrendingType) {
    return await this.moviesAndShowsRepository.getTrendingMovies(locale, type);
  }
}
