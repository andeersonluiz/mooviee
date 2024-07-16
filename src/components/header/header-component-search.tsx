import { useState } from 'react';
import LanguageChild from './children/language-child';
import LogoChild from './children/logo-child';
import MenuChild from './children/menu-child';
import SearchChild from './children/search-child';
import DialogChild from './children/dialog-child';

const HeaderComponentSearch = ({ onClick }: { onClick: () => void }) => {
  return (
    <header className='relative mx-8 pb-2 pt-3 lg:mx-10 xl:mx-32 2xl:mx-48'>
      <div className='flex items-center justify-center'>
        <div className='flex w-40'>
          <LogoChild />
        </div>
        <MenuChild />
        <div className='flex w-56 items-center justify-between md:w-56 lg:w-48'>
          <SearchChild onClick={onClick} />

          <LanguageChild />
        </div>
      </div>
    </header>
  );
};

export default HeaderComponentSearch;
