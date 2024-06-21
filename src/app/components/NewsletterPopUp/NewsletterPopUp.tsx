import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useTranslation } from '../../../../utils/useTranslation';

const NewsletterPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisplayed(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      setIsDisplayed(false);
    }, 300);
  };

  if (!isDisplayed) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 font-futura text-bone transition-opacity duration-300 backdrop-blur ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`relative bg-transparent pt-6 px-8 pb-2 text-center transition-transform duration-300 ${
          isAnimating ? 'scale-100' : 'scale-90'
        }`}
      >
        <button
          onClick={handleClose}
          className='absolute top-2 right-2 hover:opacity-70 transition duration-300 z-50'
        >
          <XMarkIcon className='h-6 w-6 text-bone' />
        </button>
        <h2 className='text-2xl mb-4'>{t('subscribesmall')}</h2>
        <p className='mb-4'>{t('subscribeheader')}</p>
        <form className='mb-2'>
          <input
            type='email'
            placeholder={t('enteryouremail')}
            className='bg-transparent outline-none flex-1 text-bone placeholder-gray text-[16px] mb-4 border-b-2 border-bone py-1 w-full'
          />
          <button
            type='submit'
            className='border bg-bordeux border-bone h-12 w-[100%] sm:flex justify-center items-center transition duration-300 ease-in-out hover:bg-bone text-bone hover:text-bordeux cursor-pointer'
          >
            {t('subscribebutton')}
          </button>
        </form>
        <div>{t('subscribebanner')}</div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
