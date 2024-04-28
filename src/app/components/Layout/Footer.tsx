import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

import brownLine from '../../../../public/Hamburger/brownLine.png';
import blueLine from '../../../../public/Hamburger/blueLine.png';
import Logo from '../../../../public/Logos/camelLogoSmall.png';

const Footer: React.FC = () => {
  const borderStyle = {
    backgroundImage: `url(${brownLine.src})`,
    backgroundRepeat: 'repeat-x',
  };

  const borderStyle2 = {
    backgroundImage: `url(${blueLine.src})`,
    backgroundRepeat: 'repeat-x',
  };

  return (
    <nav>
      <div className='flex justify-center items-center flex-row text-center'>
        {/* <div className='flex-1 w-full'>
          <div className='w-full h-2' style={borderStyle}></div>
          <div className='w-full h-2' style={borderStyle2}></div>
        </div> */}
        <div className='flex-1 w-full'>
          <div className='w-full h-2' style={borderStyle}></div>
        </div>
        <div className='py-4'>
          <Image alt='baziszt' src={Logo} width={100} height={60} />
        </div>
        {/* <div className='flex-1 w-full'>
          <div className='w-full h-2' style={borderStyle}></div>
          <div className='w-full h-2' style={borderStyle2}></div>
        </div> */}
        <div className='flex-1 w-full'>
          <div className='w-full h-2' style={borderStyle}></div>
        </div>
      </div>
      <div className='h-[200px] flex justify-center items-center'>
        <div className='w-[80%] md:w-[60%] flex justify-between items-start'>
          <div className='flex justify-center items-center'>
            <div className='flex flex-col justify-center items-start gap-4 font-quasimoda text-base'>
              <Link
                href='/'
                className='text-bordeux hover:opacity-70 transition duration-300'
              >
                TERMS OF SERVICE
              </Link>
              <Link
                href='/'
                className='text-bordeux hover:opacity-70 transition duration-300'
              >
                PRIVACY POLICY
              </Link>
              <Link
                href='/'
                className='text-bordeux hover:opacity-70 transition duration-300'
              >
                CONTACT
              </Link>
            </div>
          </div>
          <div>
            <div className='text-bordeux text-base font-quasimoda mb-6'>
              FOLLOW US
            </div>
            <div className='flex flex-row gap-6'>
              <Link
                href='/'
                className='w-[24px] cursor-pointer hover:opacity-70 transition duration-300'
              >
                <FontAwesomeIcon className='text-bordeux' icon={faInstagram} />
              </Link>
              <Link
                href='/'
                className='w-[24px] cursor-pointer hover:opacity-70 transition duration-300'
              >
                <FontAwesomeIcon
                  className='text-bordeux'
                  icon={faFacebookSquare}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center text-bordeux font-quasimoda text-sm mb-4'>
        © 2024, baziszt
      </div>
    </nav>
  );
};

export default Footer;
