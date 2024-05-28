'use client';
import React, {
  createContext,
  useContext,
  useRef,
  MutableRefObject,
  useState,
} from 'react';

interface ThresholdContextProps {
  thresholds: MutableRefObject<HTMLDivElement[]>;
  isThresholdReached: boolean;
  setThresholdReached: (reached: boolean) => void;
}

const ThresholdContext = createContext<ThresholdContextProps | undefined>(
  undefined,
);

export const ThresholdProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const thresholds = useRef<HTMLDivElement[]>([]);
  const [isThresholdReached, setThresholdReached] = useState(false);

  return (
    <ThresholdContext.Provider
      value={{ thresholds, isThresholdReached, setThresholdReached }}
    >
      {children}
    </ThresholdContext.Provider>
  );
};

export const useThreshold = (): ThresholdContextProps => {
  const context = useContext(ThresholdContext);
  if (!context) {
    throw new Error('useThreshold must be used within a ThresholdProvider');
  }
  return context;
};
