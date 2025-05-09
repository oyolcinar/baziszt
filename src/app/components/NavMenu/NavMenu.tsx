'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMenu } from '../../context/MenuContext';
import { useTranslation } from '../../../../utils/useTranslation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const NavMenu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { navMenuOpened, openNavMenu, closeNavMenu } = useMenu();
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [email, setEmail] = useState('');

  const { t } = useTranslation();

  const router = useRouter();

  const toggleMenu = () => {
    if (navMenuOpened) {
      closeNavMenu();
    } else {
      openNavMenu();
    }
  };

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubscriptionMessage('');

    try {
      const response = await fetch('/api/subscribeToNewsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscriptionMessage(t('subscriptionSuccess'));
        setEmail('');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to subscribe');
      }
    } catch (error) {
      setSubscriptionMessage(t('subscriptionError'));
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
        className={`cursor-pointer font-futura font-bold text-bordeux text-[14px] md:text-base hover:opacity-70 transition duration-300 relative w-[79px] md:w-[120px] ${
          navMenuOpened ? 'z-40' : 'z-30'
        }`}
        onClick={toggleMenu}
      >
        {t('menu')}
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-30 ${
          navMenuOpened ? 'opacity-100 z-30' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      ></div>
      <div
        className={`fixed top-0 left-0 h-[100vh] w-full md:w-[30%] bg-bone transform flex justify-start items-center pl-[30px] ${
          navMenuOpened ? 'translate-x-0 z-40' : '-translate-x-full'
        } transition-transform duration-700 ease-in-out z-30`}
      >
        <div
          className='fixed top-[28px] left-[30px] text-black font-futura font-bold cursor-pointer hover:opacity-70 transition duration-300'
          onClick={toggleMenu}
        >
          {t('close')}
        </div>
        <div className='flex flex-col justify-start items-start text-base text-black font-futura gap-6 overflow-y-auto h-full w-full pt-[70px]'>
          <form className='w-full pr-[30px]' onSubmit={handleSearch}>
            <div className='flex items-center border-b-2 border-black py-1'>
              <input
                type='text'
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='bg-transparent outline-none flex-1 font-futura text-black placeholder-gray text-[14px]'
              />
              <button type='submit' className='w-[20px] cursor-pointer ml-2'>
                <MagnifyingGlassIcon className='text-black hover:opacity-70 transition duration-300' />
              </button>
            </div>
          </form>
          {/* <Link
            href='/shop/new'
            className='hover:opacity-70 transition duration-300'
            scroll={true}
            onClick={toggleMenu}
          >
            {t('new').toUpperCase()}
          </Link> */}
          <div className='w-full flex justify-between'>
            {/* <Link
              href='/shop/oneOfone'
              className='hover:opacity-70 transition duration-300'
              scroll={true}
              onClick={toggleMenu}
            >
              {t('oneofone').toUpperCase()}
            </Link> */}
            <Link
              href='/shop/latest-arrivals'
              className='hover:opacity-70 transition duration-300'
              scroll={true}
              onClick={toggleMenu}
            >
              {t('latestArrivals').toUpperCase()}
            </Link>
            <Link
              href='/wishlist'
              className='hover:opacity-70 transition duration-300 pr-[30px]'
              scroll={true}
              onClick={toggleMenu}
            >
              {t('wishlist')}
            </Link>
          </div>
          <div className='w-full flex justify-between'>
            <Link
              href='/shop/shirts-and-tops'
              className='hover:opacity-70 transition duration-300'
              scroll={true}
              onClick={toggleMenu}
            >
              {t('shirtsAndTops').toUpperCase()}
            </Link>
            <Link
              href='/account'
              className='hover:opacity-70 transition duration-300 pr-[30px]'
              scroll={true}
              onClick={toggleMenu}
            >
              {t('account')}
            </Link>
          </div>
          <div className='w-full flex justify-between'>
            <Link
              href='/shop/bottoms'
              className='hover:opacity-70 transition duration-300'
              scroll={true}
              // onMouseEnter={() => {
              //   setHoveredImage(bottomsMenu.src);
              //   setIsImageVisible(true);
              // }}
              // onMouseLeave={() => setIsImageVisible(false)}
              onClick={toggleMenu}
            >
              {t('bottoms').toUpperCase()}
            </Link>
            <Link
              href='/legal-notice'
              className='hover:opacity-70 transition duration-300 pr-[30px]'
              scroll={true}
              onClick={toggleMenu}
            >
              {t('legal')}
            </Link>
          </div>
          <div className='w-full flex justify-between'>
            <Link
              href='/shop/knitwear'
              className='hover:opacity-70 transition duration-300'
              scroll={true}
              onClick={toggleMenu}
            >
              {t('knitwear').toUpperCase()}
            </Link>
            <Link
              href='/terms-of-sale'
              className='hover:opacity-70 transition duration-300 pr-[30px]'
              scroll={true}
              onClick={toggleMenu}
            >
              {t('terms')}
            </Link>
          </div>
          <div className='w-full flex justify-between'>
            <Link
              href='/shop/jackets'
              className='hover:opacity-70 transition duration-300'
              scroll={true}
              onClick={toggleMenu}
            >
              {t('jackets').toUpperCase()}
            </Link>
            <Link
              href='/privacy-policy'
              className='hover:opacity-70 transition duration-300 pr-[30px]'
              scroll={true}
              onClick={toggleMenu}
            >
              {t('privacy')}
            </Link>
          </div>
          <div className='w-full flex justify-between'>
            <Link
              href='/shop/accessories'
              className='hover:opacity-70 transition duration-300'
              scroll={true}
              onClick={toggleMenu}
            >
              {t('accessories').toUpperCase()}
            </Link>
            <Link
              href='/contact'
              className='hover:opacity-70 transition duration-300 pr-[30px]'
              scroll={true}
              onClick={toggleMenu}
            >
              {t('contact')}
            </Link>
          </div>
          <div className='w-full flex justify-between'>
            <Link
              href='/catalog'
              className='hover:opacity-70 transition duration-300'
              scroll={true}
              onClick={toggleMenu}
            >
              {t('collection').toUpperCase()}
            </Link>
            <Link
              href='https://www.instagram.com/baziszt/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:opacity-70 transition duration-300 pr-[30px]'
              scroll={true}
              onClick={toggleMenu}
            >
              instagram
            </Link>
          </div>
          <div className='w-full flex justify-between'>
            <Link
              href='/stockists'
              className='hover:opacity-70 transition duration-300'
              scroll={true}
              onClick={toggleMenu}
            >
              {t('stockists')}
            </Link>
            <Link
              href='https://www.facebook.com/baziszt/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:opacity-70 transition duration-300 pr-[30px]'
              scroll={true}
              onClick={toggleMenu}
            >
              facebook
            </Link>
          </div>
          <Link
            href='/journal'
            className='hover:opacity-70 transition duration-300'
            scroll={true}
            onClick={toggleMenu}
          >
            {t('journal')}
          </Link>
          <Link
            href='/press'
            className='hover:opacity-70 transition duration-300'
            scroll={true}
            onClick={toggleMenu}
          >
            {t('press')}
          </Link>
        </div>
        <div className='absolute bottom-[35px] left-0 w-full px-[30px]'>
          <div className='text-black text-base font-futura'>
            {t('subscribe')}
          </div>
          <form onSubmit={handleSubscribe}>
            {' '}
            {/* Add form for subscription */}
            <div className='flex items-center border-b-2 border-black py-1'>
              <input
                type='email'
                placeholder={t('youremail')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-transparent outline-none flex-1 font-futura text-black placeholder-gray text-[14px]'
                required
              />
              {subscriptionMessage && (
                <p className='text-green-500 text-[14px] font-futura'>
                  {subscriptionMessage}
                </p>
              )}
              <button type='submit' className='w-[20px] cursor-pointer ml-2'>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className='text-black hover:opacity-70 transition duration-300'
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NavMenu;
