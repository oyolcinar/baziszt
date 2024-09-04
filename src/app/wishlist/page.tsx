'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@/app/context/UserContext';
import ProductCard from '../components/ProductCard/ProductCard';
import { useTranslation } from '../../../utils/useTranslation';

const WishlistPage: React.FC = () => {
  const { wishlist } = useUser();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedWishlist, setSortedWishlist] = useState(wishlist);

  const { t } = useTranslation();

  useEffect(() => {
    const sorted = [...wishlist].sort((a, b) => {
      const priceA = parseFloat(a.price.replace('€', '').replace(',', '.'));
      const priceB = parseFloat(b.price.replace('€', '').replace(',', '.'));
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

    setSortedWishlist(sorted);
  }, [sortOrder, wishlist]);

  const handleSortChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <>
      {/* Wishlist Header */}
      <div className='flex justify-center items-center mt-28 md:mt-40'>
        <div className='text-6xl md:text-7xl text-black font-altesse24'>
          {t('wishlist').charAt(0).toUpperCase() +
            t('wishlist').slice(1).toLowerCase()}
        </div>
      </div>

      {/* Sort Button and Wishlist Items */}
      <div className='flex justify-between items-center w-full px-[30px] mb-4 mt-20'>
        <div className='text-xl text-black font-futura'>
          {t('wishlistItems').toUpperCase()}
        </div>
        <button
          onClick={handleSortChange}
          className='text-black font-futura py-2 rounded hover:opacity-70 transition duration-300 ease-in-out text-center'
        >
          {t('price')} {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {/* Render Wishlist Items */}
      <div className='flex justify-center w-full mb-20'>
        {sortedWishlist.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 customMd:grid-cols-4 lg:grid-cols-4 p-0 md:p-2 gap-2'>
            {sortedWishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className='text-center text-black font-futura'>
            {t('noWishlistItems')}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className='w-full mb-20 font-futura text-black text-center'>
        <div className='grid grid-cols-2 md:grid-cols-4 md:p-2'>
          <div>{t('packaging')}</div>
          <div>{t('freeonlinereturns')}</div>
          <div>{t('freeexchangeinstore')}</div>
          <div>{t('freeshippinggroup')}</div>
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
