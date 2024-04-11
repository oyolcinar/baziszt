'use client';
import React, { useState, useEffect } from 'react';
import { Product } from '../ProductCard/ProductCard';
import ProductCard from '../ProductCard/ProductCard';

interface ProductGroupProps {
  products: Product[];
  category: string;
  title: string;
}

const ProductGroup: React.FC<ProductGroupProps> = ({
  products,
  category,
  title,
}) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedProducts, setSortedProducts] = useState(products);

  useEffect(() => {
    const filteredProducts =
      category === 'all'
        ? products
        : products.filter((product) => product.category === category);

    const sorted = [...filteredProducts].sort((a, b) => {
      const priceA = parseFloat(a.price.replace('€', '').replace(',', '.'));
      const priceB = parseFloat(b.price.replace('€', '').replace(',', '.'));
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

    setSortedProducts([...sorted]);
  }, [sortOrder, products, category]);

  const handleSortChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <>
      <div className='flex justify-between items-center w-full px-6 mb-4 mt-24'>
        <div className='text-xl text-bordeux font-quasimoda'>{title}</div>
        <button
          onClick={handleSortChange}
          className='text-bordeux font-quasimoda px-4 py-2 rounded hover:opacity-70 transition duration-300 ease-in-out text-center'
        >
          PRICE {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      <div className='flex justify-center w-full mb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 customMd:grid-cols-4 lg:grid-cols-3 p-2 gap-2'>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductGroup;
