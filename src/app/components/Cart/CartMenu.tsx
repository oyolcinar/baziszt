'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const CartMenu: React.FC = () => {
  const {
    cart,
    clearCart,
    menuOpened,
    toggleCartMenu,
    incrementItem,
    decrementItem,
    removeItem,
  } = useCart();

  return (
    <>
      <div
        className='flex items-center justify-end font-futura font-bold text-[14px] md:text-base text-black gap-6 min-w-[79px] md:w-[120px] z-50'
        onClick={toggleCartMenu}
      >
        {!menuOpened ? (
          <div className='cursor-pointer hover:opacity-70 transition duration-300'>
            CART(
            {cart
              ? cart.items.reduce((total, item) => total + item.quantity, 0)
              : 0}
            )
          </div>
        ) : (
          <div className='cursor-pointer hover:opacity-70 transition duration-300'>
            CLOSE
          </div>
        )}
      </div>
      <div
        className={`fixed top-0 right-0 h-[100vh] w-full md:w-[42%] bg-white transform flex justify-start items-center pr-[30px] ${
          menuOpened ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-700 ease-in-out z-40`}
      >
        <div className='flex flex-col justify-start items-start text-base text-black font-futura gap-6 overflow-y-auto h-full w-full pt-[100px]'>
          <div className='w-full flex justify-between items-center'>
            <div className='text-lg font-bold'>Your Cart</div>
            {/* <XMarkIcon
              className='h-6 w-6 cursor-pointer'
              onClick={toggleCartMenu}
            /> */}
          </div>
          <div className='w-full'>
            {cart && cart.items.length > 0 ? (
              cart.items.map((item, index) => {
                const [amountString, currency] = item.price.split(' ');
                const amount = parseFloat(amountString);
                const totalPrice = amount * item.quantity;

                return (
                  <div
                    key={index}
                    className='flex justify-between items-center mb-4'
                  >
                    <div className='flex items-center'>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={50}
                        height={50}
                      />
                      <div className='ml-4'>
                        <div className='font-bold'>{item.title}</div>
                        <div className='text-sm'>Quantity: {item.quantity}</div>
                        <div className='text-sm'>Size: {item.size}</div>
                        <div className='flex items-center gap-2 mt-2'>
                          <button
                            className='border border-gray-300 p-1'
                            onClick={() =>
                              incrementItem(item.variantId, item.size)
                            }
                          >
                            +
                          </button>
                          <button
                            className='border border-gray-300 p-1'
                            onClick={() =>
                              decrementItem(item.variantId, item.size)
                            }
                          >
                            -
                          </button>
                          <button
                            className='border border-gray-300 p-1'
                            onClick={() =>
                              removeItem(item.variantId, item.size)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='font-bold'>
                      {totalPrice.toFixed(2)} {currency}
                    </div>
                  </div>
                );
              })
            ) : (
              <div>Your cart is empty</div>
            )}
          </div>
          <div className='w-full mt-4'>
            <button
              className='w-full bg-black text-white py-2 hover:bg-gray-800 transition duration-300'
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
          <div className='w-full mt-4'>
            <Link
              href='/checkout'
              className='w-full bg-black text-white py-2 hover:bg-gray-800 transition duration-300 text-center block'
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartMenu;
