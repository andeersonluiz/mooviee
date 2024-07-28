import { useTranslations } from 'next-intl';

const HeaderMediaList = ({ title, viewAll }: { title: string; viewAll: () => void }) => {
  const t_common = useTranslations('common');

  return (
    <div className='flex w-full flex-row items-center pl-5'>
      <p className={`flex flex-1 text-lg font-bold text-white`}>{title}</p>
      <div
        className='flex cursor-pointer pr-4 transition-transform duration-75 hover:scale-105 xl:pr-[1px]'
        onClick={viewAll}
      >
        <p className={`text-base font-semibold text-slate-100`}>{`${t_common('viewAll')}`}</p>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='size-7 stroke-slate-100'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
        </svg>
      </div>
    </div>
  );
};

export default HeaderMediaList;
