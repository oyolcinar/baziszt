'use client';
import { useState, useEffect, useRef } from 'react';
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
  const [scrollY, setScrollY] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [logoVisible, setLogoVisible] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { setIsPastThreshold } = useScroll();
  const isScrolling = useRef<boolean>(false);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    setLogoVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsPastThreshold(window.scrollY > window.innerHeight);
    };

    window.addEventListener('resize', updateWindowDimensions);
    window.addEventListener('scroll', handleScroll);
    updateWindowDimensions();
    window.dispatchEvent(new Event('scroll'));

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsPastThreshold]);

  useEffect(() => {
    const smoothScrollTo = (targetPos: number) => {
      if (isScrolling.current) return;

      targetPos = Math.max(
        0,
        Math.min(targetPos, document.body.scrollHeight - window.innerHeight),
      );

      isScrolling.current = true;
      const startPos = window.scrollY;
      const distance = targetPos - startPos;
      const duration = 300;
      let start: number | null = null;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percent = Math.min(progress / duration, 1);
        window.scrollTo(0, startPos + distance * percent);
        if (progress < duration) {
          requestAnimationFrame(step);
        } else {
          isScrolling.current = false;
        }
      };

      requestAnimationFrame(step);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (isScrolling.current) return;

      const delta = Math.sign(event.deltaY);
      const currentSection = Math.round(window.scrollY / windowHeight);
      const targetSection = currentSection + delta;
      const targetPos = targetSection * windowHeight;

      smoothScrollTo(targetPos);
    };

    let startY: number | null = null;
    let currentY: number | null = null;
    let isTouching = false;

    const handleTouchStart = (event: TouchEvent) => {
      startY = event.touches[0].clientY;
      isTouching = true;
      document.body.style.overflow = 'hidden';
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isTouching && startY !== null) {
        currentY = event.touches[0].clientY;
        event.preventDefault(); // Prevent default scrolling behavior
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (isTouching && startY !== null && currentY !== null) {
        const deltaY = startY - currentY;
        const threshold = 30; // Lower threshold for better responsiveness

        if (Math.abs(deltaY) > threshold) {
          event.preventDefault();
          if (isScrolling.current) return;

          const currentSection = Math.round(window.scrollY / windowHeight);
          let targetSection =
            deltaY > 0 ? currentSection + 1 : currentSection - 1;
          targetSection = Math.max(
            0,
            Math.min(
              targetSection,
              Math.floor(document.body.scrollHeight / windowHeight) - 1,
            ),
          );
          const targetPos = targetSection * windowHeight;

          smoothScrollTo(targetPos);
        }
      }
      startY = null;
      currentY = null;
      isTouching = false;
      document.body.style.overflow = '';
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      document.body.style.overflow = '';
    };
  }, [windowHeight]);

  useEffect(() => {
    setShowPopup(true);
  }, []);
  const imageSize =
    windowWidth <= 768
      ? Math.max(50 - scrollY / 100, 10)
      : Math.max(30 - scrollY / 100, 10);

  const topPixels = windowHeight * (windowWidth <= 768 ? 0.12 : 0.1);

  return (
    <main>
      {showPopup && <NewsletterPopup />}

      <div>
        <div
          style={{
            width: `${imageSize}vw`,
            height: `${imageSize}vh`,
            position: 'fixed',
            top: topPixels,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 4,
            opacity: logoVisible ? 1 : 0,
            transition: 'transform 0.3s ease, opacity 0.3s ease',
          }}
        >
          <Image alt='Logo' src={Logo} layout='fill' objectFit='contain' />
        </div>
      </div>
      <div className='relative w-full h-screen top-0 left-0 transition duration-300 ease'>
        <Image alt='Hero' src={Hero} layout='fill' objectFit='cover' />
      </div>

      {windowWidth > 768 && (
        <div className='flex flex-col md:flex-row h-screen transition duration-300 ease'>
          <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300 ease'>
            <Link href='/shop/tops'>
              <div
                className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                style={{
                  zIndex: 2,
                }}
              >
                Tops
              </div>
              <div className='transition-opacity duration-300 ease opacity-100 hover:opacity-75'>
                <Image alt='Tops' src={TopsImage} />
              </div>
            </Link>
          </div>
          <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300 ease'>
            <Link href='/shop/accessories'>
              <div
                className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                style={{
                  zIndex: 2,
                }}
              >
                Accessories
              </div>
              <div className='transition-opacity duration-300 ease opacity-100 hover:opacity-75'>
                <Image alt='Accessories' src={AccessoriesImage} />
              </div>
            </Link>
          </div>
          <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300 ease'>
            <Link href='/shop/bottoms'>
              <div
                className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                style={{
                  zIndex: 2,
                }}
              >
                Bottoms
              </div>
              <div className='transition-opacity duration-300 ease opacity-100 hover:opacity-75'>
                <Image alt='Bottoms' src={BottomsImage} />
              </div>
            </Link>
          </div>
        </div>
      )}
      {windowWidth < 768 && windowHeight < 400 && (
        <div className='flex flex-row h-screen transition duration-300 ease'>
          <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300 ease'>
            <Link href='/shop/tops'>
              <div
                className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl'
                style={{
                  zIndex: 2,
                }}
              >
                Tops
              </div>
              <div className='transition-opacity duration-300 ease opacity-100 hover:opacity-75'>
                <Image alt='Tops' src={TopsImage} />
              </div>
            </Link>
          </div>
          <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300 ease'>
            <Link href='/shop/accessories'>
              <div
                className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl'
                style={{
                  zIndex: 2,
                }}
              >
                Accessories
              </div>
              <div className='transition-opacity duration-300 ease opacity-100 hover:opacity-75'>
                <Image alt='Accessories' src={AccessoriesImage} />
              </div>
            </Link>
          </div>
          <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300 ease'>
            <Link href='/shop/bottoms'>
              <div
                className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl'
                style={{
                  zIndex: 2,
                }}
              >
                Bottoms
              </div>
              <div className='transition-opacity duration-300 ease opacity-100 hover:opacity-75'>
                <Image alt='Bottoms' src={BottomsImage} />
              </div>
            </Link>
          </div>
        </div>
      )}
      {windowWidth <= 768 && !(windowHeight < 400) && (
        <div className='lg:hidden w-full'>
          <div className='group relative cursor-pointer flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300 ease h-screen'>
            <Link href='/shop/tops'>
              <div
                className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                style={{
                  zIndex: 2,
                }}
              >
                Tops
              </div>
              <div className='transition-opacity duration-300 ease opacity-100 hover:opacity-75'>
                <Image alt='Tops' src={TopsImage} />
              </div>
            </Link>
          </div>
          <div className='group relative cursor-pointer flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300 ease h-screen'>
            <Link href='/shop/accessories'>
              <div
                className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                style={{
                  zIndex: 2,
                }}
              >
                Accessories
              </div>
              <div className='transition-opacity duration-300 ease opacity-100 hover:opacity-75'>
                <Image alt='Accessories' src={AccessoriesImage} />
              </div>
            </Link>
          </div>
          <div className='group relative cursor-pointer flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300 ease h-screen'>
            <Link href='/shop/bottoms'>
              <div
                className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                style={{
                  zIndex: 2,
                }}
              >
                Bottoms
              </div>
              <div className='transition-opacity duration-300 ease opacity-100 hover:opacity-75'>
                <Image alt='Bottoms' src={BottomsImage} />
              </div>
            </Link>
          </div>
        </div>
      )}

      <div className='w-full flex justify-center h-screen transition duration-300 ease'>
        <div className='flex w-3/4 flex-col items-center justify-center'>
          <div className='font-altesse64 text-black text-5xl sm:text-6xl md:text-8xl mb-4'>
            Our Commitment
          </div>
          <div className='text-black font-futura text-lg flex flex-col items-center text-justify'>
            <div className='mb-2 w-full md:w-1/2'>
              We had at heart to create an eco-responsible and socially
              conscious brand. We work with collectives of dyers and embroiders
              in forsaken villages in India. Most of the pieces in this
              collection were made from hemp, a material that is on the rise not
              only for its nice feel on the skin but also thanks to the plant
              not being water intensive. We create unique clothes from vintage
              fabrics that tell the stories of the past but are made to live in
              the present and for many years to come.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
