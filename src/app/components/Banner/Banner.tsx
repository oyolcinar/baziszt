'use client';
import React, { useState, useEffect, useRef } from 'react';

const Banner: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    if (bannerRef.current) {
      bannerRef.current.style.maxHeight = '30px';
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (bannerRef.current) {
      if (visible) {
        bannerRef.current.style.maxHeight = '30px';
      } else {
        bannerRef.current.style.maxHeight = '0px';
      }
    }
  }, [visible]);

  return (
    <div
      ref={bannerRef}
      className={`fixed top-[80px] left-0 right-0 bg-black text-white flex justify-center items-center transition-all duration-100 ease-in-out overflow-hidden`}
      style={{ maxHeight: '0px' }}
    >
      <div
        className='flex justify-center font-futura items-center w-full max-w-6xl px-4 cursor-pointer'
        onClick={() => setVisible(false)}
      >
        <span>FREE SHIPPING WORLDWIDE</span>
      </div>
    </div>
  );
};

export default Banner;
