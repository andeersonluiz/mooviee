import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import SubItemChild from './sub-item-child';

const MenuChild = ({
  selected,
  setSelected,
}: {
  selected: any;
  setSelected: any;
}) => {
  const headerTranslation = useTranslations('header');
  const router = useRouter();
  console.log(selected);
  return (
    <div className='md:mx- flex flex-1 justify-center gap-20 pl-8 pr-8 sm:gap-3 md:gap-10 lg:mx-8 lg:gap-20 xl:mx-16 2xl:mx-16'>
      <SubItemChild
        title={headerTranslation('home')}
        onClick={() => {
          setSelected(0);
          router.push('/');
        }}
        color={`${selected == 0 ? 'text-neutral-400' : 'text-white'}`}
      />

      <SubItemChild
        title={headerTranslation('movie')}
        onClick={() => {
          setSelected(1);
          router.push('/');
        }}
        color={`${selected == 1 ? 'text-neutral-400' : 'text-white'}`}
      />

      <SubItemChild
        title={headerTranslation('serie')}
        onClick={() => {
          setSelected(2);
          router.push('/');
        }}
        color={`${selected == 2 ? 'text-neutral-400' : 'text-white'}`}
      />
    </div>
  );
};

export default MenuChild;
