'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/components/auth/AuthProvider';

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const newSocket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || '', {
      auth: {
        token: user.uid,
      },
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('WebSocket connected');
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return { socket };
}
