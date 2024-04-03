'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

import Logo from '../../../../public/Logos/logoEditBordeux2.png';

const Navbar: React.FC = () => {
  const router = useRouter();

  const pathName = usePathname();

  const isNotHome = pathName !== '/';

  return (
    <nav className='flex justify-between items-center h-[60px] bg-opacity-0 text-black sticky top-0 z-10 mx-[30px]'>
      <div className='mr-[180px]'>
        <HamburgerMenu />
      </div>
      {isNotHome && (
        <div
          style={{
            width: '200px',
            height: '100px',
            position: 'relative',
          }}
        >
          <Image alt='baziszt' src={Logo} layout='fill' objectFit='contain' />
        </div>
      )}
      <div className='flex items-center font-quasimoda text-bordeux gap-4'>
        <Link
          href='/search'
          className='hover:opacity-70 transition duration-300'
        >
          SEARCH
        </Link>
        <Link
          href='/account'
          className='hover:opacity-70 transition duration-300'
        >
          ACCOUNT
        </Link>
        <Link href='/bag' className='hover:opacity-70 transition duration-300'>
          BAG
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
