

'use client';

import { IUserProviderValues, UserContext } from '@/context/UserContext';
import { useContext } from 'react';


export const useAuth = (): IUserProviderValues => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within UserProvider');
  }

  return context;
};


export const useIsAuthenticated = (): boolean => {
  const { user, isLoading } = useAuth();
  return !isLoading && user !== null;
};
