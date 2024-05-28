'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useScroll } from './context/ScrollContext';
import { useThreshold } from './context/ThresholdContext';
import NewsletterPopup from './components/NewsletterPopUp/NewsletterPopUp';

import Hero from '../../public/Images/heroMock.png';
import TopsImage from '../../public/Images/topsImage.png';
import BottomsImage from '../../public/Images/bottomsImage.png';
import AccessoriesImage from '../../public/Images/accessoriesImage.png';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);
  const { setIsPastThreshold } = useScroll();
  const { thresholds, isThresholdReached, setThresholdReached } =
    useThreshold();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const windowHeight = window.innerHeight;

      // Track the scroll direction
      if (window.scrollY > scrollY) {
        // Scrolling down
        if (scrollCount < 2) {
          setTranslateY((prevTranslateY) => prevTranslateY - windowHeight);
          setScrollCount((prevCount) => prevCount + 1);
        } else if (scrollCount === 2) {
          setTranslateY((prevTranslateY) => prevTranslateY - 100);
          setScrollCount((prevCount) => prevCount + 1);
        }
      } else {
        // Scrolling up
        if (scrollCount > 2) {
          setTranslateY((prevTranslateY) => prevTranslateY + 100);
          setScrollCount((prevCount) => prevCount - 1);
        } else if (scrollCount > 0) {
          setTranslateY((prevTranslateY) => prevTranslateY + windowHeight);
          setScrollCount((prevCount) => prevCount - 1);
        }
      }

      const thresholdElement = thresholds.current[0];
      if (thresholdElement) {
        const thresholdPosition = thresholdElement.offsetTop;
        if (window.scrollY >= thresholdPosition && !isThresholdReached) {
          setThresholdReached(true);
        } else if (window.scrollY < thresholdPosition && isThresholdReached) {
          setThresholdReached(false);
        }
      }

      setIsPastThreshold(
        window.innerWidth <= 768 && window.scrollY > window.innerHeight,
      );
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    setIsPastThreshold,
    scrollY,
    thresholds,
    isThresholdReached,
    setThresholdReached,
    scrollCount,
  ]);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  return (
    <div>
      {showPopup && <NewsletterPopup />}
      <main
        style={{
          transform: `translateY(${translateY}px)`,
          transition: 'transform 300ms ease-in-out',
          height: `calc(100vh + 100px)`, // Height to accommodate all sections and additional margin
        }}
      >
        <div className='relative w-full h-screen top-0 left-0 section'>
          <Image alt='Hero' src={Hero} layout='fill' objectFit='cover' />
        </div>

        <div className='flex flex-row md:flex-row mt-[100px] section h-[100vh]'>
          <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300'>
            <Link href='/shop/tops' scroll={true}>
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
            <Link href='/shop/accessories' scroll={true}>
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
            <Link href='/shop/bottoms' scroll={true}>
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

        <div className='w-full flex justify-center section h-[100vh]'>
          <div className='flex w-3/4 flex-col items-center justify-center'>
            <div
              className='my-[100px] font-altesse64 text-black text-5xl sm:text-6xl md:text-8xl mb-4'
              ref={(el) => (thresholds.current[0] = el!)}
            >
              Our Commitment
            </div>
            <div className='text-black font-futura text-lg flex flex-col items-center text-justify'>
              <div className='mb-2 w-full md:w-1/2 md:text-2xl'>
                The Baziszt mission is rooted in creating an eco-responsible and
                socially conscious brand while simultaneously creating unique,
                one-of-a-kind clothing items that are crafted to live on for
                many years to come. We work with collectives of dyers and
                embroiderers in India to create vibrant and elegant garments
                from vintage fabrics that are made to live in the present but
                that still tell stories of the past. For our most recent
                collection, a majority of the items are made from hemp, a
                natural material known for its softness and ability to grow with
                minimal water.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
