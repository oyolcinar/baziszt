import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import brownLine1px from '../../../../public/Hamburger/1px/brownLine.png';
import brownLine from '../../../../public/Hamburger/brownLine.png';
import Logo from '../../../../public/Logos/camelLogo.png';

const Footer: React.FC = () => {
  // const borderStyle = {
  //   backgroundImage: `url(${brownLine1px.src})`,
  //   backgroundRepeat: 'repeat-x',
  // };

  // const borderStyle2 = {
  //   backgroundImage: `url(${blueLine.src})`,
  //   backgroundRepeat: 'repeat-x',
  // };

  return (
    <nav className='border-l-8 border-r-8 border-bordeux mx-8'>
      <div className='flex justify-center items-center flex-row text-center'>
        {/* <div className='flex-1 w-full'>
          <div className='w-full h-2' style={borderStyle}></div>
          <div className='w-full h-2' style={borderStyle2}></div>
        </div> */}
        <div className='flex-1 w-full'>
          {/* <div className='w-full h-2' style={borderStyle}></div> */}
        </div>
        <div className='py-4'>
          <Image alt='baziszt' src={Logo} width={100} height={60} />
        </div>
        {/* <div className='flex-1 w-full'>
          <div className='w-full h-2' style={borderStyle}></div>
          <div className='w-full h-2' style={borderStyle2}></div>
        </div> */}
        <div className='flex-1 w-full'>
          {/* <div className='w-full h-2' style={borderStyle}></div> */}
        </div>
      </div>
      <div className='h-[300px] md:h-[200px] flex justify-center items-center'>
        <div className='w-[80%] flex flex-col md:flex-row justify-between items-start mt-12 md:mt-0'>
          <div className='flex justify-center items-center'>
            <div className='flex flex-col justify-center items-start gap-4 font-futura text-[14px]'>
              <Link
                href='/'
                className='text-black hover:opacity-70 transition duration-300'
              >
                TERMS OF SERVICE
              </Link>
              <Link
                href='/'
                className='text-black hover:opacity-70 transition duration-300'
              >
                PRIVACY POLICY
              </Link>
              <Link
                href='/'
                className='text-black hover:opacity-70 transition duration-300'
              >
                CONTACT
              </Link>
            </div>
          </div>
          <div className='w-full md:w-[200px] flex flex-col items-between mt-4 md:mt-0'>
            <div>
              <div className='text-black text-[14px] font-futura'>
                NEWSLETTER
              </div>
              <div className='flex items-center border-b-2 border-black py-1'>
                <input
                  type='email'
                  placeholder='your email'
                  className='bg-transparent outline-none flex-1 text-black placeholder-gray text-[12px]'
                />
                <button className='w-[20px] cursor-pointer ml-2'>
                  <FontAwesomeIcon icon={faArrowRight} className='text-black' />
                </button>
              </div>
            </div>
            <div className='flex flex-row gap-6 mt-4 mb-20 md:mb-0'>
              <Link
                href='/'
                className='w-[20px] cursor-pointer hover:opacity-70 transition duration-300'
              >
                <FontAwesomeIcon className='text-black' icon={faInstagram} />
              </Link>
              <Link
                href='/'
                className='w-[20px] cursor-pointer hover:opacity-70 transition duration-300'
              >
                <FontAwesomeIcon
                  className='text-black'
                  icon={faFacebookSquare}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center text-black font-futura text-sm mb-4'>
        © 2024, baziszt
      </div>
    </nav>
  );
};

export default Footer;
