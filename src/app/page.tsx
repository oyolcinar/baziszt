'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const { setIsPastThreshold } = useScroll();
  const { thresholds, isThresholdReached, setThresholdReached } =
    useThreshold();
  const initialTouchY = useRef<number | null>(null);
  const touchThreshold = 50;

  const sections = useRef<HTMLDivElement[]>([]);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsPastThreshold(
        windowWidth <= 768 && window.scrollY > window.innerHeight,
      );

      const thresholdElement = thresholds.current[0];
      if (thresholdElement) {
        const thresholdPosition = thresholdElement.offsetTop;
        if (window.scrollY >= thresholdPosition && !isThresholdReached) {
          setThresholdReached(true);
        } else if (window.scrollY < thresholdPosition && isThresholdReached) {
          setThresholdReached(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    setIsPastThreshold,
    windowWidth,
    thresholds,
    isThresholdReached,
    setThresholdReached,
  ]);

  useEffect(() => {
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    updateWindowHeight();
    window.addEventListener('resize', updateWindowHeight);

    return () => {
      window.removeEventListener('resize', updateWindowHeight);
    };
  }, []);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const customScrollTo = (targetPosition: number, duration: number) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeLinear(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const easeLinear = (t: number, b: number, c: number, d: number) => {
      return (c * t) / d + b;
    };

    requestAnimationFrame(animation);
  };

  const scrollToSection = useCallback(
    (sectionIndex: number) => {
      if (sections.current[sectionIndex]) {
        sections.current.forEach((section, index) => {
          if (index === sectionIndex) {
            section.classList.add('visible');
          } else {
            section.classList.remove('visible');
          }
        });

        const targetPosition = sections.current[sectionIndex].offsetTop;
        const duration = windowWidth <= 768 ? 200 : 800; // Shorter duration for mobile
        customScrollTo(targetPosition, duration);
        setCurrentSection(sectionIndex);
      }
    },
    [windowWidth],
  );

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 0) {
        scrollToSection(
          Math.min(currentSection + 1, sections.current.length - 1),
        );
      } else {
        scrollToSection(Math.max(currentSection - 1, 0));
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      initialTouchY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!initialTouchY.current) return;

      const currentTouchY = event.touches[0].clientY;
      const deltaY = initialTouchY.current - currentTouchY;

      if (Math.abs(deltaY) > touchThreshold) {
        if (deltaY > 0) {
          scrollToSection(
            Math.min(currentSection + 1, sections.current.length - 1),
          );
        } else {
          scrollToSection(Math.max(currentSection - 1, 0));
        }
        initialTouchY.current = null;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentSection, windowHeight, scrollToSection, showPopup]);

  return (
    <main>
      {showPopup && <NewsletterPopup />}
      <div
        className='relative w-full h-screen top-0 left-0 section'
        ref={(el) => (sections.current[0] = el!)}
      >
        <Image alt='Hero' src={Hero} layout='fill' objectFit='cover' />
      </div>
      <div ref={(el) => (sections.current[1] = el!)}></div>
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

      <div
        className='w-full flex justify-center my-[200px] section h-[100vh]'
        ref={(el) => (sections.current[2] = el!)}
      >
        <div className='flex w-3/4 flex-col items-center justify-center'>
          <div
            className='font-altesse64 text-black text-5xl sm:text-6xl md:text-8xl mb-4'
            ref={(el) => (thresholds.current[0] = el!)}
          >
            Our Commitment
          </div>
          <div className='text-black font-futura text-lg flex flex-col items-center text-justify'>
            <div className='mb-2 w-full md:w-1/2 md:text-2xl'>
              The Baziszt mission is rooted in creating an eco-responsible and
              socially conscious brand while simultaneously creating unique,
              one-of-a-kind clothing items that are crafted to live on for many
              years to come. We work with collectives of dyers and embroiderers
              in India to create vibrant and elegant garments from vintage
              fabrics that are made to live in the present but that still tell
              stories of the past. For our most recent collection, a majority of
              the items are made from hemp, a natural material known for its
              softness and ability to grow with minimal water.
            </div>
          </div>
        </div>
      </div>
      <div ref={(el) => (sections.current[3] = el!)}></div>
    </main>
  );
}
