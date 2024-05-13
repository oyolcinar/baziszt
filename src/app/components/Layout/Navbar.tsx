'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import NavMenu from '../NavMenu/NavMenu';

import Logo from '../../../../public/Logos/logoEditBlack.png';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { UserIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const router = useRouter();

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
          className='hidden md:block'
          style={{
            width: '240px',
            height: '140px',
            position: 'relative',
          }}
        >
          <Link href='/'>
            <Image alt='baziszt' src={Logo} layout='fill' objectFit='contain' />
          </Link>
        </div>
      )}
      <div className='flex items-center justify-end font-quasimoda font-bold text-black gap-6 w-[120px]'>
        <div className='cursor-pointer hover:opacity-70 transition duration-300'>
          CART(0)
        </div>
        {/* <Link
          href='/search'
          className='hover:opacity-70 transition duration-300'
        >
          <MagnifyingGlassIcon className='h-6 w-6 text-bordeux font-bold' />
        </Link>
        <Link
          href='/account'
          className='hover:opacity-70 transition duration-300'
        >
          <UserIcon className='h-6 w-6 text-bordeux font-bold' />
        </Link>
        <Link href='/bag' className='hover:opacity-70 transition duration-300'>
          <ShoppingBagIcon className='h-6 w-6 text-bordeux font-bold' />
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
