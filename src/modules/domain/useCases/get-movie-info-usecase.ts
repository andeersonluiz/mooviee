import { MoviesAndShowsRepository } from '../repositories/movies-and-shows-repository';

export default class GetMovieInfoUseCase {
  constructor(
    private moviesAndShowsRepository: MoviesAndShowsRepository
  ) {}

  async execute(id: number, locale: string) {
    return await this.moviesAndShowsRepository.getMovieInfo(
      id,
      locale
    );
  }
}
