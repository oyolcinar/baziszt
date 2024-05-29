'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useScroll } from './context/ScrollContext';
import ProductCard from './components/ProductCard/ProductCard';
import NewsletterPopup from './components/NewsletterPopUp/NewsletterPopUp';

import CamelLogo from '../../public/Logos/camelLogoSmall.png';
import Logo from '../../public/Logos/logoEditBordeux1.png';
import Hero from '../../public/Images/heroMock.png';
import TopsImage from '../../public/Images/topsImage.png';
import TopsImage2 from '../../public/Images/topsImage2.png';
import BottomsImage from '../../public/Images/bottomsImage.png';
import AccessoriesImage from '../../public/Images/accessoriesImage.png';
import Footer from './components/Layout/Footer';
import { Swiper as SwiperType } from 'swiper';

export default function Home() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [logoSize, setLogoSize] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [swiperHeight, setSwiperHeight] = useState('100vh');
  const { setIsPastThreshold } = useScroll();

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    if (window.innerWidth < 768) {
      setLogoSize(50);
    }
    if (window.innerWidth >= 768) {
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
    if (swiperInstance) {
      swiperInstance.on('slideChange', () => {
        const activeIndex = swiperInstance.activeIndex;
        const totalSlides = swiperInstance.slides.length;
        const newSize =
          windowWidth < 768
            ? Math.max(50 - (activeIndex / totalSlides) * 30, 10)
            : Math.max(30 - (activeIndex / totalSlides) * 20, 10);
        setLogoSize(newSize);
      });
    }
  }, [swiperInstance, windowWidth]);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const topPixels = windowHeight * (windowWidth <= 768 ? 0.12 : 0.1);

  return (
    <main>
      {showPopup && <NewsletterPopup />}
      <Swiper
        onSwiper={setSwiperInstance}
        spaceBetween={10}
        slidesPerView={1}
        direction={'vertical'}
        modules={[Pagination, Mousewheel]}
        pagination={{}}
        mousewheel
        style={{ height: swiperHeight }}
      >
        <div>
          <div
            style={{
              width: `${logoSize}vw`,
              height: `${logoSize}vh`,
              position: 'fixed',
              top: topPixels,
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 4,
              opacity: logoVisible ? 1 : 0,
              transition: 'transform 0.5s ease, opacity 0.5s ease',
            }}
          >
            <Image alt='Logo' src={Logo} layout='fill' objectFit='contain' />
          </div>
        </div>

        <SwiperSlide>
          <div className='relative w-full h-screen top-0 left-0'>
            <Image alt='Hero' src={Hero} layout='fill' objectFit='cover' />
          </div>
        </SwiperSlide>

        {windowWidth > 768 && (
          <SwiperSlide>
            <div className='flex flex-row h-screen'>
              <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300'>
                <Link href='/shop/tops'>
                  <div
                    className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl '
                    style={{
                      zIndex: 2,
                    }}
                  >
                    Tops
                  </div>
                  <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                    <Image alt='Tops' src={TopsImage} />
                  </div>
                </Link>
              </div>
              <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300'>
                <Link href='/shop/accessories'>
                  <div
                    className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                    style={{
                      zIndex: 2,
                    }}
                  >
                    Accessories
                  </div>
                  <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                    <Image alt='Accessories' src={AccessoriesImage} />
                  </div>
                </Link>
              </div>
              <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300'>
                <Link href='/shop/bottoms'>
                  <div
                    className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                    style={{
                      zIndex: 2,
                    }}
                  >
                    Bottoms
                  </div>
                  <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                    <Image alt='Bottoms' src={BottomsImage} />
                  </div>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        )}
        {windowWidth <= 768 && windowHeight < 400 && (
          <SwiperSlide>
            <div className='flex flex-row h-screen'>
              <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300'>
                <Link href='/shop/tops'>
                  <div
                    className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl '
                    style={{
                      zIndex: 2,
                    }}
                  >
                    Tops
                  </div>
                  <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                    <Image alt='Tops' src={TopsImage} />
                  </div>
                </Link>
              </div>
              <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300'>
                <Link href='/shop/accessories'>
                  <div
                    className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl'
                    style={{
                      zIndex: 2,
                    }}
                  >
                    Accessories
                  </div>
                  <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                    <Image alt='Accessories' src={AccessoriesImage} />
                  </div>
                </Link>
              </div>
              <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300'>
                <Link href='/shop/bottoms'>
                  <div
                    className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl'
                    style={{
                      zIndex: 2,
                    }}
                  >
                    Bottoms
                  </div>
                  <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                    <Image alt='Bottoms' src={BottomsImage} />
                  </div>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        )}

        {windowWidth <= 768 && windowHeight > 400 && (
          <SwiperSlide>
            <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300 h-screen'>
              <Link href='/shop/tops'>
                <div
                  className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl '
                  style={{
                    zIndex: 2,
                  }}
                >
                  Tops
                </div>
                <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                  <Image alt='Tops' src={TopsImage} />
                </div>
              </Link>
            </div>
          </SwiperSlide>
        )}
        {windowWidth <= 768 && windowHeight > 400 && (
          <SwiperSlide>
            <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300 h-screen'>
              <Link href='/shop/accessories'>
                <div
                  className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                  style={{
                    zIndex: 2,
                  }}
                >
                  Accessories
                </div>
                <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                  <Image alt='Accessories' src={AccessoriesImage} />
                </div>
              </Link>
            </div>
          </SwiperSlide>
        )}
        {windowWidth <= 768 && windowHeight > 400 && (
          <SwiperSlide>
            <div className='group relative cursor-pointer md:w-1/3 flex justify-center items-center p-4 md:py-6 md:px-3 hover:text-black transition duration-300 h-screen'>
              <Link href='/shop/bottoms'>
                <div
                  className='absolute font-altesse24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl'
                  style={{
                    zIndex: 2,
                  }}
                >
                  Bottoms
                </div>
                <div className='transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'>
                  <Image alt='Bottoms' src={BottomsImage} />
                </div>
              </Link>
            </div>
          </SwiperSlide>
        )}
        <SwiperSlide>
          <div className='w-full flex justify-center h-screen'>
            <div className='flex w-3/4 flex-col items-center justify-center'>
              <div className='font-altesse64 text-black text-5xl sm:text-6xl md:text-8xl mb-4'>
                Our Commitment
              </div>
              <div className='text-black font-futura text-lg flex flex-col items-center text-justify'>
                <div className='mb-2 w-full md:w-1/2'>
                  We had at heart to create an eco-responsible and socially
                  conscious brand. We work with collectives of dyers and
                  embroiders in forsaken villages in India. We work with
                  collectives of dyers and embroiders in forsaken villages in
                  India. Most of the pieces in this collection were made from
                  hemp, a material that is on the rise not only for its nice
                  feel on the skin but also thanks to the plant not being water
                  intensive. We create unique clothes from vintage fabrics that
                  tell the stories of the past but are made to live in the
                  present and for many years to come.
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <nav>
            <div className='flex justify-center items-center flex-row text-center'>
              <div className='flex-1 w-full'></div>
              <div className='py-4'>
                <Image alt='baziszt' src={CamelLogo} width={80} height={50} />
              </div>
              <div className='flex-1 w-full'></div>
            </div>

            <div className='flex justify-center text-black font-futura text-sm mb-4'>
              © 2024, baziszt
            </div>
          </nav>
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
