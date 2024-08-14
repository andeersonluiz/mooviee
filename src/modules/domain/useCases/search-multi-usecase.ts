import { MoviesAndShowsRepository } from '../repositories/movies-and-shows-repository';

export default class SearchMultiUseCase {
  constructor(
    private moviesAndShowsRepository: MoviesAndShowsRepository
  ) {}

  async execute(query: string, locale: string) {
    return await this.moviesAndShowsRepository.searchMulti(
      query,
      locale
    );
  }
}
