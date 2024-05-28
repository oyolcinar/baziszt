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

      const displayCrumb =
        crumb.toLowerCase() === 'oneofone' ? 'ONE OF ONE' : crumb.toUpperCase();

      return (
        <span key={index} className='text-black text-base font-futura'>
          <Link href={pathTo}>{displayCrumb}</Link>
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

  const formattedTitle =
    title === 'One of One'
      ? title
      : title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();

  return (
    <>
      <div className='flex justify-center items-center mt-28 md:mt-40'>
        <div className='flex flex-col md:flex-row w-[80%] md:w-[50%] justify-center items-center gap-4'>
          <div
            className='text-6xl md:text-7xl text-black font-altesse24 w-full md:w-1/2'
            style={{ textTransform: 'none' }}
          >
            {formattedTitle}
          </div>

          <div className='text-base text-black text-justify font-futura w-full md:w-1/2'>
            {title === 'TOPS' &&
              'Our latest collection features bold tops, whether adorned with hand-embroidered details, striking graphics, or vibrant hand-painted accents.'}
            {title === 'BOTTOMS' &&
              'Crafted from a blend of natural fibers like cotton, hemp, and artisanal fabrics, a collection of versatile bottoms feature nature-inspired motifs and intricate embroidered botanicals that elevate everyday style.'}
            {title === 'ACCESSORIES' &&
              'Our accessories collection demonstrates our commitment to sustainability and social consciousness, while also featuring high-quality materials that will last for years to come.'}
            {title === 'One of One' &&
              'We partnered with skilled artisans to create one-of-one pieces that celebrate the beauty of individuality and the artistry of hand craftsmanship, each piece a testament to the collaboration between artisanal mastery and creative vision.'}
            {breadcrumbs[0] === 'search' && `Search results for "${title}"`}
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center w-full px-[30px] mb-4 mt-20'>
        <div className='text-xl text-black font-futura'>
          {renderBreadcrumbs()}
        </div>
        <button
          onClick={handleSortChange}
          className='text-black font-futura py-2 rounded hover:opacity-70 transition duration-300 ease-in-out text-center'
        >
          PRICE {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      <div className='flex justify-center w-full mb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 customMd:grid-cols-3 lg:grid-cols-3 p-0 md:p-2 gap-2'>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className='w-full mb-20 font-futura text-black mx-6 text-center'>
        <div className='grid grid-cols-2 md:grid-cols-4 md:p-2 gap-2'>
          <div>Packaging</div>
          <div>Free Online Returns</div>
          <div>Free exchange in store</div>
          <div>Free shipping</div>
        </div>
      </div>
    </>
  );
};

export default ProductGroup;
