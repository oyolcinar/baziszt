'use client';

import { useEffect, useState, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import { useTranslation } from '../../../utils/useTranslation';
import ProductCard from '../components/ProductCard/ProductCard';

interface Order {
  id: number;
  total_price: string;
  created_at: string;
}

const AccountPage = () => {
  const { user, wishlist, login, signUp, signOut } = useUser();
  const router = useRouter();
  const { t } = useTranslation();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [orders, setOrders] = useState<Order[]>([]);

  // Track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const wishlistRef = useRef<HTMLDivElement>(null);
  const ordersRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     if (user) {
  //       try {
  //         const response = await fetch('/api/fetchOrders', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({ customerAccessToken: user.accessToken }),
  //         });

  //         if (response.ok) {
  //           const data = await response.json();
  //           setOrders(data.orders);
  //         } else {
  //           console.error('Failed to fetch orders');
  //         }
  //       } catch (error) {
  //         console.error('Error fetching orders:', error);
  //       }
  //     }
  //   };

  //   fetchOrders();
  // }, [user]);

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

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedWishlist = [...wishlist].sort((a, b) => {
    const priceA = typeof a.price === 'number' ? a.price : 0;
    const priceB = typeof b.price === 'number' ? b.price : 0;
    return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
  });

  const sortedOrders = [...orders].sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prevSections) =>
      prevSections.includes(section)
        ? prevSections.filter((sec) => sec !== section)
        : [...prevSections, section],
    );
  };

  const isSectionExpanded = (section: string) =>
    expandedSections.includes(section);

  if (user) {
    return (
      <>
        {/* Wishlist Section */}
        <div
          className='flex justify-between items-center w-full px-[30px] mb-4 mt-20 cursor-pointer'
          onClick={() => toggleSection('wishlist')}
        >
          <div className='text-xl text-black font-futura'>{t('wishlist')}</div>
          <div>{isSectionExpanded('wishlist') ? '-' : '+'}</div>
        </div>

        <div
          ref={wishlistRef}
          className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
            isSectionExpanded('wishlist') ? 'max-h-screen' : 'max-h-0'
          }`}
        >
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
        </div>

        {/* Orders Section */}
        <div
          className='flex justify-between items-center w-full px-[30px] mb-4 mt-20 cursor-pointer'
          onClick={() => toggleSection('orders')}
        >
          <div className='text-xl text-black font-futura'>
            {t('previousOrders')}
          </div>
          <div>{isSectionExpanded('orders') ? '-' : '+'}</div>
        </div>

        <div
          ref={ordersRef}
          className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
            isSectionExpanded('orders') ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <div className='flex justify-center w-full mb-20'>
            {orders.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 customMd:grid-cols-4 lg:grid-cols-4 p-0 md:p-2 gap-2'>
                {sortedOrders.map((order) => (
                  <div key={order.id} className='border p-4'>
                    <div>Order ID: {order.id}</div>
                    <div>Total Price: {order.total_price}</div>
                    <div>
                      Date: {new Date(order.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center text-black font-futura'>
                {t('noOrders')}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className='p-8 max-w-sm w-full'>
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
