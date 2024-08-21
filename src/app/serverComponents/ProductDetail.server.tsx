'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ProductDetailCard from '@/app/components/ProductDetailCard/ProductDetailCard';
import { useProducts } from '../context/ProductContext';

const ProductDetailServer = () => {
  const [showNotFound, setShowNotFound] = useState(false);
  const pathname = usePathname();
  const parts = pathname.split('/');
  const slug = parts[3];
  const { products } = useProducts();

  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    if (!product) {
      const timer = setTimeout(() => {
        setShowNotFound(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [product]);

  if (!product && showNotFound) {
    return (
      <div className='h-screen w-screen flex justify-center items-center'>
        <div className='text-4xl text-bordeux font-futura my-40'>
          Product not found
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='h-screen w-screen flex justify-center items-center'></div>
    );
  }

  return (
    <div>
      <ProductDetailCard product={product} />
    </div>
  );
};

export default ProductDetailServer;
