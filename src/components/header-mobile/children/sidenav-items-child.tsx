import { languageIndexOptions } from '@/config/settings';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Button, Drawer } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ItemMobileChild from './item-mobile-child';

const SidenavItemsChild = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const headerTranslation = useTranslations('header');

  return (
    <div className='flex w-[20%] justify-start rounded-lg'>
      <Button
        onClick={() => setIsOpenDrawer(true)}
        className='rounded-lg p-2 text-sm text-gray-500 focus:outline-none sm:hidden'
      >
        <span className='sr-only'>Open sidebar</span>
        <svg
          className='size-7'
          aria-hidden='true'
          fill='white'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            clip-rule='evenodd'
            fill-rule='evenodd'
            d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
          ></path>
        </svg>
      </Button>
      <Drawer open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
        <div className='h-full w-[70vw] border-none bg-neutral-950'>
          <div className='p-6'>
            <button onClick={() => setIsOpenDrawer(false)}>
              <span className='sr-only'>close</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='white'
                className='size-7'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          <div className='flex flex-col gap-4 px-6'>
            <ItemMobileChild
              title={headerTranslation('home')}
              color='bg-neutral-500 font-semibold'
            />
            <ItemMobileChild title={headerTranslation('movie')} color='bg-transparent' />
            <ItemMobileChild title={headerTranslation('serie')} color='bg-transparent' />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SidenavItemsChild;