'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import React from 'react';

import Logo from '../../public/Logos/logoEditBordeux2.png';
import Hero from '../../public/Images/heroMock.png';

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
    <main className='h-[10000px]'>
      <div
        style={{
          width: `${imageSize}vw`,
          height: `${imageSize}vh`,
          position: 'sticky',
          top: '18%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 4,
        }}
      >
        <Image alt='Logo' src={Logo} layout='fill' objectFit='contain' />
      </div>
      <div
        style={{
          width: '100%',
          height: '100vh',
        }}
      >
        <Image alt='Hero' src={Hero} layout='fill' objectFit='cover' />
      </div>
    </main>
  );
}
