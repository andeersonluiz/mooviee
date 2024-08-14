import { MoviesAndShowsRepository } from '../repositories/movies-and-shows-repository';

export default class GetGenreListUseCase {
  constructor(
    private moviesAndTvShowRepository: MoviesAndShowsRepository
  ) {}

  async execute(locale: string) {
    return await this.moviesAndTvShowRepository.getGenreList(
      locale
    );
  }
}
