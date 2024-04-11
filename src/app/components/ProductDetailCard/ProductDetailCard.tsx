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

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    console.log(isZoomed);
  };

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
      if (direction === 'next') {
        return (prevIndex + 1) % product.images.length;
      } else {
        return (prevIndex - 1 + product.images.length) % product.images.length;
      }
    });
  };

  const shift = -currentImageIndex * carouselWidth;

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
                className='flex-none relative'
                style={{
                  width: `${carouselWidth}px`,
                  overflow: isZoomed ? 'hidden' : 'visible',
                }}
                onClick={toggleZoom}
              >
                <Image
                  src={image}
                  alt={product.name}
                  width={isZoomed ? carouselWidth * 2 : carouselWidth}
                  height={isZoomed ? 2000 : 1000}
                  objectFit={isZoomed ? 'contain' : 'cover'}
                  objectPosition='center'
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => handleImageChange('prev')}
            className='absolute left-0 p-4 top-1/2 -translate-y-1/2 text-bone'
            style={{
              zIndex: 2,
            }}
          >
            ←
          </button>
          <button
            onClick={() => handleImageChange('next')}
            className='absolute right-0 p-4 top-1/2 -translate-y-1/2 text-bone'
            style={{
              zIndex: 2,
            }}
          >
            →
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
