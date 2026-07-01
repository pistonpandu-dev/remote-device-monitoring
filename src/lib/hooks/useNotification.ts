'use client';

import { useEffect, useState } from 'react';
import { getToken, onMessage } from '@/lib/firebase/config';
import { messaging } from '@/lib/firebase/config';
import { toast } from 'react-hot-toast';

export function useNotification() {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (!messaging) return;

    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        setPermission(permission);

        if (permission === 'granted') {
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });
          setFcmToken(token);
          // Send token to backend
          await fetch('/api/notification/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fcmToken: token }),
          });
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    requestPermission();
  }, []);

  useEffect(() => {
    if (!messaging) return;

    const unsubscribe = onMessage(messaging, (payload) => {
      const { title, body } = payload.notification || {};
      if (title && body) {
        toast.custom((t) => (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm">
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{body}</p>
          </div>
        ));
      }
    });

    return unsubscribe;
  }, []);

  return { fcmToken, permission };
}
