'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/app/context/ProductContext';

interface User {
  accessToken: string;
  expiresAt: string;
}

interface UserContextType {
  user: User | null;
  wishlist: Product[];
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (product: Product) => void;
  isProductInWishlist: (product: Product) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } else {
      localStorage.removeItem('wishlist');
    }
  }, [wishlist]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Full response from login API:', data);

      if (data.error || data.userErrors) {
        console.error('User Errors or Missing Access Token:', data.userErrors);
        const errorMessage = data.error
          ? data.error
          : data.userErrors.map((error: any) => error.message).join(', ');
        throw new Error(errorMessage);
      }

      if (data.accessToken) {
        console.log('Login successful, setting user data...');
        setUser({
          accessToken: data.accessToken,
          expiresAt: data.expiresAt,
        });
      } else {
        throw new Error('Login failed: no access token provided.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const signUp = async (email: string, firstName: string, lastName: string) => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, firstName, lastName }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || `Failed to sign up: ${response.statusText}`,
      );
    }

    await login(email, 'password');
  };

  const signOut = () => {
    fetch('/api/signout', { method: 'POST' });
    setUser(null);
    router.push('/');
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  const removeFromWishlist = (product: Product) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== product.id),
    );
  };

  const isProductInWishlist = (product: Product) => {
    return wishlist.some((item) => item.id === product.id);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        wishlist,
        login,
        signUp,
        signOut,
        addToWishlist,
        removeFromWishlist,
        isProductInWishlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
