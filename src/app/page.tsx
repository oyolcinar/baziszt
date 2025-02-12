'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import NewsletterPopup from './components/NewsletterPopUp/NewsletterPopUp';
import { useTranslation } from '../../utils/useTranslation';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swiper as SwiperType } from 'swiper';

export default function Home() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [logoSize, setLogoSize] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [swiperHeight, setSwiperHeight] = useState('100vh');
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);

  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();

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

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    if (window.innerWidth < 768) {
      setLogoSize(40);
    }
    if (window.innerWidth >= 768) {
      setLogoSize(30);
    }
    if (window.innerWidth < 768 && window.innerHeight < 400) {
      setLogoSize(30);
    }
    setLogoVisible(true);

    window.addEventListener('resize', updateWindowDimensions);
    updateWindowDimensions();
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch((error) => {
        console.error('Video autoplay failed:', error);
      });
    }
  }, []);

  useEffect(() => {
    if (swiperInstance) {
      const calculateTotalHeight = () => {
        const slides = Array.from(swiperInstance.slides);
        const totalSlides = slides.length;
        let totalHeight = 0;
        const additionalHeight =
          windowWidth > 768
            ? windowHeight
            : windowHeight < 400
            ? windowHeight
            : 340;

        slides.forEach((slide, index) => {
          if (index === totalSlides - 1) {
            totalHeight += additionalHeight;
          } else {
            totalHeight += windowHeight;
          }
        });
        return totalHeight - windowHeight + additionalHeight;
      };

      swiperInstance.on('slideChange', () => {
        const activeIndex = swiperInstance.activeIndex;
        const totalSlides = swiperInstance.slides.length;
        const additionalHeight =
          windowWidth > 768
            ? windowHeight
            : windowHeight < 400
            ? windowHeight
            : 340;

        //   if (activeIndex === totalSlides - 1) {
        //     swiperInstance.allowSlideNext = false;
        //     (
        //       swiperInstance.wrapperEl as HTMLElement
        //     ).style.transform = `translate3d(0px, -${
        //       (totalSlides - 2) * windowHeight + additionalHeight
        //     }px, 0px)`;
        //   } else if (activeIndex === totalSlides - 2) {
        //     swiperInstance.allowSlideNext = true;
        //     (
        //       swiperInstance.wrapperEl as HTMLElement
        //     ).style.transform = `translate3d(0px, -${
        //       (totalSlides - 2) * windowHeight
        //     }px, 0px)`;
        //   } else {
        //     swiperInstance.allowSlideNext = true;
        //     (
        //       swiperInstance.wrapperEl as HTMLElement
        //     ).style.transform = `translate3d(0px, -${
        //       activeIndex * windowHeight
        //     }px, 0px)`;
        //   }
        if (windowWidth >= 768) {
          const newSize =
            windowWidth < 768
              ? Math.max(50 - (activeIndex / totalSlides) * 40, 10)
              : Math.max(30 - (activeIndex / totalSlides) * 20, 1);
          setLogoSize(newSize);
        }
      });

      const swiperContainer = document.querySelector(
        '.swiper-container',
      ) as HTMLElement;
      if (swiperContainer) {
        swiperContainer.style.height = `${calculateTotalHeight()}px`;
      }
    }
  }, [swiperInstance, windowWidth, windowHeight]);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 100);
    setShowPopup(true);
  }, []);

  const handleSwiper = useCallback((swiper: any) => {
    setSwiperInstance(swiper);
    const swiperEl = swiper.el;
    swiperEl.addEventListener('touchstart', (e: TouchEvent) => {}, {
      passive: false,
    });

    swiperEl.addEventListener('touchmove', (e: TouchEvent) => {}, {
      passive: false,
    });
  }, []);

  const handleSlideChange = useCallback(() => {}, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main>
      {showPopup && <NewsletterPopup />}
      <Swiper
        speed={1000}
        spaceBetween={10}
        slidesPerView={1}
        direction={'vertical'}
        modules={[Pagination, Mousewheel]}
        pagination={{ clickable: true }}
        mousewheel={{ forceToAxis: true }}
        freeMode={false}
        style={{ height: swiperHeight }}
        watchSlidesProgress={true}
        touchReleaseOnEdges={true}
        threshold={20}
        resistance={true}
        resistanceRatio={0.85}
        followFinger={true}
        touchMoveStopPropagation={true}
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
        touchStartPreventDefault={false}
        touchStartForcePreventDefault={false}
        simulateTouch={true}
        preventInteractionOnTransition={true}
        touchEventsTarget='wrapper'
        noSwiping={true}
        noSwipingClass='swiper-no-swiping'
      >
        <div>
          <div
            style={{
              width: `${logoSize}vw`,
              height: `${logoSize / 1.75}vh`,
              position: 'fixed',
              top: '0px',
              left: '50%',
              transform: 'translate(-50%, 0)',
              zIndex: 4,
              opacity: logoVisible ? 1 : 0,
              transition: isMounted
                ? 'width 1s ease-in-out, height 1s ease-in-out'
                : 'transform 0.5s ease, opacity 0.5s ease',
            }}
          >
            <Image
              alt='Logo'
              src='https://baziszt.nuglobucket.org/public/Logos/logoEditBordeux1.png'
              layout='fill'
              objectFit='contain'
            />
          </div>
        </div>

        <SwiperSlide>
          <div className='relative w-full h-screen top-0 left-0 overflow-hidden'>
            <div className='absolute inset-0'>
              <video
                ref={videoRef}
                autoPlay
                loop
                playsInline
                muted
                disablePictureInPicture
                controls={false}
                className='w-full h-full object-cover'
              >
                <source
                  src='https://baziszt.nuglobucket.org/public/Videos/BAZISZT-1.mp4'
                  type='video/mp4'
                />
              </video>
            </div>
            {/* <Image alt='Hero' src={Hero} layout='fill' objectFit='cover' /> */}
          </div>
        </SwiperSlide>

        {windowWidth > 768 && (
          <SwiperSlide>
            <div className='flex flex-row h-screen mt-8'>
              <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-bordeux transition duration-300'>
                <Link href='/shop/shirts-and-tops'>
                  <div
                    className='absolute font-altesse24 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl '
                    style={{
                      zIndex: 2,
                    }}
                  >
                    {t('tops')}
                  </div>
                  <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                    <img
                      alt='Tops'
                      src='https://baziszt.nuglobucket.org/public/Images/topsImage.png'
                    />
                  </div>
                </Link>
              </div>

              <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-bordeux transition duration-300'>
                <Link href='/shop/bottoms'>
                  <div
                    className='absolute font-altesse24 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                    style={{
                      zIndex: 2,
                    }}
                  >
                    {t('bottoms')}
                  </div>
                  <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                    <img
                      alt='Bottoms'
                      src='https://baziszt.nuglobucket.org/public/Images/bottomsImage.png'
                    />
                  </div>
                </Link>
              </div>
              <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-bordeux transition duration-300'>
                <Link href='/shop/accessories'>
                  <div
                    className='absolute font-altesse24 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                    style={{
                      zIndex: 2,
                    }}
                  >
                    {t('accessories')}
                  </div>
                  <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                    <img
                      alt='Accessories'
                      src='https://baziszt.nuglobucket.org/public/Images/accessoriesImage.png'
                    />
                  </div>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        )}
        {windowWidth <= 768 && windowHeight < 400 && (
          <SwiperSlide>
            <div className='flex flex-row h-screen'>
              <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-bordeux transition duration-300'>
                <Link href='/shop/shirts-and-tops'>
                  <div
                    className='absolute font-altesse24 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl '
                    style={{
                      zIndex: 2,
                    }}
                  >
                    {t('tops')}
                  </div>
                  <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                    <img
                      alt='Tops'
                      src='https://baziszt.nuglobucket.org/public/Images/topsImage.png'
                    />
                  </div>
                </Link>
              </div>

              <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-bordeux transition duration-300'>
                <Link href='/shop/bottoms'>
                  <div
                    className='absolute font-altesse24 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl'
                    style={{
                      zIndex: 2,
                    }}
                  >
                    {t('bottoms')}
                  </div>
                  <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                    <img
                      alt='Bottoms'
                      src='https://baziszt.nuglobucket.org/public/Images/bottomsImage.png'
                    />
                  </div>
                </Link>
              </div>
              <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-bordeux transition duration-300'>
                <Link href='/shop/accessories'>
                  <div
                    className='absolute font-altesse24 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl'
                    style={{
                      zIndex: 2,
                    }}
                  >
                    {t('accessories')}
                  </div>
                  <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                    <img
                      alt='Accessories'
                      src='https://baziszt.nuglobucket.org/public/Images/accessoriesImage.png'
                    />
                  </div>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        )}

        {windowWidth <= 768 && windowHeight > 400 && windowHeight > 800 && (
          <SwiperSlide>
            <div className='group relative cursor-pointer lg:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-bordeux transition duration-300 h-screen'>
              <Link href='/shop/shirts-and-tops'>
                <div
                  className='absolute font-altesse24 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl '
                  style={{
                    zIndex: 2,
                  }}
                >
                  {t('tops')}
                </div>
                <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                  <img
                    alt='Tops'
                    src='https://baziszt.nuglobucket.org/public/Images/topsImage.png'
                  />
                </div>
              </Link>
            </div>
          </SwiperSlide>
        )}
        {windowWidth <= 768 && windowHeight > 400 && windowHeight < 800 && (
          <SwiperSlide>
            <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-end p-4 md:py-6 md:px-3 hover:text-bordeux transition duration-300 h-[100vh]'>
              <Link href='/shop/shirts-and-tops'>
                <div
                  className='absolute font-altesse24 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                  style={{
                    zIndex: 2,
                  }}
                >
                  {t('tops')}
                </div>
                <div className='w-full h-[80vh] overflow-hidden'>
                  <img
                    alt='Tops'
                    src='https://baziszt.nuglobucket.org/public/Images/topsImage.png'
                    className='w-full h-full transition-transform duration-300 ease-in-out transform opacity-100 hover:opacity-75 object-cover object-center scale-[1.1]'
                    // priority={true}
                    // loading='eager'
                  />
                </div>
              </Link>
            </div>
          </SwiperSlide>
        )}

        {windowWidth <= 768 && windowHeight > 400 && windowHeight > 800 && (
          <SwiperSlide>
            <div className='group relative cursor-pointer lg:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-bordeux transition duration-300 h-screen'>
              <Link href='/shop/bottoms'>
                <div
                  className='absolute font-altesse24 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                  style={{
                    zIndex: 2,
                  }}
                >
                  {t('bottoms')}
                </div>
                <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                  <img
                    alt='Bottoms'
                    src='https://baziszt.nuglobucket.org/public/Images/bottomsImage.png'
                  />
                </div>
              </Link>
            </div>
          </SwiperSlide>
        )}
        {windowWidth <= 768 && windowHeight > 400 && windowHeight < 800 && (
          <SwiperSlide>
            <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-end p-4 md:py-6 md:px-3 hover:text-bordeux transition duration-300 h-[100vh]'>
              <Link href='/shop/bottoms'>
                <div
                  className='absolute font-altesse24 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                  style={{
                    zIndex: 2,
                  }}
                >
                  {t('bottoms')}
                </div>
                <div className='w-full h-[80vh] overflow-hidden'>
                  <img
                    alt='Bottoms'
                    src='https://baziszt.nuglobucket.org/public/Images/bottomsImage.png'
                    className='w-full h-full transition-transform duration-300 ease-in-out transform opacity-100 hover:opacity-75 object-cover object-center scale-[1.1]'
                    // priority={true}
                    // loading='eager'
                  />
                </div>
              </Link>
            </div>
          </SwiperSlide>
        )}
        {windowWidth <= 768 && windowHeight > 400 && windowHeight > 800 && (
          <SwiperSlide>
            <div className='group relative cursor-pointer lg:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-bordeux transition duration-300 h-screen'>
              <Link href='/shop/accessories'>
                <div
                  className='absolute font-altesse24 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                  style={{
                    zIndex: 2,
                  }}
                >
                  {t('accessories')}
                </div>
                <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                  <img
                    alt='Accessories'
                    src='https://baziszt.nuglobucket.org/public/Images/accessoriesImage.png'
                  />
                </div>
              </Link>
            </div>
          </SwiperSlide>
        )}
        {windowWidth <= 768 && windowHeight > 400 && windowHeight < 800 && (
          <SwiperSlide>
            <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-end p-4 md:py-6 md:px-3 hover:text-bordeux transition duration-300 h-[100vh]'>
              <Link href='/shop/accessories'>
                <div
                  className='absolute font-altesse24 top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                  style={{
                    zIndex: 2,
                  }}
                >
                  {t('accessories')}
                </div>
                <div className='w-full h-[80vh] overflow-hidden'>
                  <img
                    alt='Accessories'
                    src='https://baziszt.nuglobucket.org/public/Images/accessoriesImage.png'
                    className='w-full h-full transition-transform duration-300 ease-in-out transform opacity-100 hover:opacity-75 object-cover object-center scale-[1.1]'
                    // priority={true}
                    // loading='eager'
                  />
                </div>
              </Link>
            </div>
          </SwiperSlide>
        )}
        {windowWidth >= 768 && (
          <SwiperSlide>
            <div className='w-full flex flex-col justify-center items-center h-screen'>
              <div className='flex-grow flex w-3/4 flex-col items-center justify-center'>
                <div className='font-altesse64 text-bordeux text-5xl sm:text-6xl md:text-8xl mb-4'>
                  {t('ourcommitment')}
                </div>
                <div className='text-bordeux font-futura text-lg flex flex-col items-center text-justify'>
                  <div className='mb-2 w-full md:w-1/2'>
                    {t('commitmenttext')}
                  </div>
                </div>
              </div>
              <nav className='w-full mb-2'>
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
                    <Image
                      alt='baziszt'
                      src='https://baziszt.nuglobucket.org/public/Logos/camelLogoSmall.png'
                      width={80}
                      height={50}
                    />
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
                            onChange={(e) => setEmail(e.target.value)} // Handle input
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
                    <button
                      type='submit'
                      className='w-[20px] cursor-pointer ml-2'
                    >
                      <MagnifyingGlassIcon className='text-black' />
                    </button>
                  </div>
                </form>
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
                      <button
                        type='submit'
                        className='w-[20px] cursor-pointer ml-2'
                      >
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className='text-black'
                        />
                      </button>
                    </div>
                  </form>
                </div>

                <div className='flex justify-center text-black font-futura text-sm mb-4'>
                  © 2024, baziszt
                </div>
              </nav>
            </div>
          </SwiperSlide>
        )}
        {windowWidth <= 768 && (
          <SwiperSlide>
            <div className='w-full flex justify-center h-screen'>
              <div
                className={`flex w-3/4 flex-col items-center justify-center ${
                  windowHeight > 400 ? 'mt-24' : 'mt-20'
                }`}
              >
                <div className='font-altesse64 text-bordeux text-5xl sm:text-6xl md:text-8xl mb-4'>
                  {t('ourcommitment')}
                </div>
                <div className='text-bordeux font-futura text-lg flex flex-col items-center text-justify'>
                  <div className='mb-2 w-full md:w-1/2'>
                    {t('commitmenttext')}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )}

        {windowWidth <= 768 && (
          <SwiperSlide>
            <nav>
              <div
                className={`${
                  windowHeight > 400 ? 'mt-40' : 'mt-12'
                } flex justify-center items-center flex-row text-center`}
              >
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
                  <Image
                    alt='baziszt'
                    src='https://baziszt.nuglobucket.org/public/Logos/camelLogoSmall.png'
                    width={80}
                    height={50}
                  />
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
                          onChange={(e) => setEmail(e.target.value)} // Handle input
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
                  <button
                    type='submit'
                    className='w-[20px] cursor-pointer ml-2'
                  >
                    <MagnifyingGlassIcon className='text-black' />
                  </button>
                </div>
              </form>
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
                    <button
                      type='submit'
                      className='w-[20px] cursor-pointer ml-2'
                    >
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className='text-black'
                      />
                    </button>
                  </div>
                </form>
              </div>

              <div className='flex justify-center text-black font-futura text-sm mb-4'>
                © 2024, baziszt
              </div>
            </nav>
          </SwiperSlide>
        )}
      </Swiper>
    </main>
  );
}
