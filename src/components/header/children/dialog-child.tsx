import { Dispatch, SetStateAction, Fragment, useEffect, useState, useRef } from 'react';
import HeaderComponentSearch from '../header-component-search';
import SearchIcon from '@/components/icon/search-icon';
import { useTranslations } from 'next-intl';
import CloseIcon from '@/components/icon/close-icon';
import {} from 'react-aria-components';
import {
  Modal,
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Input,
  Label,
  TextField,
} from 'react-aria-components';

const DialogChild = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) => {
  const t = useTranslations('common');
  const [isMoved, setIsMoved] = useState(false);
  const timeoutRef = useRef<any | null>(null);
  console.log('render:', isMoved, 'isOpen:', isOpen);
  const isMounted = useRef(false);

  const startTimeout = () => {
    timeoutRef.current = setTimeout(() => {
      console.log('setTimeout');
      setIsMoved(true);
    }, 10);
  };

  const clearTimeoutManually = () => {
    console.log('clearTimeout');
    clearTimeout(timeoutRef.current);

    setIsMoved(false);
  };

  if (isOpen && !isMoved) {
    console.log('startTimeout');
    startTimeout();
  }

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  const handleClick = async (props: any) => {
    console.log('handleClick called');
    if (isMounted.current) {
      console.log('isMounted:', isMounted);
      clearTimeoutManually();
      setIsOpen(false);
      await new Promise((resolve) => setTimeout(resolve, 300));
      props.close();
    }
  };
  return (
    <Modal className={``}>
      <Dialog>
        {(props) => {
          return (
            <div
              className={`fixed left-0 right-0 top-0 flex h-full w-full justify-center overflow-y-scroll bg-black bg-opacity-95 duration-500`}
            >
              <Heading className={`w-full`}>
                <div className='bg-black'>
                  <HeaderComponentSearch
                    onClick={async () => {
                      console.log('cleaning timeout');
                      clearTimeoutManually();
                      setIsOpen(false);
                      await new Promise((r) => setTimeout(r, 300));

                      props.close();
                    }}
                  />
                </div>
                <hr className='relative z-10 h-px border-0 bg-neutral-500 shadow-none' />

                <div
                  className={`relative ${!isMoved ? '!-z-10 !-translate-y-20' : ''} ${isOpen ? '-z-0 translate-y-0' : '-z-10 -translate-y-20'} flex h-20 items-center bg-black px-8 shadow-[#c2c1c189_0px_7px_10px_-10px] transition-all duration-300 ease-linear`}
                >
                  <SearchIcon pointer={false} />
                  <Input
                    className='text-input m-2 flex h-10 w-full bg-black p-2 text-white outline-none'
                    name='full_name'
                    placeholder={t('search')}
                    type='text'
                  />
                  <a
                    onClick={async () => {
                      console.log('cleaning timeout');
                      clearTimeoutManually();
                      setIsOpen(false);
                      await new Promise((r) => setTimeout(r, 300));

                      props.close();
                    }}
                  >
                    <CloseIcon />
                  </a>
                </div>
              </Heading>
            </div>
          );
        }}
      </Dialog>
    </Modal>
  );
};

export default DialogChild;
