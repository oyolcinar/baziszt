'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
// import fetchProducts from '../api/products/route';
import fetchProducts from '../../../lib/fetchProducts';

interface Product {
  id: string;
  slug: string;
  name: string;
  images: string[];
  colors: string[];
  price: string;
  details: string;
  category: string[];
  sizes: string[];
}

interface ProductGroupProps {
  products: Product[];
  category: string[];
  title: string;
}

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
