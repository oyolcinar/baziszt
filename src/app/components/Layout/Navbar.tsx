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
    };

    const updateThreshold = () => {
      const targetDiv = thresholds.current[0];
      if (targetDiv) {
        const calculatedThreshold = targetDiv.offsetTop;
        setThreshold(calculatedThreshold);
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
  }, [thresholds]);

  const imageSize =
    windowWidth <= 768
      ? Math.max(50 - scrollY / 100, 10)
      : Math.max(30 - scrollY / 100, 10);

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
                width: `${imageSize}vw`,
                height: `${windowWidth <= 768 ? '10vh' : `${imageSize}vh`}`,
                position: 'fixed',
                top: 0,
                left: '50%',
                transform: 'translate(-50%, 0)',
                opacity: isThresholdReached ? 0 : 1,
                transition: 'transform 0.5s ease, opacity 0.5s ease',
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
