'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ProductDetailCard from '@/app/components/ProductDetailCard/ProductDetailCard';
import { useProducts } from '../context/ProductContext';

const ProductDetailServer = () => {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const slug = parts[3];
  const { products } = useProducts();

  const product = products.find((p) => p.slug === slug);

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
