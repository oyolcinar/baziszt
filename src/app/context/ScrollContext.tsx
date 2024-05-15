'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface ScrollContextType {
  isPastThreshold: boolean;
  setIsPastThreshold: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  return (
    <ScrollContext.Provider value={{ isPastThreshold, setIsPastThreshold }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};
