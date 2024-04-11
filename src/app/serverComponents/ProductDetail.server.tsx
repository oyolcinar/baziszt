'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { dummyProductsArray } from '@/app/dummyData/dummyData';
import ProductDetailCard from '@/app/components/ProductDetailCard/ProductDetailCard';

const ProductDetailServer = () => {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const slug = parts[3];

  const product = dummyProductsArray.find((p) => p.slug === slug);

  if (!product) {
    return <div className='text-8xl text-bordeux'>Product not found</div>;
  }

  return (
    <div>
      <ProductDetailCard product={product} />
    </div>
  );
};

export default ProductDetailServer;
