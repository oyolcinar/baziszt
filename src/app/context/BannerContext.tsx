'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface BannerContextProps {
  bannerHeight: number;
  setBannerHeight: React.Dispatch<React.SetStateAction<number>>;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const BannerContext = createContext<BannerContextProps | undefined>(undefined);

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error('useBanner must be used within a BannerProvider');
  }
  return context;
};

export const BannerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bannerHeight, setBannerHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <BannerContext.Provider
      value={{ bannerHeight, setBannerHeight, isVisible, setIsVisible }}
    >
      {children}
    </BannerContext.Provider>
  );
};
