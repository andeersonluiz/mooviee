import { Dispatch, SetStateAction, Fragment, useEffect, useState, useRef, useContext } from 'react';
import SearchIcon from '@/components/icon/search-icon';
import { useTranslations } from 'next-intl';
import CloseIcon from '@/components/icon/close-icon';
import {} from 'react-aria-components';
import { Modal, Dialog, Heading, Input } from 'react-aria-components';
import HeaderMobileSearchComponent from '../header-mobile-search-component';
import useDebouncer from '@/hooks/debouncer';
import { MovieAndTvShowContext } from '@/modules/presentation/provider/movies-tv-show-provider';
import { Result } from '@/modules/data/model/multi-list';
import { CircularProgress } from '@nextui-org/progress';
import NotFoundSearch from '@/components/header/children/not-found-search';
import SearchTile from '@/components/header/children/search-tile';

const DialogMobileChild = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) => {
  const t = useTranslations('common');
  const tMetadata = useTranslations('metadata');

  const [isMoved, setIsMoved] = useState(false);
  const timeoutRef = useRef<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<Result[]>([]);
  const [query, setQuery] = useState('');

  const isMounted = useRef(false);
  const context = useContext(MovieAndTvShowContext);
  const debouncerValue = useDebouncer(query);

  useEffect(() => {
    if (debouncerValue) {
      const fetchData = async () => {
        document.getElementById('search_content')!.scrollTo(0, 0);
        const dataSearch = await context!.searchMultiUseCase.execute(query, tMetadata('language'));
        setSearchData(dataSearch!.results);
        setIsLoading(false);
      };
      fetchData();
    }
    if (debouncerValue == '') {
      setSearchData([]);
      setIsLoading(false);
    }
  }, [debouncerValue]);

  useEffect(() => {
    if (query != '') {
      setIsLoading(true);
    }
  }, [query]);

  const startTimeout = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMoved(true);
    }, 10);
  };

  const clearTimeoutManually = () => {
    clearTimeout(timeoutRef.current);

    setIsMoved(false);
  };

  if (isOpen && !isMoved) {
    startTimeout();
  }

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  const handleClick = async (props: any) => {
    if (isMounted.current) {
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
              className={`fixed left-0 right-0 top-0 flex h-full w-full justify-center bg-black bg-opacity-95 duration-500`}
            >
              <Heading className={`w-full`}>
                <div className='bg-black'>
                  <HeaderMobileSearchComponent
                    onClick={async () => {
                      clearTimeoutManually();
                      setIsOpen(false);
                      setSearchData([]);
                      setIsLoading(false);
                      setQuery('');
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
                    onChange={(text) => setQuery(text.target.value)}
                    type='text'
                  />
                  <a
                    onClick={async () => {
                      clearTimeoutManually();
                      setIsOpen(false);
                      setSearchData([]);
                      setIsLoading(false);
                      setQuery('');
                      await new Promise((r) => setTimeout(r, 300));
                      props.close();
                    }}
                  >
                    <CloseIcon />
                  </a>
                </div>
                <div
                  id='search_content'
                  className={`no-scrollbar flex h-[calc(100%-142px)] w-full overflow-y-scroll ${isOpen ? 'bg-black' : ''}`}
                >
                  {isOpen ? (
                    isLoading ? (
                      <div className='flex w-full items-start justify-center bg-black pt-8'>
                        <CircularProgress
                          size='lg'
                          color='warning'
                          className=''
                          aria-label='loading...'
                        />
                      </div>
                    ) : searchData.length == 0 && query != '' ? (
                      <div className='flex bg-black px-4 py-5'>
                        <NotFoundSearch query={query} />
                      </div>
                    ) : (
                      <div className='w-full flex-col gap-4 pt-6'>
                        {searchData?.map((item) => <SearchTile key={item.id} media={item} />)}
                        <div className='pt-7'></div>
                      </div>
                    )
                  ) : (
                    <></>
                  )}{' '}
                </div>
              </Heading>
            </div>
          );
        }}
      </Dialog>
    </Modal>
  );
};

export default DialogMobileChild;
