import LanguageMobileChild from './children/language-mobile-child';
import LogoMobileChild from './children/logo-mobile-child';
import SearchMobileChild from './children/search-mobile-child';
import SidenavItemsChild from './children/sidenav-items-child';

const HeaderMobileSearchComponent = ({
  onClick,
  selected,
  setSelected,
}: {
  onClick: () => void;
  selected: any;
  setSelected: any;
}) => {
  return (
    <header className='flex h-[80px] w-full flex-row items-center pl-3 pr-6'>
      <SidenavItemsChild
        selected={selected}
        setSelected={setSelected}
      />
      <LogoMobileChild />
      <div className='relative flex w-[15%] justify-center focus:outline-none'>
        <SearchMobileChild onClick={onClick} />
      </div>
      <LanguageMobileChild />
    </header>
  );
};

export default HeaderMobileSearchComponent;
