'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '../../../utils/useTranslation';

const ContactPage = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      console.log({ name, email, message });
    } catch (err) {
      setError(t('failedContactSubmission'));
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className='p-8 max-w-sm w-full'>
        <h2 className='text-2xl font-futura text-black text-center'>
          {t('contactUs')}
        </h2>
        <div className='h-[24px] my-4'>
          {error && <p className='text-red-500 font-futura mb-8'>{error}</p>}
        </div>

        <div className='mb-4 border-b-2 border-black'>
          <label
            className='block text-black text-sm font-futura mb-2'
            htmlFor='name'
          >
            {t('name')}
          </label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='bg-transparent outline-none w-full font-futura text-black placeholder-gray text-[14px]'
          />
        </div>

        <div className='mb-4 border-b-2 border-black'>
          <label
            className='block text-gray-700 text-sm font-futura mb-2'
            htmlFor='email'
          >
            {t('email')}
          </label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='bg-transparent outline-none w-full font-futura text-black placeholder-gray text-[14px]'
          />
        </div>

        <div className='mb-6 border-b-2 border-black'>
          <label
            className='block text-gray-700 text-sm font-futura mb-2'
            htmlFor='message'
          >
            {t('message')}
          </label>
          <textarea
            id='message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className='bg-transparent outline-none w-full font-futura text-black placeholder-gray text-[14px] h-32 resize-none'
          />
        </div>

        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className='bg-black hover:bg-white hover:text-black border border-black text-white font-futura py-2 px-4 focus:outline-none focus:shadow-outline transition duration-300'
          >
            {t('send')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
