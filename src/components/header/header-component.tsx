import { useState } from 'react';
import {
  Button,
  DialogTrigger,
} from 'react-aria-components';
import DialogChild from './children/dialog-child';
import LanguageChild from './children/language-child';
import LogoChild from './children/logo-child';
import MenuChild from './children/menu-child';
import SearchChild from './children/search-child';

const HeaderComponent = ({
  selectedIndex = 0,
}: {
  selectedIndex?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedIndex);
  console.log(selectedIndex);
  console.log(selected);
  return (
    <header className='mx-8 pt-3 lg:mx-10 xl:mx-32 2xl:mx-48'>
      <div className={`flex items-center justify-center`}>
        <div className='flex w-40'>
          <LogoChild />
        </div>
        <MenuChild
          selected={selected}
          setSelected={setSelected}
        />
        <div className='flex w-56 items-center justify-between md:w-56 lg:w-48'>
          <DialogTrigger>
            <Button onPress={() => setIsOpen(true)}>
              <SearchChild
                onClick={() => setIsOpen(true)}
              />{' '}
            </Button>
            <DialogChild
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              selected={selected}
              setSelected={setSelected}
            />
          </DialogTrigger>
          <LanguageChild />
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
