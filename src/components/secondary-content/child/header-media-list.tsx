import ArrowGoIcon from '@/components/icon/arrow-go-icon';
import { useTranslations } from 'next-intl';

const HeaderMediaList = ({
  title,
  viewAll,
}: {
  title: string;
  viewAll?: () => void;
}) => {
  const t_common = useTranslations('common');

  return (
    <div className='flex w-full flex-row items-center pl-5'>
      <p
        className={`flex flex-1 text-lg font-bold text-white`}
      >
        {title}
      </p>
      {viewAll && (
        <div
          className='flex cursor-pointer select-none pr-4 transition-transform duration-75 hover:scale-105 xl:pr-[1px]'
          onClick={viewAll}
        >
          <p
            className={`text-base font-semibold text-slate-100`}
          >{`${t_common('viewAll')}`}</p>
          <ArrowGoIcon className='size-7 stroke-slate-100' />
        </div>
      )}
    </div>
  );
};

export default HeaderMediaList;
