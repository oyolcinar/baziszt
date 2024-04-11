import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Product } from '../ProductCard/ProductCard';

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
      <div className='flex'>
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
      </div>
    </div>
  );
};

export default ProductDetailCard;
