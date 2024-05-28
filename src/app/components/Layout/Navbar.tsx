'use client';
import { usePathname } from 'next/navigation';
import { useScroll } from '../../context/ScrollContext';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import NavMenu from '../NavMenu/NavMenu';
import CartMenu from '../Cart/CartMenu';
import Banner from '../Banner/Banner';

import { useBanner } from '../../context/BannerContext';
import { useThreshold } from '../../context/ThresholdContext';

import Logo from '../../../../public/Logos/logoEditBordeux1.png';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { UserIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const { isPastThreshold, setIsPastThreshold } = useScroll();
  const pathName = usePathname();
  const isNotHome = pathName !== '/';
  const { bannerHeight, isVisible } = useBanner();
  const { thresholds, isThresholdReached } = useThreshold();

  const [scrollY, setScrollY] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [imageSize, setImageSize] = useState(50);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      setIsPastThreshold(windowWidth <= 768 && newScrollY > window.innerHeight);

      const amplifiedScrollY = newScrollY * 8;

      const newSize =
        windowWidth <= 768
          ? Math.max(50 - amplifiedScrollY / 100, 10)
          : Math.max(30 - amplifiedScrollY / 100, 10);

      setImageSize(newSize);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsPastThreshold, windowWidth]);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    const updateThreshold = () => {
      const targetDiv = thresholds.current[0];
      if (targetDiv) {
        const calculatedThreshold = targetDiv.offsetTop;
        setThreshold(calculatedThreshold);
      }
    };

    window.addEventListener('resize', updateWindowDimensions);
    window.addEventListener('resize', updateThreshold);

    updateWindowDimensions();
    updateThreshold();
    window.dispatchEvent(new Event('scroll'));

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
      window.removeEventListener('resize', updateThreshold);
    };
  }, [thresholds]);

  return (
    <>
      {isNotHome && <Banner />}
      <nav
        style={{ top: isNotHome ? `16px` : '0px' }}
        className={`fixed left-0 right-0 flex justify-between items-center bg-white h-[80px] text-black z-10 px-[30px] transition-all duration-300 border-l-[10px] border-r-[10px] border-bordeux ${
          isNotHome || isPastThreshold ? 'bg-opacity-100' : 'bg-opacity-0'
        }`}
      >
        <NavMenu />

        {!isNotHome && (
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: `${imageSize * 1.2}vw`,
                height: `${windowWidth <= 768 ? '10vh' : `${imageSize}vh`}`,
                position: 'fixed',
                top: 0,
                left: '50%',
                transform: 'translate(-50%, 0)',
                opacity: isThresholdReached ? 0 : 1,
                transition:
                  'width 0.5s ease, height 0.5s ease, opacity 0.5s ease',
              }}
            >
              <Image alt='Logo' src={Logo} layout='fill' objectFit='contain' />
            </div>
          </div>
        )}

        {isNotHome && (
          <div className='relative w-[110px] h-[65px] md:w-[240px] md:h-[140px]'>
            <Link href='/'>
              <Image
                alt='baziszt'
                src={Logo}
                layout='fill'
                objectFit='contain'
              />
            </Link>
          </div>
        )}
        <CartMenu />
      </nav>
    </>
  );
};

export default Navbar;
