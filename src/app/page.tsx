'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useScroll } from './context/ScrollContext';
import NewsletterPopup from './components/NewsletterPopUp/NewsletterPopUp';

import Logo from '../../public/Logos/logoEditBordeux1.png';
import Hero from '../../public/Images/heroMock.png';
import TopsImage from '../../public/Images/topsImage.png';
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

  const sections = useRef<HTMLDivElement[]>([]);
  const thresholds = useRef<HTMLDivElement[]>([]);
  const [currentSection, setCurrentSection] = useState(0);

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
      const targetDiv = thresholds.current[0];
      if (targetDiv) {
        const calculatedThreshold = targetDiv.offsetTop;
        setThreshold(calculatedThreshold);
        console.log('Calculated Threshold:', calculatedThreshold); // Debugging log
      }
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
  const topPixels = windowHeight * (windowWidth <= 768 ? 0.1 : 0.1);
  const topStyle = isBeyondThreshold ? threshold + topPixels : topPixels;

  const customScrollTo = (targetPosition: number, duration: number) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  const scrollToSection = useCallback((sectionIndex: number) => {
    if (sections.current[sectionIndex]) {
      sections.current.forEach((section, index) => {
        if (index === sectionIndex) {
          section.classList.add('visible');
        } else {
          section.classList.remove('visible');
        }
      });

      const targetPosition = sections.current[sectionIndex].offsetTop;
      customScrollTo(targetPosition, 1000); // Adjust the duration as needed
      setCurrentSection(sectionIndex);
    }
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 0) {
        // Scroll down
        scrollToSection(
          Math.min(currentSection + 1, sections.current.length - 1),
        );
      } else {
        // Scroll up
        scrollToSection(Math.max(currentSection - 1, 0));
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!showPopup) {
        event.preventDefault();
      }
      const touchEndY = event.changedTouches[0].clientY;
      if (touchEndY < windowHeight / 2) {
        // Swipe up
        scrollToSection(
          Math.min(currentSection + 1, sections.current.length - 1),
        );
      } else {
        // Swipe down
        scrollToSection(Math.max(currentSection - 1, 0));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchend', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchend', handleTouchMove);
    };
  }, [currentSection, windowHeight, scrollToSection, showPopup]);

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
      <div
        className='relative w-full h-screen top-0 left-0 section'
        ref={(el) => (sections.current[0] = el!)}
      >
        <Image alt='Hero' src={Hero} layout='fill' objectFit='cover' />
      </div>
      <div ref={(el) => (sections.current[1] = el!)}></div>
      <div className='flex flex-col md:flex-row mt-[100px] section md:h-[100vh]'>
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

      <div
        className='w-full flex justify-center my-[200px] section md:h-[100vh]'
        ref={(el) => (sections.current[2] = el!)}
      >
        <div
          className='flex w-3/4 flex-col items-center justify-center'
          ref={(el) => (thresholds.current[0] = el!)}
        >
          <div className='font-altesse64 text-black text-5xl sm:text-6xl md:text-8xl mb-4'>
            Our Commitment
          </div>
          <div className='text-black font-futura text-lg flex flex-col items-center text-justify'>
            <div className='mb-2 w-full md:w-1/2 md:text-2xl'>
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
      <div ref={(el) => (sections.current[3] = el!)}></div>
    </main>
  );
}
