import { MoviesAndShowsRepository } from '../repositories/movies-and-shows-repository';

export default class GetCollectionInfoUseCase {
  constructor(private moviesAndShowsRepository: MoviesAndShowsRepository) {}

  async execute(id: number, locale: string) {
    return await this.moviesAndShowsRepository.getCollectionInfo(id, locale);
  }
}
