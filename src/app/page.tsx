'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import React from 'react';

import Logo from '../../public/Logos/logoEditBordeux2.png';
import Hero from '../../public/Images/heroMock.png';
import TopsImage from '../../public/Images/topsImage.png';
import TopsImage2 from '../../public/Images/topsImage2.png';
import BottomsImage from '../../public/Images/bottomsImage.png';
import AccessoriesImage from '../../public/Images/accessoriesImage.png';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const imageSize = Math.max(50 - scrollY / 100, 10);

  return (
    <main className='h-[3000px]'>
      <div
        style={{
          width: `${imageSize}vw`,
          height: `${imageSize}vh`,
          position: 'fixed',
          top: '18%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 4,
        }}
      >
        <Image alt='Logo' src={Logo} layout='fill' objectFit='contain' />
      </div>
      <div className='relative w-full h-screen top-0 left-0'>
        <Image alt='Hero' src={Hero} layout='fill' objectFit='cover' />
      </div>

      <div className='flex flex-col md:flex-row'>
        <div className='relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3'>
          <div className='absolute font-quasimoda top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl'>
            TOPS
          </div>
          <Image alt='Tops' src={TopsImage} />
        </div>
        <div className='relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3'>
          <div className='absolute font-quasimoda top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl'>
            BOTTOMS
          </div>
          <Image alt='Bottoms' src={BottomsImage} />
        </div>
        <div className='relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3'>
          <div className='absolute font-quasimoda top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl'>
            ACCESSORIES
          </div>
          <Image alt='Accessories' src={AccessoriesImage} />
        </div>
      </div>
    </main>
  );
}
