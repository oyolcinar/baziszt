'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import brownLine1 from '../../../../public/Hamburger/brownLine.png';
import brownLine2 from '../../../../public/Hamburger/brownLine2.png';
import brownLine3 from '../../../../public/Hamburger/brownLine3.png';
import brownLine4 from '../../../../public/Hamburger/brownLine4.png';
import newMenu from '../../../../public/Images/newMenu.png';
import topsMenu from '../../../../public/Images/topsMenu.png';
import bottomsMenu from '../../../../public/Images/bottomsMenu.png';
import accessoriesMenu from '../../../../public/Images/accessoriesMenu.png';
import Link from 'next/link';

const HamburgerMenu: React.FC = () => {
  const lineImages = [
    [brownLine1, brownLine2, brownLine3, brownLine4],
    [brownLine1, brownLine2, brownLine3, brownLine4],
    [brownLine1, brownLine2, brownLine3, brownLine4],
  ];

  const [currentIndices, setCurrentIndices] = useState([0, 0, 0]);
  const [lineOpacities, setLineOpacities] = useState([
    'opacity-100',
    'opacity-100',
    'opacity-100',
  ]);
  const [phase, setPhase] = useState('normal');
  const [menuOpened, setMenuOpened] = useState(false);
  const [hoveredImage, setHoveredImage] = useState('');
  const [isImageVisible, setIsImageVisible] = useState(false);

  const toggleMenu = () => {
    if (!menuOpened) {
      startSequence();
    } else {
      reverseSequence();
    }
  };

  const toggleStitch = (
    startIndex: number,
    onComplete?: () => void,
    reverse: boolean = false,
    updateOpacity: boolean = true,
    skipSecondLine: boolean = false,
  ) => {
    if (reverse && skipSecondLine) {
      setLineOpacities([
        'opacity-100',
        'opacity-0',
        lineImages.length > 2 && startIndex === lineImages[2].length - 1
          ? 'opacity-0'
          : 'opacity-100',
      ]);
    }

    for (let lineIndex = 0; lineIndex < lineImages.length; lineIndex++) {
      if (skipSecondLine && lineIndex === 1) continue;

      for (
        let imgIndex = startIndex;
        reverse ? imgIndex >= 0 : imgIndex < lineImages[lineIndex].length;
        reverse ? imgIndex-- : imgIndex++
      ) {
        setTimeout(() => {
          setCurrentIndices((currentIndices) =>
            currentIndices.map((index, idx) =>
              idx === lineIndex ? imgIndex : index,
            ),
          );

          if (
            updateOpacity &&
            ((reverse && imgIndex === 0) ||
              (!reverse && imgIndex === lineImages[lineIndex].length - 1))
          ) {
            setLineOpacities((opacities) =>
              opacities.map((opacity, idx) =>
                idx === lineIndex ? 'opacity-0' : opacity,
              ),
            );
          }

          if (
            reverse &&
            skipSecondLine &&
            lineIndex === 2 &&
            imgIndex === lineImages[2].length - 1
          ) {
            setLineOpacities((opacities) =>
              opacities.map((opacity, idx) =>
                idx === 2 ? 'opacity-100' : opacity,
              ),
            );
          }
        }, 35 * (reverse ? startIndex - imgIndex : imgIndex) + 140 * lineIndex);
      }
    }

    setTimeout(
      onComplete || (() => {}),
      lineImages[0].length * 35 + 140 * lineImages.length,
    );
  };

  const startSequence = () => {
    setMenuOpened(true);
    setPhase('normal');
    setLineOpacities(['opacity-100', 'opacity-100', 'opacity-100']);
    toggleStitch(0, () => {
      setPhase('toX');
      setTimeout(() => {
        setLineOpacities(['opacity-100', 'opacity-0', 'opacity-100']);
        toggleStitch(lineImages[0].length - 1, undefined, true, false, true);
      }, 15);
    });
  };

  const reverseSequence = () => {
    setMenuOpened(false);
    setPhase('toX');
    setLineOpacities(['opacity-100', 'opacity-0', 'opacity-100']);
    toggleStitch(0, () => {
      setPhase('normal');
      setTimeout(() => {
        setLineOpacities(['opacity-100', 'opacity-100', 'opacity-100']);
        toggleStitch(lineImages[0].length - 1, undefined, true, false, false);
      }, 15);
    });
  };

  return (
    <>
      <div
        className='flex flex-col items-start gap-3 cursor-pointer relative z-50'
        onClick={toggleMenu}
      >
        {currentIndices.map((imgIndex, lineIndex) => (
          <div
            key={lineIndex}
            className={`${
              lineOpacities[lineIndex]
            } transition-opacity duration-150 ${
              phase === 'toX' && (lineIndex === 0 || lineIndex === 2)
                ? 'transform'
                : ''
            } ${
              phase === 'toX' && lineIndex === 2
                ? '-rotate-45 translate-y-[-12px]'
                : phase === 'toX' && lineIndex === 0
                ? 'rotate-45 translate-y-[15px]'
                : ''
            }`}
            style={{ transformOrigin: 'center' }}
          >
            <Image
              src={lineImages[lineIndex][imgIndex]}
              alt={`Line ${lineIndex + 1}`}
              width={30}
              height={8}
            />
          </div>
        ))}
      </div>
      <div
        className={`fixed top-0 left-0 h-[100vh] w-full md:w-[30%] bg-bone transform flex justify-start items-center pl-[60px] ${
          menuOpened ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-700 ease-in-out z-40`}
      >
        <div className='flex flex-col justify-start items-start text-base text-bordeux font-quasimoda gap-6 overflow-y-auto h-full w-full pt-[100px]'>
          <Link
            href='/'
            className='md:hidden hover:opacity-70 transition duration-300'
            onClick={toggleMenu}
          >
            HOME
          </Link>
          <Link
            href='/shop'
            className='hover:opacity-70 transition duration-300'
            onClick={toggleMenu}
          >
            SHOP
          </Link>
          <div className='flex flex-col pl-6 text-base gap-4'>
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
              • NEW
            </Link>
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
              • TOPS
            </Link>
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
              • BOTTOMS
            </Link>
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
              • ACCESSORIES
            </Link>
          </div>
          <Link
            href='/lookbooks'
            className='hover:opacity-70 transition duration-300'
            onClick={toggleMenu}
          >
            LOOKBOOKS
          </Link>
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

export default HamburgerMenu;
