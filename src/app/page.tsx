'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import React from 'react';

import ProductCard from './components/ProductCard/ProductCard';
import { Product } from './components/ProductCard/ProductCard';

import Logo from '../../public/Logos/logoEditBordeux.png';
import Hero from '../../public/Images/heroMock.png';
import TopsImage from '../../public/Images/topsImage.png';
import TopsImage2 from '../../public/Images/topsImage2.png';
import BottomsImage from '../../public/Images/bottomsImage.png';
import AccessoriesImage from '../../public/Images/accessoriesImage.png';
import Link from 'next/link';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    const updateThreshold = () => {
      const pageHeight = document.body.scrollHeight;
      const calculatedThreshold = pageHeight * 0.55;
      setThreshold(calculatedThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateThreshold);

    updateThreshold();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateThreshold);
    };
  }, []);

  const imageSize = Math.max(50 - scrollY / 100, 10);

  const isBeyondThreshold = scrollY > threshold;

  const topStyle = `${threshold + 100}px`;

  return (
    <main>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            width: `${imageSize}vw`,
            height: `${imageSize}vh`,
            position: isBeyondThreshold ? 'absolute' : 'fixed',
            top: isBeyondThreshold ? topStyle : '18%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 4,
          }}
        >
          <Image alt='Logo' src={Logo} layout='fill' objectFit='contain' />
        </div>
      </div>
      <div className='relative w-full h-screen top-0 left-0'>
        <Image alt='Hero' src={Hero} layout='fill' objectFit='cover' />
      </div>

      <div className='flex flex-col md:flex-row'>
        <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3'>
          <Link href='/shop/tops'>
            <div
              className='absolute font-quasimoda top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl'
              style={{
                zIndex: 2,
              }}
            >
              TOPS
            </div>
            <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
              <Image alt='Tops' src={TopsImage} />
            </div>
          </Link>
        </div>
        <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3'>
          <Link href='/shop/bottoms'>
            <div
              className='absolute font-quasimoda top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl'
              style={{
                zIndex: 2,
              }}
            >
              BOTTOMS
            </div>
            <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
              <Image alt='Bottoms' src={BottomsImage} />
            </div>
          </Link>
        </div>
        <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3'>
          <Link href='/shop/accessories'>
            <div
              className='absolute font-quasimoda top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl'
              style={{
                zIndex: 2,
              }}
            >
              ACCESSORIES
            </div>
            <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
              <Image alt='Accessories' src={AccessoriesImage} />
            </div>
          </Link>
        </div>
      </div>

      <div className='w-full flex justify-center my-16'>
        <div className='flex w-3/4 flex-col items-center justify-center'>
          <div className='font-altesse64 text-bordeux text-5xl sm:text-6xl md:text-8xl mb-4'>
            Our Commitment
          </div>
          <div className='text-bordeux font-quasimoda text-lg flex flex-col items-center'>
            <div className='mb-2 text-center'>
              We had at heart to create an eco-responsible and socially
              conscious brand.
            </div>
            <div className='mb-2 text-center'>
              We work with collectives of dyers and embroiders in forsaken
              villages in India.
            </div>
            <div className='mb-2 text-center'>
              Most of the pieces in this collection were made from hemp, a
              material that is on the rise<br></br>not only for its nice feel on
              the skin but also thanks to the plant not being water intensive.
            </div>
            <div className='text-center'>
              We create unique clothes from vintage fabrics that tell the
              stories of the past but are made to<br></br>live in the present
              and for many years to come
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
