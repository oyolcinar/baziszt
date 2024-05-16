'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuContextType {
  navMenuOpened: boolean;
  cartMenuOpened: boolean;
  openNavMenu: () => void;
  closeNavMenu: () => void;
  openCartMenu: () => void;
  closeCartMenu: () => void;
}

interface MenuProviderProps {
  children: ReactNode;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [navMenuOpened, setNavMenuOpened] = useState(false);
  const [cartMenuOpened, setCartMenuOpened] = useState(false);

  const openNavMenu = () => {
    setNavMenuOpened(true);
    setCartMenuOpened(false);
  };

  const closeNavMenu = () => {
    setNavMenuOpened(false);
  };

  const openCartMenu = () => {
    setCartMenuOpened(true);
    setNavMenuOpened(false);
  };

  const closeCartMenu = () => {
    setCartMenuOpened(false);
  };

  return (
    <MenuContext.Provider
      value={{
        navMenuOpened,
        cartMenuOpened,
        openNavMenu,
        closeNavMenu,
        openCartMenu,
        closeCartMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
