'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMenu } from '../../context/MenuContext';

import newMenu from '../../../../public/Images/newMenu.png';
import topsMenu from '../../../../public/Images/topsMenu.png';
import bottomsMenu from '../../../../public/Images/bottomsMenu.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const NavMenu: React.FC = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [hoveredImage, setHoveredImage] = useState('');
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { navMenuOpened, openNavMenu, closeNavMenu } = useMenu();

  const router = useRouter();

  const toggleMenu = () => {
    if (navMenuOpened) {
      closeNavMenu();
    } else {
      openNavMenu();
    }
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${searchTerm}`);
      closeNavMenu();
    }
  };

  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (navMenuOpened) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    if (navMenuOpened) {
      window.addEventListener('scroll', handleScroll, { passive: false });
      window.addEventListener('wheel', handleScroll, { passive: false });
      window.addEventListener('touchmove', handleScroll, { passive: false });
    } else {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [navMenuOpened]);

  return (
    <>
      <div
        className={`cursor-pointer font-futura font-bold text-black text-[14px] md:text-base hover:opacity-70 transition duration-300 relative w-[79px] md:w-[120px] ${
          navMenuOpened ? 'z-30' : 'z-20'
        }`}
        onClick={toggleMenu}
      >
        MENU
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-20 ${
          navMenuOpened ? 'opacity-100 z-20' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      ></div>
      <div
        className={`fixed top-0 left-0 h-[100vh] w-full md:w-[30%] bg-bone transform flex justify-start items-center pl-[30px] ${
          navMenuOpened ? 'translate-x-0 z-30' : '-translate-x-full'
        } transition-transform duration-700 ease-in-out z-30`}
      >
        <div
          className='fixed top-[28px] left-[30px] font-futura font-bold cursor-pointer hover:opacity-70 transition duration-300'
          onClick={toggleMenu}
        >
          CLOSE
        </div>
        <div className='flex flex-col justify-start items-start text-base text-black font-futura gap-6 overflow-y-auto h-full w-full pt-[70px]'>
          <form className='w-full pr-[30px]' onSubmit={handleSearch}>
            <div className='flex items-center border-b-2 border-black py-1'>
              <input
                type='text'
                placeholder='search'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='bg-transparent outline-none flex-1 font-futura text-black placeholder-gray text-[14px]'
              />
              <button type='submit' className='w-[20px] cursor-pointer ml-2'>
                <MagnifyingGlassIcon className='text-black' />
              </button>
            </div>
          </form>
          <Link
            href='/shop/new'
            className='hover:opacity-70 transition duration-300'
            // onMouseEnter={() => {
            //   setHoveredImage(newMenu.src);
            //   setIsImageVisible(true);
            // }}
            // onMouseLeave={() => setIsImageVisible(false)}
            onClick={toggleMenu}
          >
            NEW
          </Link>
          <Link
            href='/shop/tops'
            className='hover:opacity-70 transition duration-300'
            // onMouseEnter={() => {
            //   setHoveredImage(topsMenu.src);
            //   setIsImageVisible(true);
            // }}
            // onMouseLeave={() => setIsImageVisible(false)}
            onClick={toggleMenu}
          >
            TOPS
          </Link>
          <Link
            href='/shop/bottoms'
            className='hover:opacity-70 transition duration-300'
            // onMouseEnter={() => {
            //   setHoveredImage(bottomsMenu.src);
            //   setIsImageVisible(true);
            // }}
            // onMouseLeave={() => setIsImageVisible(false)}
            onClick={toggleMenu}
          >
            BOTTOMS
          </Link>
          <div className='w-full flex justify-between'>
            <Link
              href='/shop/accessories'
              className='hover:opacity-70 transition duration-300'
              onClick={toggleMenu}
            >
              ACCESSORIES
            </Link>
            <Link
              href='/'
              className='hover:opacity-70 transition duration-300 pr-[30px]'
              onClick={toggleMenu}
            >
              account
            </Link>
          </div>
          <div className='w-full flex justify-between'>
            <Link
              href='/shop/oneOfone'
              className='hover:opacity-70 transition duration-300'
              onClick={toggleMenu}
            >
              ONE OF ONE
            </Link>
            <Link
              href='/'
              className='hover:opacity-70 transition duration-300 pr-[30px]'
              onClick={toggleMenu}
            >
              terms
            </Link>
          </div>
          <div className='w-full flex justify-between'>
            <Link
              href='/catalog'
              className='hover:opacity-70 transition duration-300'
              onClick={toggleMenu}
            >
              CATALOG
            </Link>
            <Link
              href='/'
              className='hover:opacity-70 transition duration-300 pr-[30px]'
              onClick={toggleMenu}
            >
              privacy
            </Link>
          </div>
          <div className='w-full flex justify-between'>
            <Link
              href='/stockists'
              className='hover:opacity-70 transition duration-300'
              onClick={toggleMenu}
            >
              STOCKISTS
            </Link>
            <Link
              href='/'
              className='hover:opacity-70 transition duration-300 pr-[30px]'
              onClick={toggleMenu}
            >
              contact
            </Link>
          </div>
          <div className='w-full flex justify-between'>
            <Link
              href='/press'
              className='hover:opacity-70 transition duration-300'
              onClick={toggleMenu}
            >
              PRESS
            </Link>
            <Link
              href='/'
              className='hover:opacity-70 transition duration-300 pr-[30px]'
              onClick={toggleMenu}
            >
              instagram
            </Link>
          </div>
          <div className='w-full flex justify-between'>
            <Link
              href='/journal'
              className='hover:opacity-70 transition duration-300'
              onClick={toggleMenu}
            >
              JOURNAL
            </Link>
            <Link
              href='/'
              className='hover:opacity-70 transition duration-300 pr-[30px]'
              onClick={toggleMenu}
            >
              facebook
            </Link>
          </div>
          <div className='w-full pr-[30px]'>
            <div className='text-black text-base font-futura'>
              SUBSCRIBE TO OUR NEWSLETTER
            </div>
            <div className='flex items-center border-b-2 border-black py-1'>
              <input
                type='email'
                placeholder='your email'
                className='bg-transparent outline-none flex-1 text-black placeholder-gray text-[14px]'
              />
              <button className='w-[20px] cursor-pointer ml-2'>
                <FontAwesomeIcon icon={faArrowRight} className='text-black' />
              </button>
            </div>
          </div>
          {/* <div
            className={`hidden sm:block w-full h-[150px] overflow-hidden transition-opacity duration-300 ${
              isImageVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {hoveredImage && (
              <div
                className={`transition-opacity duration-300 ${
                  isImageVisible ? 'opacity-100' : 'opacity-0'
                } w-full h-[30%] overflow-hidden`}
              >
                <div className='fixed bottom-0 left-0 h-[30%] w-full'>
                  <Image
                    src={hoveredImage}
                    alt='Test Image'
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
              </div>
            )}
          </div> */}
        </div>
        <div className='absolute bottom-0 left-0 flex justify-center font-futura items-center w-full max-w-4xl px-4 bg-black text-bone cursor-pointer'>
          <span>FREE SHIPPING WORLDWIDE</span>
        </div>
      </div>
    </>
  );
};

export default NavMenu;
