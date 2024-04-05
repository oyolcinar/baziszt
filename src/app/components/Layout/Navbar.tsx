'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

import Logo from '../../../../public/Logos/logoEditBordeux.png';

const Navbar: React.FC = () => {
  const router = useRouter();

  const pathName = usePathname();

  const isNotHome = pathName !== '/';

  return (
    <nav className='fixed top-0 left-0 right-0 flex justify-between items-center h-[60px] bg-opacity-0 text-black z-10 mx-[30px]'>
      <div className='md:mr-[180px]'>
        <HamburgerMenu />
      </div>
      {isNotHome && (
        <div
          className='hidden md:block'
          style={{
            width: '200px',
            height: '100px',
            position: 'relative',
          }}
        >
          <Link href='/'>
            <Image alt='baziszt' src={Logo} layout='fill' objectFit='contain' />
          </Link>
        </div>
      )}
      <div className='flex items-center font-quasimoda text-bone gap-4'>
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
