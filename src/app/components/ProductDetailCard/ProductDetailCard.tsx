import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Product } from '../ProductCard/ProductCard';

import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import CompleteTheLook from '../CompleteTheLook/CompleteTheLook';

const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

interface ProductDetailCardProps {
  product: Product;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [colorSelection, setColorSelection] = useState(product.colors[0]);
  const [sizeSelection, setSizeSelection] = useState(product.sizes[0]);
  const [isDetails, setIsDetails] = useState(false);
  const [isDelivery, setIsDelivery] = useState(false);
  const [isAssistance, setIsAssistance] = useState(false);

  const toggleDetails = () => {
    setIsDetails(true);
    setIsDelivery(false);
    setIsAssistance(false);
  };

  const toggleDelivery = () => {
    setIsDetails(false);
    setIsDelivery(true);
    setIsAssistance(false);
  };

  const toggleAssistance = () => {
    setIsDetails(false);
    setIsDelivery(false);
    setIsAssistance(true);
  };

  useEffect(() => {
    setIsMobileScreen(window.innerWidth < 600);
    function handleResize() {
      setIsMobileScreen(window.innerWidth < 600);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scaleAmount = isMobileScreen ? 4 : 2;

  useEffect(() => {
    if (isMobileScreen && isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileScreen, isZoomed]);

  const toggleZoom = useCallback(() => {
    setIsZoomed((prevZoomed) => !prevZoomed);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const updateWidth = useCallback(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const debouncedHandleResize = debounce(updateWidth, 350);
    window.addEventListener('resize', debouncedHandleResize);
    updateWidth();
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, [updateWidth]);

  const handleImageChange = (direction: 'next' | 'prev') => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex =
        direction === 'next'
          ? (prevIndex + 1) % product.images.length
          : (prevIndex - 1 + product.images.length) % product.images.length;
      return newIndex;
    });
  };

  const shift = -currentImageIndex * carouselWidth;

  const handleMove = useCallback(
    (event: any) => {
      if (!isZoomed) return;

      const touches = event.type.includes('touch')
        ? event.changedTouches
        : null;
      const x = touches ? touches[0].clientX : event.clientX;
      const y = touches ? touches[0].clientY : event.clientY;

      if (!x || !y) return;

      let deltaX = mousePos.x - x;
      let deltaY = mousePos.y - y;

      setTranslate((prev) => {
        const newX = prev.x + deltaX;
        const newY = prev.y + deltaY;

        const maxTranslateX = Math.max(
          0,
          (carouselWidth * scaleAmount - carouselWidth) / 2,
        );
        const maxTranslateY = Math.max(
          0,
          (carouselWidth * scaleAmount - carouselWidth) / 2,
        );

        const constrainedX = Math.min(
          Math.max(newX, -maxTranslateX),
          maxTranslateX,
        );
        const constrainedY = Math.min(
          Math.max(newY, -maxTranslateY),
          maxTranslateY,
        );

        return {
          x: constrainedX,
          y: constrainedY,
        };
      });

      setMousePos({ x, y });
    },
    [isZoomed, mousePos, carouselWidth, scaleAmount],
  );

  const handleMouseDown = useCallback(
    (event: any) => {
      if (!isZoomed) return;

      const touches = event.touches;
      const x = touches && touches[0] ? touches[0].clientX : event.clientX;
      const y = touches && touches[0] ? touches[0].clientY : event.clientY;

      setMousePos({ x, y });
    },
    [isZoomed],
  );

  useEffect(() => {
    const handleTouchMove = (event: any) => handleMove(event);
    const handleTouchEnd = (event: any) => handleMove(event);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMove]);

  return (
    <div>
      <div className='flex flex-col md:flex-row'>
        <div
          ref={carouselRef}
          className={`relative overflow-hidden w-full h-full md:w-[58%] ${
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          style={{ position: 'relative' }}
        >
          <div
            className='flex transition-transform duration-500 ease-in-out'
            style={{
              transform: `translateX(${shift}px)`,
              width: `${product.images.length * carouselWidth}px`,
            }}
          >
            {product.images.map((image, index) => (
              <div
                key={index}
                className='flex-none relative h-[100vh] md:h-[1100px]'
                style={{
                  width: `${carouselWidth}px`,
                  overflow: 'hidden',
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMove}
                onMouseUp={handleMove}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMove}
                onTouchEnd={handleMove}
                onClick={toggleZoom}
              >
                <Image
                  key={isZoomed.toString() + index}
                  src={image}
                  alt={product.name}
                  layout='fill'
                  objectFit={isZoomed ? 'contain' : 'cover'}
                  objectPosition='center'
                  style={{
                    transform: `translate(${translate.x}px, ${
                      translate.y
                    }px) scale(${isZoomed ? scaleAmount : 1})`,
                  }}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => handleImageChange('prev')}
            className='absolute left-0 p-4 top-1/2 -translate-y-1/2 text-bone'
            style={{ zIndex: 2 }}
          >
            ←
          </button>
          <button
            onClick={() => handleImageChange('next')}
            className='absolute right-0 p-4 top-1/2 -translate-y-1/2 text-bone'
            style={{ zIndex: 2 }}
          >
            →
          </button>
        </div>
        <div className='sticky top-0 min-h-[900px] h-[100vh] flex flex-col items-center pt-20 w-[100%] md:w-[42%]'>
          <div className='text-bordeux font-quasimoda w-[60%] mb-12'>
            <div className='mb-4'>{product.name}</div>
            <div>{product.details}</div>
          </div>
          <div className='w-[60%] mb-12'>
            <div>
              <div className='font-quasimoda text-bordeux text-[12px] mb-4'>
                {colorSelection.toUpperCase()}
              </div>
              <div className='flex gap-4'>
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`inline-block pb-[6px] pl-[1px] pr-[1px] ${
                      colorSelection === color
                        ? `border-b-2 border-bordeux hover:border-bordeux/70`
                        : `border-b-2 border-transparent`
                    }`}
                    onClick={() => {
                      setColorSelection(color);
                    }}
                  >
                    <span
                      className='block w-2 h-2 rounded-full'
                      style={{
                        backgroundColor: color,
                        border:
                          color === '#ffffff' || color.toLowerCase() === 'white'
                            ? '1px solid black'
                            : '1px solid transparent',
                      }}
                    ></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='border-b-[1px] border-gray-200 w-[60%]'></div>
          <div className='text-bordeux font-quasimoda w-[60%] mt-6'>
            <div className='flex justify-between mb-4'>
              <div className='text-[10px]'>SIZE</div>
              <div className='text-[10px] hover:opacity-70 transition duration-300'>
                SIZE GUIDE
              </div>
            </div>
            <div>
              <div className='flex gap-4'>
                {product.sizes.map((size, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer hover:opacity-70 transition duration-300 inline-block px-1 pb-2 ${
                      sizeSelection === size
                        ? `border-b-2 border-bordeux hover:bordeux/70 hover:border-bordeux/70 transition duration-300`
                        : 'border-b-2 border-transparent'
                    }`}
                    onClick={() => {
                      setSizeSelection(size);
                    }}
                  >
                    <span key={index}>{size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='hidden border border-bordeux h-16 w-[60%] mt-16 sm:flex justify-center items-center transition duration-300 ease-in-out hover:bg-bordeux text-bordeux hover:text-bone'>
            <div className='flex justify-between items-center w-[80%]'>
              <div className='flex gap-2'>
                <ShoppingBagIcon className='h-4 w-4 font-bold' />
                <div className='font-quasimoda text-sm'>ADD</div>
              </div>
              <div className='font-quasimoda text-sm'>{product.price}</div>
            </div>
          </div>
          <div className='font-quasimoda text-bordeux text-sm flex flex-col md:flex-row md:justify-between w-[60%] mt-20'>
            <div
              className={`cursor-pointer hover:opacity-70 transition duration-300 hover:border-b-2 hover:border-bordeux/70 mb-4 md:mb-0 ${
                isDetails
                  ? `border-b-2 border-bordeux hover:border-bordeux/70`
                  : `border-b border-transparent`
              }`}
              onClick={() => {
                toggleDetails();
              }}
            >
              DETAILS
            </div>
            <div
              className={`cursor-pointer hover:opacity-70 transition duration-300 hover:border-b-2 hover:border-bordeux/70 mb-4 md:mb-0 ${
                isDelivery
                  ? `border-b-2 border-bordeux hover:border-bordeux/70`
                  : `border-b border-transparent`
              }`}
              onClick={() => {
                toggleDelivery();
              }}
            >
              DELIVERY & RETURNS
            </div>
            <div
              className={`cursor-pointer hover:opacity-70 transition duration-300 hover:border-b-2 hover:border-bordeux/70 ${
                isAssistance
                  ? `border-b-2 border-bordeux hover:border-bordeux/70`
                  : `border-b border-transparent`
              }`}
              onClick={() => {
                toggleAssistance();
              }}
            >
              ASSISTANCE
            </div>
          </div>
        </div>
      </div>
      <CompleteTheLook product={product} />
      <div className='sticky bottom-0 h-[100px] sm:hidden bg-lightBlue px-2'>
        <div className='font-quasimoda text-bordeux text-[14px] ml-2'>
          {product.name}
        </div>
        <div className='border border-bordeux h-16 w-[100%] flex justify-center items-center transition duration-300 ease-in-out bg-bordeux hover:bg-bordeux text-bone hover:text-bone'>
          <div className='flex justify-between items-center w-[80%]'>
            <div className='flex gap-2'>
              <ShoppingBagIcon className='h-4 w-4 font-bold' />
              <div className='font-quasimoda text-sm'>ADD</div>
            </div>
            <div className='font-quasimoda text-sm'>{product.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
