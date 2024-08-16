import { SerieInfo } from '@/modules/data/model/serie-info';
import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import { useRouter } from 'next/navigation';
import CastList from './child/cast-list';
import DescriptionSerie from './child/description';
import InfosSerie from './child/infos';
import RecommendationList from './child/recommendations-list';
import { useTranslations } from 'next-intl';

const SerieInfoComponent = ({
  serie,
}: {
  serie: SerieInfo;
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
          <DescriptionSerie serie={serie!} />
        </div>
        <div
          className={`${userAgentInfo.isMobile ? 'w-full' : 'w-[30%] !pt-8'} flex flex-col gap-6 px-8`}
        >
          <InfosSerie serie={serie!} />
        </div>
      </div>
      <CastList
        credits={serie!.aggregate_credits}
        viewAll={() =>
          router.push(
            `/${t('language_split')}/serie/${serie.id}/cast`
          )
        }
      />
      <RecommendationList
        recommendations={serie!.recommendations}
      />
    </main>
  );
};

export default SerieInfoComponent;
