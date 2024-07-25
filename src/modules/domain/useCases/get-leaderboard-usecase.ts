import { LeaderboardType } from '@/utils/enums';
import { MoviesAndShowsRepository } from '../repositories/movies-and-shows-repository';

export default class GetLeaderboardUseCase {
  constructor(private moviesAndTvShowRepository: MoviesAndShowsRepository) {}

  async execute(locale: string, type: LeaderboardType) {
    return await this.moviesAndTvShowRepository.getleaderboard(locale, type);
  }
}
