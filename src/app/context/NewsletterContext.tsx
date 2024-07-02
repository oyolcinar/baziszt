'use client';

import React, { createContext, useContext, useState } from 'react';
import subscribeNewsletter from '../../../lib/subscribeNewsletter';

interface NewsletterContextType {
  subscribe: (email: string) => Promise<void>;
  subscriptionStatus: 'idle' | 'subscribing' | 'subscribed' | 'error';
  error: string | null;
}

const NewsletterContext = createContext<NewsletterContextType | undefined>(
  undefined,
);

export const NewsletterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    'idle' | 'subscribing' | 'subscribed' | 'error'
  >('idle');
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (email: string) => {
    setSubscriptionStatus('subscribing');
    setError(null);
    try {
      await subscribeNewsletter({ email });
      setSubscriptionStatus('subscribed');
    } catch (err) {
      setError((err as Error).message);
      setSubscriptionStatus('error');
    }
  };

  return (
    <NewsletterContext.Provider
      value={{ subscribe, subscriptionStatus, error }}
    >
      {children}
    </NewsletterContext.Provider>
  );
};

export const useNewsletter = () => {
  const context = useContext(NewsletterContext);
  if (!context) {
    throw new Error('useNewsletter must be used within a NewsletterProvider');
  }
  return context;
};
