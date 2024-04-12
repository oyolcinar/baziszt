import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';

export interface Product {
  id: string;
  slug: string;
  name: string;
  images: string[];
  colors: string[];
  price: string;
  details?: string;
  category: string;
  sizes: string[];
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageWidth = 350;
  const totalWidth = product.images.length * imageWidth;

  const handleImageChange = (
    direction: 'next' | 'prev',
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setCurrentImageIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % product.images.length;
      } else {
        return (prevIndex - 1 + product.images.length) % product.images.length;
      }
    });
  };

  const shift = -currentImageIndex * imageWidth;

  return (
    <Link href={`/shop/${product.category}/${product.slug}`} passHref>
      <div
        className='relative cursor-pointer group'
        style={{
          width: `${imageWidth}px`,
          height: '450px',
          overflow: 'hidden',
        }}
      >
        <div
          className='absolute inset-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'
          style={{
            zIndex: 2,
          }}
        >
          <button
            onClick={(e) => handleImageChange('prev', e)}
            className='text-bone p-2'
          >
            ←
          </button>
          <button
            onClick={(e) => handleImageChange('next', e)}
            className='text-bone p-2'
          >
            →
          </button>
        </div>
        <div
          className='flex transition-transform duration-500 ease-in-out'
          style={{
            transform: `translateX(${shift}px)`,
            width: `${totalWidth}px`,
          }}
        >
          {product.images.map((image, index) => (
            <div
              key={index}
              className='flex-none'
              style={{
                width: `${imageWidth}px`,
                height: '450px',
              }}
            >
              <div
                style={{ width: '350px', height: '100%', position: 'relative' }}
              >
                <Image
                  src={image}
                  alt={product.name}
                  layout='fill'
                  objectFit='cover'
                  objectPosition='center'
                />
              </div>
            </div>
          ))}
        </div>
        <div className='absolute w-full text-center text-2xl top-1/2 transform -translate-y-1/2 text-bone font-quasimoda transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0'>
          {product.name}
        </div>
        <div className='absolute top-0 right-0 p-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
          {product.colors.map((color, index) => (
            <span
              key={index}
              className='block w-2 h-2 rounded-full'
              style={{ backgroundColor: color }}
            ></span>
          ))}
        </div>
        <div className='absolute bottom-0 right-0 p-2 text-bone font-quasimoda flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
          <div className='text-sm'>{product.price}</div>
          <HeartIcon className='h-4 w-4 text-bone' />
        </div>
        <div className='absolute bottom-0 left-0 p-2 text-bone text-sm font-quasimoda opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
          <div>{product.name}</div>
          <div className='flex gap-2'>
            {product.sizes.map((size, index) => (
              <div key={index}>{size}</div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
