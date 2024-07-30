import Image from 'next/image';
import logo from '../../../../assets/logo.png';

const LogoMobileChild = () => {
  return (
    <Image
      src={logo}
      alt='logo image'
      height={80}
      className='w-[50%] content-center justify-center px-2 text-center'
    ></Image>
  );
};

export default LogoMobileChild;
