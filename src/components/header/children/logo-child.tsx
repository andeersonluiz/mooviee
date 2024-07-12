import Image from 'next/image';
import logo from '../../../../assets/logo.png';

const LogoChild = () => {
  return <Image src={logo} alt='logo image'></Image>;
};

export default LogoChild;
