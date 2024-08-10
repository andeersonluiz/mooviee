import { useUserAgentData } from '@/modules/presentation/provider/user-agent-provider';
import { useTranslations } from 'next-intl';
import { BiLogoGmail } from 'react-icons/bi';
import { FaGithub } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

const FooterContent = () => {
  const footerTranslations = useTranslations('footer');
  const userAgentInfo = useUserAgentData();
  return (
    <>
      <footer
        className={`h-fit w-full content-center bg-neutral-800 py-4 text-white`}
      >
        <div
          className={`${userAgentInfo.isMobile ? 'flex-col gap-6' : ''} container mx-auto flex items-center justify-between`}
        >
          <span
            className={`${userAgentInfo.isMobile ? 'text-center' : 'text-left'} text-sm`}
          >
            &copy; {new Date().getFullYear()}{' '}
            {footerTranslations('description')}
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

            <span className='pl-1'>
              {footerTranslations('followMe')}{' '}
            </span>
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
