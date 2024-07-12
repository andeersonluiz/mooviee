import { TrendingType } from '@/utils/enums';
import { MoviesAndShowsRepository } from '../repositories/movies-and-shows-repository';

export default class SearchCollectionUseCase {
  constructor(private moviesAndShowsRepository: MoviesAndShowsRepository) {}

  async execute(query: string, locale: string) {
    return await this.moviesAndShowsRepository.searchCollections(query, locale);
  }
}
