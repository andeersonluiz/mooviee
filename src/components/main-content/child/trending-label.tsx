import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const TrendingLabel = () => {
  const t_common = useTranslations('common');
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <p
      className={`${isLoaded ? 'opacity-100' : 'opacity-0'} absolute bottom-80 px-8 py-2 text-xl font-bold text-white transition-opacity duration-300`}
    >
      {t_common('trendingToday')}
    </p>
  );
};

export default TrendingLabel;
