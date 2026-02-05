'use client';

import { getUserProfile, User } from '@/services/auth';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

export interface IUserProviderValues {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  refreshUser: () => Promise<void>;
  clearUser: () => void;
}

export const UserContext = createContext<IUserProviderValues | undefined>(
  undefined,
);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getUserProfile();

      if ('success' in result && result.success) {
        setUser(result.data);
        setError(null);
      } else if ('success' in result && !result.success) {
        setUser(null);
        setError(result.message || 'Authentication failed');
        console.warn('User not authenticated:', result.message);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setUser(null);
      setError('Failed to load user profile');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    await fetchUserProfile();
  }, [fetchUserProfile]);

  const clearUser = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const contextValue: IUserProviderValues = {
    user,
    isLoading,
    error,
    setUser,
    setIsLoading,
    refreshUser,
    clearUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
