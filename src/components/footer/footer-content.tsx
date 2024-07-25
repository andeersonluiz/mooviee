import { FaGithub } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';
import { useTranslations } from 'next-intl';

const FooterContent = () => {
  const footerTranslations = useTranslations('footer');
  return (
    <>
      <footer className='h-[70px] w-full content-center bg-neutral-800 py-0 text-white'>
        <div className='container mx-auto flex items-center justify-between'>
          <span className='text-sm'>
            &copy; {new Date().getFullYear()} {footerTranslations('description')}
          </span>
          <div className='flex items-center space-x-3'>
            <span>{footerTranslations('contact')}</span>
            <a
              href='mailto:andeersonrocha1998@gmail.com'
              className='pr-1 hover:text-gray-400'
              title='gmail link'
            >
              <BiLogoGmail
                size={27}
                className='rounded-md bg-[#e4e4e6] p-[2px] text-[#bd4336] hover:bg-gray-400'
              />
            </a>
            <div className='h-[35px] w-[1px] content-center bg-white'></div>

            <span className='pl-1'>{footerTranslations('followMe')} </span>
            <a
              href='https://github.com/andeersonluiz'
              target='_blank'
              rel='noopener'
              className='hover:text-gray-400'
              title='github link'
            >
              <FaGithub size={25} />
            </a>

            <a
              href='https://x.com/Luizinnh01'
              target='_blank'
              className='hover:text-gray-400'
              rel='noopener'
              title='X link'
            >
              <FaSquareXTwitter size={28} />
            </a>
          </div>{' '}
        </div>
      </footer>
    </>
  );
};

export default FooterContent;
