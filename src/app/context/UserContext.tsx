'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../../../lib/loginUser';

interface User {
  accessToken: string;
  expiresAt: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const loginData = await loginUser(email, password);
    if (loginData.customerAccessToken) {
      setUser({
        accessToken: loginData.customerAccessToken.accessToken,
        expiresAt: loginData.customerAccessToken.expiresAt,
      });
    } else {
      console.error(loginData.userErrors);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
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
