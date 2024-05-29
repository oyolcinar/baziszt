'use client';
import { usePathname } from 'next/navigation';
import { useScroll } from '../../context/ScrollContext';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import NavMenu from '../NavMenu/NavMenu';
import CartMenu from '../Cart/CartMenu';
import Banner from '../Banner/Banner';

import { useBanner } from '../../context/BannerContext';

import Logo from '../../../../public/Logos/logoEditBordeux1.png';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { UserIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const { isPastThreshold } = useScroll();
  const pathName = usePathname();
  const isNotHome = pathName !== '/';
  const { bannerHeight, isVisible } = useBanner();

  return (
    <>
      {isNotHome && <Banner />}
      <nav
        style={{ top: isNotHome ? `16px` : '0px' }}
        className={`fixed left-0 right-0 flex justify-between items-center bg-white h-[80px] text-black z-10 px-[30px] transition-all duration-300 border-l-[10px] border-r-[10px] border-bordeux ${
          isNotHome ? 'bg-opacity-100' : 'bg-opacity-0'
        }`}
      >
        <div>
          <NavMenu />
        </div>
        {isNotHome && (
          <div className='relative w-[110px] h-[65px] md:w-[240px] md:h-[140px]'>
            <Link href='/'>
              <Image
                alt='baziszt'
                src={Logo}
                layout='fill'
                objectFit='contain'
              />
            </Link>
          </div>
        )}
        <CartMenu />
      </nav>
    </>
  );
};
export default Navbar;
