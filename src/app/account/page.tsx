'use client';

import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import { useTranslation } from '../../../utils/useTranslation';

const AccountPage = () => {
  const { user, login, signUp, signOut } = useUser();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signUp(email, firstName, lastName);
      }
      router.push('/');
    } catch (err) {
      setError(isLogin ? t('failedLogin') : t('failedSignUp'));
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className=' p-8 max-w-sm w-full'>
        <h2 className='text-2xl font-futura text-black'>
          {isLogin ? t('login') : t('signUp')}
        </h2>
        <div className='h-[24px] my-4'>
          {error && <p className='text-red-500 font-futura mb-8'>{error}</p>}
        </div>

        {!isLogin && (
          <>
            <div className='mb-4 border-b-2 border-black'>
              <label
                className='block text-black text-sm font-futura mb-2'
                htmlFor='firstName'
              >
                {t('firstName')}
              </label>
              <input
                id='firstName'
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className='bg-transparent outline-none w-full font-futura text-black placeholder-gray text-[14px]'
              />
            </div>
            <div className='mb-4 border-b-2 border-black'>
              <label
                className='block text-black text-sm font-futura mb-2'
                htmlFor='lastName'
              >
                {t('lastName')}
              </label>
              <input
                id='lastName'
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className='bg-transparent outline-none w-full font-futura text-black placeholder-gray text-[14px]'
              />
            </div>
          </>
        )}

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
            htmlFor='password'
          >
            {t('password')}
          </label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='bg-transparent outline-none w-full font-futura text-black placeholder-gray text-[14px]'
          />
        </div>

        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className='bg-black hover:bg-white hover:text-black border border-black text-white font-futura py-2 px-4 focus:outline-none focus:shadow-outline transition duration-300'
          >
            {isLogin ? t('login') : t('signUp')}
          </button>
        </div>

        <div className='mt-4 text-center '>
          <button
            type='button'
            onClick={() => setIsLogin(!isLogin)}
            className='text-black font-futura hover:text-black/70 transition duration-300'
          >
            {isLogin
              ? t('dontHaveAccountSignUp')
              : t('alreadyHaveAccountLogin')}
          </button>
        </div>

        <div className='mt-4 text-center '>
          {user && (
            <button
              type='button'
              onClick={signOut}
              className='text-black font-futura hover:text-black/70 transition duration-300'
            >
              {t('signOut')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountPage;
