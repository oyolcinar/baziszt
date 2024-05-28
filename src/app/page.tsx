'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import { useScroll } from './context/ScrollContext';
import ProductCard from './components/ProductCard/ProductCard';
import NewsletterPopup from './components/NewsletterPopUp/NewsletterPopUp';

import Logo from '../../public/Logos/logoEditBordeux1.png';
import Hero from '../../public/Images/heroMock.png';
import TopsImage from '../../public/Images/topsImage.png';
import TopsImage2 from '../../public/Images/topsImage2.png';
import BottomsImage from '../../public/Images/bottomsImage.png';
import AccessoriesImage from '../../public/Images/accessoriesImage.png';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { setIsPastThreshold } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      setIsPastThreshold(
        windowWidth <= 768 && window.scrollY > window.innerHeight,
      );
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsPastThreshold, windowWidth]);
  useEffect(() => {
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (!logoVisible) setLogoVisible(true);
    };
    const updateThreshold = () => {
      const pageHeight = document.body.scrollHeight;
      const calculatedThreshold = pageHeight * 0.55;

      setThreshold(calculatedThreshold);
    };
    window.addEventListener('resize', updateWindowHeight);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateThreshold);
    updateWindowHeight();
    updateThreshold();
    window.dispatchEvent(new Event('scroll'));
    return () => {
      window.removeEventListener('resize', updateWindowHeight);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateThreshold);
    };
  }, [logoVisible]);
  useEffect(() => {
    setShowPopup(true);
  }, []);
  const imageSize =
    windowWidth <= 768
      ? Math.max(50 - scrollY / 100, 10)
      : Math.max(30 - scrollY / 100, 10);
  const isBeyondThreshold = scrollY > threshold;
  const topPixels = windowHeight * (windowWidth <= 768 ? 0.18 : 0.1);
  const topStyle = isBeyondThreshold ? threshold + topPixels : topPixels;

  return (
    <main>
      {showPopup && <NewsletterPopup />}

      <div style={{ position: 'relative' }}>
        <div
          style={{
            width: `${imageSize}vw`,
            height: `${imageSize}vh`,
            position: isBeyondThreshold ? 'absolute' : 'fixed',
            top: topStyle,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 4,
            opacity: logoVisible ? 1 : 0,
            transition: 'transform 0.5s ease, opacity 0.5s ease',
          }}
        >
          <Image alt='Logo' src={Logo} layout='fill' objectFit='contain' />
        </div>
      </div>
      <div className='relative w-full h-screen top-0 left-0'>
        <Image alt='Hero' src={Hero} layout='fill' objectFit='cover' />
      </div>

      <div className='flex flex-col md:flex-row h-screen'>
        <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300'>
          <Link href='/shop/tops'>
            <div
              className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl '
              style={{
                zIndex: 2,
              }}
            >
              Tops
            </div>
            <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
              <Image alt='Tops' src={TopsImage} />
            </div>
          </Link>
        </div>
        <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300'>
          <Link href='/shop/accessories'>
            <div
              className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
              style={{
                zIndex: 2,
              }}
            >
              Accessories
            </div>
            <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
              <Image alt='Accessories' src={AccessoriesImage} />
            </div>
          </Link>
        </div>
        <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300'>
          <Link href='/shop/bottoms'>
            <div
              className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
              style={{
                zIndex: 2,
              }}
            >
              Bottoms
            </div>
            <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
              <Image alt='Bottoms' src={BottomsImage} />
            </div>
          </Link>
        </div>
      </div>

      <div className='w-full flex justify-center h-screen'>
        <div className='flex w-3/4 flex-col items-center justify-center'>
          <div className='font-altesse64 text-black text-5xl sm:text-6xl md:text-8xl mb-4'>
            Our Commitment
          </div>
          <div className='text-black font-futura text-lg flex flex-col items-center text-justify'>
            <div className='mb-2 w-full md:w-1/2'>
              We had at heart to create an eco-responsible and socially
              conscious brand. We work with collectives of dyers and embroiders
              in forsaken villages in India. We work with collectives of dyers
              and embroiders in forsaken villages in India. Most of the pieces
              in this collection were made from hemp, a material that is on the
              rise not only for its nice feel on the skin but also thanks to the
              plant not being water intensive. We create unique clothes from
              vintage fabrics that tell the stories of the past but are made to
              live in the present and for many years to come.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
