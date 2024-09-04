'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useTranslation } from '../../../../utils/useTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import brownLine1px from '../../../../public/Hamburger/1px/brownLine.png';
import brownLine from '../../../../public/Hamburger/brownLine.png';
import Logo from '../../../../public/Logos/camelLogoSmall.png';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const Footer: React.FC = () => {
  const pathName = usePathname();
  const isNotHome = pathName !== '/';

  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const router = useRouter();

  const { t } = useTranslation();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${searchTerm}`);
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

  return (
    <nav>
      {isNotHome && (
        <>
          <div className='flex justify-center items-center flex-row text-center'>
            <div className='flex-1 w-full flex justify-center'>
              <div className='hidden md:block w-2/3 px-[30px]'>
                <LanguageSwitcher />
                <form onSubmit={handleSearch}>
                  <div className='flex items-center border-b-2 border-black py-1'>
                    <input
                      type='text'
                      placeholder={t('search')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className='bg-transparent outline-none flex-1 font-futura text-black placeholder-gray text-[14px]'
                    />
                    <button
                      type='submit'
                      className='w-[20px] cursor-pointer ml-2'
                    >
                      <MagnifyingGlassIcon className='text-black hover:opacity-70 transition duration-300' />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className='py-4'>
              <Image alt='baziszt' src={Logo} width={80} height={50} />
            </div>

            <div className='flex-1 w-full flex justify-center'>
              <div className='hidden md:block w-2/3 px-[30px]'>
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
                      <p className='text-green-500 font-futura text-[14px]'>
                        {subscriptionMessage}
                      </p>
                    )}
                    <button
                      type='submit'
                      className='w-[20px] cursor-pointer ml-2'
                    >
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className='text-black hover:opacity-70 transition duration-300'
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Mobile subscription form */}
          <div className='md:hidden w-full px-[50px]'>
            <div className='text-black text-base font-futura'>
              {t('subscribe')}
            </div>
            <form onSubmit={handleSubscribe}>
              {' '}
              {/* Add form for mobile subscription */}
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
                  <p className='text-green-500 font-futura text-[14px]'>
                    {subscriptionMessage}
                  </p>
                )}
                <button type='submit' className='w-[20px] cursor-pointer ml-2'>
                  <FontAwesomeIcon icon={faArrowRight} className='text-black' />
                </button>
              </div>
            </form>
          </div>

          <div className='flex justify-center text-black font-futura text-sm mb-4'>
            © 2024, baziszt
          </div>
        </>
      )}
    </nav>
  );
};

export default Footer;
