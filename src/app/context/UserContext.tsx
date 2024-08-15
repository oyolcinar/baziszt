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
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Failed to login: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.customerAccessToken) {
      setUser({
        accessToken: data.customerAccessToken.accessToken,
        expiresAt: data.customerAccessToken.expiresAt,
      });
    } else {
      console.error(data.userErrors);
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

    if (!response.ok) {
      throw new Error(`Failed to sign up: ${response.statusText}`);
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
