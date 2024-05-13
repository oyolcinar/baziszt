'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import newMenu from '../../../../public/Images/newMenu.png';
import topsMenu from '../../../../public/Images/topsMenu.png';
import bottomsMenu from '../../../../public/Images/bottomsMenu.png';

const NavMenu: React.FC = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [hoveredImage, setHoveredImage] = useState('');
  const [isImageVisible, setIsImageVisible] = useState(false);

  const toggleMenu = () => {
    if (!menuOpened) {
      setMenuOpened(true);
    } else {
      setMenuOpened(false);
    }
  };

  return (
    <>
      <div
        className='cursor-pointer font-quasimoda font-bold text-black text-[14px] md:text-base hover:opacity-70 transition duration-300 relative z-50 w-[79px] md:w-[120px]'
        onClick={toggleMenu}
      >
        {menuOpened ? 'CLOSE' : 'MENU'}
      </div>
      <div
        className={`fixed top-0 left-0 h-[100vh] w-full md:w-[30%] bg-bone transform flex justify-start items-center pl-[30px] ${
          menuOpened ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-700 ease-in-out z-40`}
      >
        <div className='flex flex-col justify-start items-start text-base text-black font-quasimoda gap-6 overflow-y-auto h-full w-full pt-[100px]'>
          {/* <Link
            href='/'
            className='md:hidden hover:opacity-70 transition duration-300'
            onClick={toggleMenu}
          >
            HOME
          </Link> */}
          <div className='w-full flex justify-between'>
            <Link
              href='/shop/new'
              className='hover:opacity-70 transition duration-300'
              onMouseEnter={() => {
                setHoveredImage(newMenu.src);
                setIsImageVisible(true);
              }}
              onMouseLeave={() => setIsImageVisible(false)}
              onClick={toggleMenu}
            >
              NEW
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
              href='/shop/tops'
              className='hover:opacity-70 transition duration-300'
              onMouseEnter={() => {
                setHoveredImage(topsMenu.src);
                setIsImageVisible(true);
              }}
              onMouseLeave={() => setIsImageVisible(false)}
              onClick={toggleMenu}
            >
              TOPS
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
              href='/shop/bottoms'
              className='hover:opacity-70 transition duration-300'
              onMouseEnter={() => {
                setHoveredImage(bottomsMenu.src);
                setIsImageVisible(true);
              }}
              onMouseLeave={() => setIsImageVisible(false)}
              onClick={toggleMenu}
            >
              BOTTOMS
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
              href='/shop/accessories'
              className='hover:opacity-70 transition duration-300'
              // onMouseEnter={() => {
              //   setHoveredImage(accessoriesMenu.src);
              //   setIsImageVisible(true);
              // }}
              // onMouseLeave={() => setIsImageVisible(false)}
              onClick={toggleMenu}
            >
              ACCESSORIES
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
              facebook
            </Link>
          </div>
          <Link
            href='/stockists'
            className='hover:opacity-70 transition duration-300'
            onClick={toggleMenu}
          >
            STOCKISTS
          </Link>
          <Link
            href='/press'
            className='hover:opacity-70 transition duration-300'
            onClick={toggleMenu}
          >
            PRESS
          </Link>
          <Link
            href='/journal'
            className='hover:opacity-70 transition duration-300'
            onClick={toggleMenu}
          >
            JOURNAL
          </Link>
          <div
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
          </div>
        </div>
      </div>
    </>
  );
};

export default NavMenu;
