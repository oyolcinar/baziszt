import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const NewsletterPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 font-futura text-black'>
      <div className='relative bg-bone pt-6 px-8 pb-2 shadow-lg text-center'>
        <button
          onClick={handleClose}
          className='absolute top-2 right-2 hover:opacity-70 transition duration-300'
        >
          <XMarkIcon className='h-6 w-6 text-black' />
        </button>
        <h2 className='text-2xl mb-4'>Subscribe to our Newsletter</h2>
        <p className='mb-4'>Stay updated with our latest news and offers!</p>
        <form className='mb-2'>
          <input
            type='email'
            placeholder='Enter your email'
            className='bg-transparent outline-none flex-1 text-black placeholder-gray text-[16px] mb-4 border-b-2 border-black py-1 w-full'
          />
          <button
            type='submit'
            className='border border-black h-12 w-[100%] sm:flex justify-center items-center transition duration-300 ease-in-out hover:bg-black text-black hover:text-bone cursor-pointer'
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterPopup;
