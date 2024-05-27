'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useBanner } from '../../context/BannerContext';

const Banner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const { setBannerHeight, isVisible, setIsVisible } = useBanner();
  const [isRemoved, setIsRemoved] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 50) {
  //       setIsVisible(false);
  //     } else {
  //       setIsVisible(true);
  //     }
  //   };

  //   if (bannerRef.current) {
  //     setBannerHeight(bannerRef.current.scrollHeight);
  //   }

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [setBannerHeight, setIsVisible]);

  useEffect(() => {
    if (bannerRef.current) {
      bannerRef.current.style.maxHeight = isVisible ? '16px' : '0px';
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsRemoved(true);
      setBannerHeight(0);
    }, 100);
  };

  if (isRemoved) return null;

  return (
    <div
      ref={bannerRef}
      className={`fixed top-0 left-0 right-0 bg-bordeux text-bone flex justify-center items-center transition-all duration-100 ease-in-out overflow-hidden z-10`}
    >
      <div
        className='flex justify-center font-futura font-bold items-center w-full max-w-4xl px-4 cursor-pointer'
        // onClick={handleClose}
      >
        <span>FREE SHIPPING WORLDWIDE FOR ORDERS OVER €600</span>
      </div>
    </div>
  );
};

export default Banner;
