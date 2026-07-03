'use client';

import { useState, useEffect } from 'react';

type PermissionName = 
  | 'geolocation'
  | 'notifications'
  | 'camera'
  | 'microphone'
  | 'background-sync'
  | 'persistent-storage';

export function usePermission(permission: PermissionName) {
  const [status, setStatus] = useState<PermissionState>('prompt');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const permissionName = permission as unknown as PermissionName;
    
    if ('permissions' in navigator) {
      setIsSupported(true);
      
      navigator.permissions
        .query({ name: permissionName as PermissionName })
        .then((result) => {
          setStatus(result.state);
          
          result.addEventListener('change', () => {
            setStatus(result.state);
          });
        })
        .catch(() => {
          setIsSupported(false);
        });
    }
  }, [permission]);

  const requestPermission = async () => {
    if (!isSupported) return false;

    try {
      let result: PermissionState = 'prompt';

      switch (permission) {
        case 'geolocation':
          await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          result = 'granted';
          break;
        case 'notifications':
          result = await Notification.requestPermission();
          break;
        case 'camera':
        case 'microphone':
          const stream = await navigator.mediaDevices.getUserMedia({
            [permission === 'camera' ? 'video' : 'audio']: true,
          });
          stream.getTracks().forEach(track => track.stop());
          result = 'granted';
          break;
        default:
          break;
      }

      setStatus(result);
      return result === 'granted';
    } catch {
      setStatus('denied');
      return false;
    }
  };

  return { status, isSupported, requestPermission };
}
