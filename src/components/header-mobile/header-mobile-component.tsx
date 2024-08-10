import { useState } from 'react';

import {
  Button,
  DialogTrigger,
} from 'react-aria-components';
import DialogMobileChild from './children/dialog-mobile-child';
import LanguageMobileChild from './children/language-mobile-child';
import LogoMobileChild from './children/logo-mobile-child';
import SearchMobileChild from './children/search-mobile-child';
import SidenavItemsChild from './children/sidenav-items-child';

const HeaderMobileComponent = ({
  selectedIndex = 0,
}: {
  selectedIndex?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedIndex);

  return (
    <header className='flex h-[80px] w-full flex-row items-center pl-3 pr-6'>
      <SidenavItemsChild
        selected={selected}
        setSelected={setSelected}
      />
      <LogoMobileChild />

      <DialogTrigger>
        <Button
          onPress={() => setIsOpen(true)}
          className='relative flex w-[15%] justify-center focus:outline-none'
        >
          <SearchMobileChild
            onClick={() => setIsOpen(true)}
          />
        </Button>
        <DialogMobileChild
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selected={selected}
          setSelected={setSelected}
        />
      </DialogTrigger>
      <LanguageMobileChild />
    </header>
  );
};

export default HeaderMobileComponent;
