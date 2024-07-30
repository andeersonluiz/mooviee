import { useState } from 'react';

import { Button, DialogTrigger } from 'react-aria-components';
import SidenavItemsChild from './children/sidenav-items-child';
import LogoMobileChild from './children/logo-mobile-child';
import SearchMobileChild from './children/search-mobile-child';
import LanguageMobileChild from './children/language-mobile-child';

const HeaderMobileComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className='flex h-[80px] w-full flex-row items-center pl-3 pr-6'>
      <SidenavItemsChild />
      <LogoMobileChild />
      <SearchMobileChild onClick={() => null} />
      <LanguageMobileChild />
    </header>
  );
};

export default HeaderMobileComponent;