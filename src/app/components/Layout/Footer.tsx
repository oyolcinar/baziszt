'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
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

  const router = useRouter();

  const { t } = useTranslation();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${searchTerm}`);
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
                <div className='flex items-center border-b-2 border-black py-1'>
                  <input
                    type='email'
                    placeholder={t('youremail')}
                    className='bg-transparent outline-none flex-1 font-futura text-black placeholder-gray text-[14px]'
                  />
                  <button className='w-[20px] cursor-pointer ml-2'>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className='text-black hover:opacity-70 transition duration-300'
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <form
            className='md:hidden w-full px-[50px] pb-[50px]'
            onSubmit={handleSearch}
          >
            <div className='flex items-center border-b-2 border-black py-1'>
              <input
                type='text'
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='bg-transparent outline-none flex-1 font-futura text-black placeholder-gray text-[14px]'
              />
              <button type='submit' className='w-[20px] cursor-pointer ml-2'>
                <MagnifyingGlassIcon className='text-black' />
              </button>
            </div>
          </form>
          <div className='md:hidden w-full px-[50px]'>
            <div className='text-black text-base font-futura'>
              {t('subscribe')}
            </div>
            <div className='flex items-center border-b-2 border-black py-1'>
              <input
                type='email'
                placeholder={t('youremail')}
                className='bg-transparent outline-none flex-1 font-futura text-black placeholder-gray text-[14px]'
              />
              <button className='w-[20px] cursor-pointer ml-2'>
                <FontAwesomeIcon icon={faArrowRight} className='text-black' />
              </button>
            </div>
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
