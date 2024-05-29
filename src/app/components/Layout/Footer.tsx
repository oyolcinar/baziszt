'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import brownLine1px from '../../../../public/Hamburger/1px/brownLine.png';
import brownLine from '../../../../public/Hamburger/brownLine.png';
import Logo from '../../../../public/Logos/camelLogoSmall.png';

const Footer: React.FC = () => {
  const pathName = usePathname();
  const isNotHome = pathName !== '/';

  return (
    <nav>
      {isNotHome && (
        <>
          <div className='flex justify-center items-center flex-row text-center'>
            <div className='flex-1 w-full'></div>
            <div className='py-4'>
              <Image alt='baziszt' src={Logo} width={80} height={50} />
            </div>
            <div className='flex-1 w-full'></div>
          </div>

          <div className='flex justify-center text-black font-futura text-sm mb-4'>
            © 2024, baziszt
          </div>
        </>
      )}
    </nav>
  );
};

export default Footer;
