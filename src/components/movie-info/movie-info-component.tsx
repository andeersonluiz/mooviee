import { MovieInfo } from '@/modules/data/model/movie-info';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import { useRouter } from 'next/navigation';
import CastList from './child/cast-list';
import DescriptionMovie from './child/description';
import InfosMovie from './child/infos';
import RecommendationList from './child/recommendations-list';
import { useTranslations } from 'next-intl';

const MovieInfoComponent = ({
  movie,
}: {
  movie: MovieInfo;
}) => {
  const userAgentInfo = useUserAgentData();
  const router = useRouter();
  const t = useTranslations('metadata');

  return (
    <main>
      <div
        className={`${userAgentInfo.isMobile ? 'flex-col' : 'flex-row gap-4'} flex flex-1 flex-row bg-neutral-950`}
      >
        <div
          className={`${userAgentInfo.isMobile ? 'w-full' : 'w-[70%]'} flex flex-col`}
        >
          <DescriptionMovie movie={movie!} />
        </div>
        <div
          className={`${userAgentInfo.isMobile ? 'w-full' : 'w-[30%] !pt-8'} flex flex-col gap-6 px-8`}
        >
          <InfosMovie movie={movie!} />
        </div>
      </div>
      <CastList
        credits={movie!.credits}
        viewAll={() => {
          router.push(
            `/${t('language_split')}/movie/${movie.id}/cast`
          );
        }}
      />
      <RecommendationList
        recommendations={movie!.recommendations}
      />
    </main>
  );
};

export default MovieInfoComponent;
