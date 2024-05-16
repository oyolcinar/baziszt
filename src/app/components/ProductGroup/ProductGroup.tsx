'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Product } from '@/app/context/ProductContext';
import ProductCard from '../ProductCard/ProductCard';
import Link from 'next/link';

interface ProductGroupProps {
  products: Product[];
  category: string[];
  title: string;
}

const ProductGroup: React.FC<ProductGroupProps> = ({
  products,
  category,
  title,
}) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedProducts, setSortedProducts] = useState(products);

  const pathname = usePathname();
  const breadcrumbs = pathname.split('/').filter(Boolean);

  const renderBreadcrumbs = () => {
    return breadcrumbs.map((crumb, index) => {
      const pathTo = '/' + breadcrumbs.slice(0, index + 1).join('/');

      const separator = index < breadcrumbs.length - 1 ? ' > ' : '';

      const allText = breadcrumbs.length === 1 ? ' > ALL ' : '';

      return (
        <span key={index} className='text-black text-base font-futura'>
          <Link href={pathTo}>{crumb.toUpperCase()}</Link>
          {separator}
          {allText}
        </span>
      );
    });
  };

  useEffect(() => {
    const filteredProducts = category.includes('all')
      ? products
      : products.filter((product) => product.category.some((cat) => category));

    const sorted = filteredProducts.sort((a, b) => {
      const priceA = parseFloat(a.price.replace('€', '').replace(',', '.'));
      const priceB = parseFloat(b.price.replace('€', '').replace(',', '.'));
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

    setSortedProducts(sorted);
  }, [sortOrder, products, category]);

  const handleSortChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <>
      <div className='flex justify-center items-center mt-28 md:mt-32'>
        <div className='flex flex-col md:flex-row w-[80%] md:w-[50%] justify-center items-center gap-4'>
          {/* <div className='text-4xl md:text-5xl text-bordeux font-altesse24 w-full md:w-1/2'>
            {title}
          </div> */}
          <div
            className='text-6xl md:text-7xl text-black font-altesse24 w-full md:w-1/2'
            style={{ textTransform: 'lowercase' }}
          >
            <span style={{ textTransform: 'capitalize' }}>
              {title.slice(0, 1)}
            </span>
            {title.slice(1)}
          </div>

          <div className='text-base text-black text-justify font-futura w-full md:w-1/2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae fugit
            corporis, nostrum repudiandae cumque et dolor nulla ullam expedita?
            Quis ullam consectetur architecto aliquid. Iusto ad assumenda non
            quo dolorem.
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center w-full px-6 mb-4 mt-20'>
        <div className='text-xl text-black font-futura'>
          {renderBreadcrumbs()}
        </div>
        <button
          onClick={handleSortChange}
          className='text-black font-futura px-4 py-2 rounded hover:opacity-70 transition duration-300 ease-in-out text-center'
        >
          PRICE {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      <div className='flex justify-center w-full mb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 customMd:grid-cols-3 lg:grid-cols-3 p-2 gap-2'>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductGroup;
