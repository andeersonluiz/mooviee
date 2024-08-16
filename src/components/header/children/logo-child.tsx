import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../../../../assets/logo.png';
import { useTranslations } from 'next-intl';

const LogoChild = () => {
  const router = useRouter();
  const t = useTranslations('metadata');
  return (
    <Image
      src={logo}
      onClick={() => router.push(`/${t('language_split')}`)}
      alt='logo image'
      className='cursor-pointer'
    ></Image>
  );
};

export default LogoChild;
