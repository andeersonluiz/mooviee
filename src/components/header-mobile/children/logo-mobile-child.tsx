import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../../../../assets/logo.png';
import { useTranslations } from 'next-intl';

const LogoMobileChild = () => {
  const router = useRouter();
  const t = useTranslations('metadata');

  return (
    <Image
      src={logo}
      onClick={() => router.push(`/${t('language_split')}`)}
      alt='logo image'
      height={80}
      className='w-[50%] content-center justify-center px-2 text-center'
    ></Image>
  );
};

export default LogoMobileChild;
