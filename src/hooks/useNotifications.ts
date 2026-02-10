'use client';

import { getSocketBaseUrl } from '@/lib/socket';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface NotificationItem {
  notificationId: string;
  type: string;
  title: string;
  message: string;
  meta?: Record<string, unknown>;
}

export const useNotifications = (token: string | null) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const socket: Socket = io(`${getSocketBaseUrl()}/api/queue`, {
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    const debugEnabled =
      process.env.NEXT_PUBLIC_SOCKET_DEBUG === 'true' ||
      process.env.NODE_ENV === 'development';

    const handleNotification = (notification: NotificationItem) => {
      setNotifications((prev) => [notification, ...prev]);
    };

    socket.on('success', () => {
      setIsConnected(true);
      setError(null);
    });

    socket.on('error', (err: { message?: string }) => {
      if (debugEnabled) {
        console.error('[socket:notifications] error', err?.message);
      }
      setError(err?.message || 'Connection failed');
      setIsConnected(false);
    });

    socket.on('boat:approved', handleNotification);
    socket.on('boat:rejected', handleNotification);
    socket.on('boat:new', handleNotification);
    socket.on('message:new', handleNotification);
    socket.on('notification', handleNotification);

    return () => {
      socket.off('boat:approved', handleNotification);
      socket.off('boat:rejected', handleNotification);
      socket.off('boat:new', handleNotification);
      socket.off('message:new', handleNotification);
      socket.off('notification', handleNotification);
      socket.disconnect();
    };
  }, [token]);

  return { notifications, isConnected, error };
};
