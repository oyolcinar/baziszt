'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useBanner } from '../../context/BannerContext';
import { useTranslation } from '../../../../utils/useTranslation';

const Banner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const { setBannerHeight, isVisible, setIsVisible } = useBanner();
  const [isRemoved, setIsRemoved] = useState(false);

  const { t } = useTranslation();

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
      className={`fixed top-0 left-0 right-0 bg-bordeux text-[12px] text-bone flex justify-center items-center transition-all duration-100 ease-in-out overflow-hidden z-10`}
    >
      <div
        className='flex justify-center font-futura font-bold items-center w-full max-w-4xl cursor-pointer'
        // onClick={handleClose}
      >
        <span>{t('freeshipping')}</span>
      </div>
    </div>
  );
};

export default Banner;
