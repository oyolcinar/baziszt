'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import NavMenu from '../NavMenu/NavMenu';
import CartMenu from '../Cart/CartMenu';

import Logo from '../../../../public/Logos/logoEditBlack.png';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { UserIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const pathName = usePathname();
  const isNotHome = pathName !== '/';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 flex justify-between items-center h-[80px] text-black z-10 px-[30px] ${
        isNotHome ? 'bg-white' : 'bg-opacity-0'
      }`}
    >
      <div>
        <NavMenu />
      </div>
      {isNotHome && (
        <div
          // className='hidden md:block'
          className='relative w-[110px] h-[65px] md:w-[240px] md:h-[140px]'
        >
          <Link href='/'>
            <Image alt='baziszt' src={Logo} layout='fill' objectFit='contain' />
          </Link>
        </div>
      )}
      <CartMenu />
    </nav>
  );
};

export default Navbar;
