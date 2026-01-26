'use client';

import { useVisitorTracking, VisitorStats } from '@/hooks/useVisitorTracking';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

interface VisitorTrackingValue {
  stats: VisitorStats;
  isConnected: boolean;
  error: string | null;
}

const VisitorTrackingContext = createContext<VisitorTrackingValue | undefined>(
  undefined,
);

export const VisitorTrackingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { stats, isConnected, error } = useVisitorTracking();

  return (
    <VisitorTrackingContext.Provider value={{ stats, isConnected, error }}>
      {children}
    </VisitorTrackingContext.Provider>
  );
};

export const useVisitorTrackingContext = () => {
  const context = useContext(VisitorTrackingContext);

  if (!context) {
    throw new Error(
      'useVisitorTrackingContext must be used within VisitorTrackingProvider',
    );
  }

  return context;
};
