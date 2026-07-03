export const PERMISSIONS = {
  GEOLOCATION: 'geolocation',
  NOTIFICATIONS: 'notifications',
  CAMERA: 'camera',
  MICROPHONE: 'microphone',
  BACKGROUND_SYNC: 'background-sync',
  PERSISTENT_STORAGE: 'persistent-storage',
} as const;

export const PERMISSION_MESSAGES = {
  [PERMISSIONS.GEOLOCATION]: {
    title: 'Location Permission',
    description: 'We need your location to show real-time device tracking.',
  },
  [PERMISSIONS.NOTIFICATIONS]: {
    title: 'Notification Permission',
    description: 'We need notification permission to send you important updates.',
  },
  [PERMISSIONS.CAMERA]: {
    title: 'Camera Permission',
    description: 'We need camera permission to scan QR codes for device pairing.',
  },
  [PERMISSIONS.MICROPHONE]: {
    title: 'Microphone Permission',
    description: 'We need microphone permission for voice features.',
  },
  [PERMISSIONS.BACKGROUND_SYNC]: {
    title: 'Background Sync Permission',
    description: 'We need background sync for offline data synchronization.',
  },
  [PERMISSIONS.PERSISTENT_STORAGE]: {
    title: 'Storage Permission',
    description: 'We need storage permission to save data offline.',
  },
};

export const PERMISSION_ERRORS = {
  DENIED: 'Permission denied',
  NOT_SUPPORTED: 'Permission not supported by this browser',
  NOT_REQUESTED: 'Permission not requested',
} as const;
