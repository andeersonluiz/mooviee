import { languageIndexOptions } from '@/config/settings';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const LanguageChild = () => {
  const t = useTranslations('metadata');
  const router = useRouter();

  const changeLocale = async (newLocale: string) => {
    router.push(`/${newLocale}${window.location.search}`);
  };
  return (
    <Menu>
      <MenuButton className='w-36 gap-2 rounded-md bg-neutral-800 px-4 py-2 pl-5 font-medium text-white shadow-inner shadow-white/10 transition [--anchor-gap:var(--spacing-10)] hover:bg-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-300 data-[open]:bg-neutral-900 data-[open]:outline-1 data-[open]:ring-1 data-[open]:ring-neutral-300'>
        {t('name')}
      </MenuButton>
      <MenuItems
        anchor={{ to: 'bottom', gap: '6px' }}
        transition
        className={`origin-top-right rounded-xl bg-neutral-900 p-1 text-sm/6 text-white shadow transition duration-150 ease-in-out [--anchor-offset:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}
      >
        {languageIndexOptions.map((item) => (
          <MenuItem key={item} data-autofocus>
            <div
              onClick={() => changeLocale(t(`data_lang.${item}.1`))}
              className='items-center rounded-xl bg-neutral-900 px-4 py-2 text-left transition-all focus:bg-neutral-700 data-[focus]:bg-neutral-700'
            >
              <p className={`flex flex-1 cursor-pointer items-center justify-between`}>
                <span className='pr-4'> {t(`data_lang.${item}.0`)}</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill={item == 0 ? 'currentColor' : 'transparent'}
                  className='inline size-5'
                >
                  <path
                    fillRule='evenodd'
                    d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
                    clipRule='evenodd'
                  />
                </svg>
              </p>
            </div>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default LanguageChild;
