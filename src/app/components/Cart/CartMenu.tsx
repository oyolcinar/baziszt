'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { useMenu } from '../../context/MenuContext';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const CartMenu: React.FC = () => {
  const {
    cart,
    menuOpened,
    toggleCartMenu,
    incrementItem,
    decrementItem,
    removeItem,
  } = useCart();
  const { cartMenuOpened, openCartMenu, closeCartMenu } = useMenu();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [removingItem, setRemovingItem] = useState<string | null>(null);
  const itemRefs = useRef(new Map<string, HTMLDivElement | null>());

  const toggleMenu = () => {
    if (cartMenuOpened) {
      closeCartMenu();
    } else {
      openCartMenu();
    }
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(itemId)
        ? prevFavorites.filter((id) => id !== itemId)
        : [...prevFavorites, itemId],
    );
  };

  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (cartMenuOpened) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    if (cartMenuOpened) {
      window.addEventListener('scroll', handleScroll, { passive: false });
      window.addEventListener('wheel', handleScroll, { passive: false });
      window.addEventListener('touchmove', handleScroll, { passive: false });
    } else {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [cartMenuOpened]);

  const calculateTotal = () => {
    if (!cart) return '0.00';
    return cart.items
      .reduce((total, item) => {
        const [amountString] = item.price.split(' ');
        const amount = parseFloat(amountString);
        return total + amount * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleRemoveItem = (variantId: string, size: string) => {
    const itemKey = `${variantId}-${size}`;
    const itemRef = itemRefs.current.get(itemKey);
    if (itemRef) {
      itemRef.style.maxHeight = `${itemRef.scrollHeight}px`;
      itemRef.style.transition = 'max-height 0.5s ease';
      itemRef.style.maxHeight = '0';
    }
    setRemovingItem(itemKey);
    setTimeout(() => {
      removeItem(variantId, size);
      setRemovingItem(null);
    }, 500);
  };

  return (
    <>
      <div
        className={`flex items-center justify-end font-futura font-bold text-[14px] md:text-base text-black gap-6 min-w-[79px] md:w-[120px] ${
          cartMenuOpened ? 'z-30' : 'z-20'
        }`}
        onClick={toggleMenu}
      >
        <div className='cursor-pointer hover:opacity-70 transition duration-300'>
          CART(
          {cart
            ? cart.items.reduce((total, item) => total + item.quantity, 0)
            : 0}
          )
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-20 ${
          cartMenuOpened ? 'opacity-100 z-20' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      ></div>
      <div
        className={`fixed top-0 right-0 h-[100vh] w-full md:w-[42%] bg-white transform flex justify-start items-center pr-[30px] overflow-y-auto ${
          cartMenuOpened ? 'translate-x-0 z-30' : 'translate-x-full'
        } transition-transform duration-700 ease-in-out z-30`}
      >
        <div
          className='fixed top-[28px] right-[30px] font-futura font-bold cursor-pointer hover:opacity-70 transition duration-300'
          onClick={toggleMenu}
        >
          <XMarkIcon className='text-black h-6 w-6 font-bold mt-1' />
        </div>
        <div className='flex flex-col justify-start items-start text-base text-black font-futura gap-6 h-full w-full pt-[30px] font-futura mx-6'>
          <div className='w-full flex justify-between items-center'>
            <div className='text-lg font-bold'>Your Cart</div>
          </div>
          <div className='w-full'>
            {cart && cart.items.length > 0 ? (
              cart.items.map((item, index) => {
                const [amountString, currency] = item.price.split(' ');
                const amount = parseFloat(amountString);
                const totalPrice = amount * item.quantity;
                const itemKey = `${item.variantId}-${item.size}`;

                return (
                  <div
                    key={itemKey}
                    ref={(el) => {
                      if (el) {
                        itemRefs.current.set(itemKey, el);
                      } else {
                        itemRefs.current.delete(itemKey);
                      }
                    }}
                    className={`transition-max-height duration-500 ease-in-out ${
                      removingItem === itemKey ? 'max-h-0' : ''
                    }`}
                    style={{
                      overflow: 'hidden',
                      maxHeight: removingItem === itemKey ? '0' : '1000px',
                    }}
                  >
                    <div className='flex justify-between items-center mb-4'>
                      <div className='flex items-start w-full'>
                        <div className='relative'>
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={150}
                            height={150}
                          />
                          <button
                            className='bg-transparent p-1 absolute right-[4px] bottom-[4px]'
                            onClick={() => toggleFavorite(item.variantId)}
                          >
                            {favorites.includes(item.variantId) ? (
                              <HeartIconSolid className='h-4 w-4 text-black' />
                            ) : (
                              <HeartIcon className='h-4 w-4 text-black' />
                            )}
                          </button>
                        </div>

                        <div className='ml-4 w-full'>
                          <div className='flex justify-between items-center w-full'>
                            <div className='font-bold'>{item.title}</div>
                            <div className='font-bold'>
                              {totalPrice.toFixed(2)} {currency}
                            </div>
                          </div>
                          <div className='mt-2 text-sm'>
                            {item.color[0].toUpperCase() + item.color.slice(1)}
                          </div>
                          <div className='flex items-center gap-2 mt-2'>
                            <button
                              className='bg-transparent p-1'
                              onClick={() =>
                                decrementItem(item.variantId, item.size)
                              }
                            >
                              -
                            </button>
                            <div className='text-sm'>Qty {item.quantity}</div>
                            <button
                              className='bg-transparent p-1'
                              onClick={() =>
                                incrementItem(item.variantId, item.size)
                              }
                            >
                              +
                            </button>
                          </div>
                          <div className='text-sm mt-2'>Size: {item.size}</div>
                          <div className='flex justify-end items-end mt-6 hover:opacity-70 transition duration-300'>
                            <button
                              className='bg-transparent'
                              onClick={() =>
                                handleRemoveItem(item.variantId, item.size)
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < cart.items.length - 1 && (
                      <hr className='w-full border-t border-gray-300 my-4' />
                    )}
                  </div>
                );
              })
            ) : (
              <div>Your cart is empty</div>
            )}
          </div>
          <div className='w-full mt-4 flex justify-between items-center'>
            <div className='text-lg font-bold'>TOTAL</div>
            <div className='text-lg font-bold'>
              {cart ? calculateTotal() : '0.00'}{' '}
              {cart ? cart.items[0]?.price.split(' ')[1] : ''}
            </div>
          </div>
          <div className='w-full mt-4'>
            <Link
              href='/checkout'
              className='w-full border b-1 border-black bg-black text-white py-2 hover:text-black hover:bg-white transition duration-300 text-center block'
              onClick={toggleMenu}
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartMenu;
