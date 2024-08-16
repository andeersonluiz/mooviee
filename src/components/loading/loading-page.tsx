import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import { CircularProgress } from '@nextui-org/progress';
import FooterContent from '../footer/footer-content';
import HeaderMobileComponent from '../header-mobile/header-mobile-component';
import HeaderComponent from '../header/header-component';

const LoadingPage = ({
  selectedIndex = -1,
}: {
  selectedIndex?: number;
}) => {
  const userAgentInfo = useUserAgentData();

  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex h-full flex-1 flex-col justify-center'>
        {userAgentInfo.isMobile ? (
          <HeaderMobileComponent
            selectedIndex={selectedIndex}
          />
        ) : (
          <HeaderComponent selectedIndex={selectedIndex} />
        )}
        <div className='flex flex-1 justify-center'>
          <CircularProgress
            size='lg'
            color='warning'
            className=''
            aria-label='loading...'
          />
        </div>
        <FooterContent />
      </main>
    </div>
  );
};

export default LoadingPage;
