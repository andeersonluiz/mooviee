import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const TrendingLabel = () => {
  const t_common = useTranslations('common');
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <p
      className={`${isLoaded ? 'opacity-100' : 'opacity-0'} absolute bottom-80 px-5 py-2 text-xl font-bold text-white transition-opacity duration-300`}
    >
      {t_common('trendingToday')}
    </p>
  );
};

export default TrendingLabel;
