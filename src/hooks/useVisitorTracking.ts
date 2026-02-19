'use client';

import { getSocketBaseUrl } from '@/lib/socket';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface VisitorStats {
  active: number;
  todayVisitors: number;
  totalVisitors: number;
}

export const useVisitorTracking = () => {
  const pathname = usePathname();
  const socketRef = useRef<Socket | null>(null);
  const startedRef = useRef(false);
  const currentPathRef = useRef<string | null>(null);
  const [stats, setStats] = useState<VisitorStats>({
    active: 0,
    todayVisitors: 0,
    totalVisitors: 0,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socket = io(getSocketBaseUrl(), {
      path: '/ws',
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    const handleCount = (data: { active: number }) => {
      setStats((prev) => ({ ...prev, active: data.active }));
    };

    const handleStats = (data: VisitorStats) => {
      setStats(data);
    };

    const debugEnabled =
      process.env.NEXT_PUBLIC_SOCKET_DEBUG === 'true' ||
      process.env.NODE_ENV === 'development';

    socket.on('connect', () => {
      setIsConnected(true);
      setError(null);

      if (currentPathRef.current) {
        socket.emit('visit:start', { page: currentPathRef.current });
        startedRef.current = true;
      }
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      startedRef.current = false;
    });

    socket.on('connect_error', (err: Error) => {
      if (debugEnabled) {
        console.error('[socket:visitors] connect_error', err.message);
      }
      setError(err.message || 'Connection failed');
      setIsConnected(false);
    });

    socket.on('visitors:count', handleCount);
    socket.on('visitors:stats', handleStats);

    const handleBeforeUnload = () => {
      if (socket.connected && startedRef.current) {
        socket.emit('visit:end');
      }
      socket.disconnect();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      socket.off('visitors:count', handleCount);
      socket.off('visitors:stats', handleStats);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      socket.disconnect();
      socketRef.current = null;
      startedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const currentPath =
      pathname ||
      (typeof window !== 'undefined' ? window.location.pathname : '');
    currentPathRef.current = currentPath;
    const socket = socketRef.current;
    if (!socket) return;

    if (socket.connected) {
      if (startedRef.current) {
        socket.emit('visit:end');
      }

      socket.emit('visit:start', { page: currentPath });
      startedRef.current = true;
    }

    return () => {
      if (socket.connected && startedRef.current) {
        socket.emit('visit:end');
        startedRef.current = false;
      }
    };
  }, [pathname]);

  return { stats, isConnected, error };
};
