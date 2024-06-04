import Image from 'next/image';
import React, { useState, useLayoutEffect } from 'react';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Product } from '@/app/context/ProductContext';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const uniqueColors = Array.from(new Set(product.colors));
  const uniqueSizes = Array.from(new Set(product.sizes));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageWidth, setImageWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    function updateWidth() {
      const windowWidth = window.innerWidth;
      const newWidth =
        windowWidth < 768
          ? windowWidth - 30
          : windowWidth < 1024
          ? Math.round(windowWidth / 2 - 30)
          : Math.round(windowWidth / 3 - 30);
      setImageWidth(newWidth);
    }

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  if (imageWidth === null) return null;

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  const handleMouseEnter = () => {
    setCurrentImageIndex(product.images.length - 1);
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  const handleTouchStart = () => {
    handleMouseEnter();
  };

  const handleTouchEnd = () => {
    handleMouseLeave();
  };

  return (
    <Link href={`/shop/${product.category}/${product.slug}`} passHref>
      <div
        className='relative cursor-pointer group'
        style={{
          width: `${imageWidth}px`,
          height: `${imageWidth * 1.289}px`,
          overflow: 'hidden',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          style={{
            width: `${imageWidth}px`,
            height: '100%',
            position: 'relative',
          }}
        >
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            width={imageWidth}
            height={Math.round(imageWidth * 1.289)}
            objectFit='contain'
            objectPosition='center'
          />
        </div>
        <div className='absolute top-0 right-0 p-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
          {uniqueColors.map((color, index) => (
            <span
              key={index}
              className='block w-2 h-2 rounded-full'
              style={{ backgroundColor: color }}
            ></span>
          ))}
        </div>
        <div className='absolute bottom-6 right-[30px] p-2 text-black font-futura flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
          <div className='text-sm'>{product.price}</div>
          <div
            style={{ zIndex: 3 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite();
            }}
          >
            {isFavorite ? (
              <HeartIconSolid className='cursor-pointer text-black h-4 w-4' />
            ) : (
              <HeartIcon className='cursor-pointer text-black h-4 w-4' />
            )}
          </div>
        </div>
        <div className='absolute bottom-4 left-[30px] p-2 text-black text-sm font-futura opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
          <div>{product.name}</div>
          <div className='flex gap-2'>
            {uniqueSizes.map((size, index) => (
              <div key={index}>{size}</div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
