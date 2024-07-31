import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const NotFoundSearch = ({ query }: { query: string }) => {
  const tSearch = useTranslations('search');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <p
      className={`${isLoading ? 'opacity-0' : 'opacity-100'} text-lg text-white`}
    >{`${tSearch('not_found')}${query}'`}</p>
  );
};
export default NotFoundSearch;
