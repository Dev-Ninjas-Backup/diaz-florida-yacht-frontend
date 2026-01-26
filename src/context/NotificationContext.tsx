'use client';

import { NotificationItem, useNotifications } from '@/hooks/useNotifications';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

interface NotificationValue {
  notifications: NotificationItem[];
  isConnected: boolean;
  error: string | null;
}

const NotificationContext = createContext<NotificationValue | undefined>(
  undefined,
);

export const NotificationProvider = ({
  children,
  token,
}: {
  children: ReactNode;
  token: string | null;
}) => {
  const { notifications, isConnected, error } = useNotifications(token);

  return (
    <NotificationContext.Provider value={{ notifications, isConnected, error }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotificationContext must be used within NotificationProvider',
    );
  }

  return context;
};
