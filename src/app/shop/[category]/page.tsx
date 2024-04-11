'use client';

import { usePathname } from 'next/navigation';

import ProductGroup from '@/app/components/ProductGroup/ProductGroup';

import { dummyProductsArray } from '@/app/dummyData/dummyData';

export default function Shop() {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const category = parts[2];

  if (
    category !== 'tops' &&
    category !== 'bottoms' &&
    category !== 'accessories'
  ) {
    return <div className='text-8xl text-bordeux'>Category not found</div>;
  }

  return (
    <ProductGroup
      products={dummyProductsArray}
      category={category}
      title={category.toUpperCase()}
    />
  );
}
