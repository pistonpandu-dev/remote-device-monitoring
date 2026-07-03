'use client';

export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Remote Device Monitoring',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  },
  
  api: {
    url: process.env.NEXT_PUBLIC_API_URL || '',
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
  },
  
  websocket: {
    url: process.env.NEXT_PUBLIC_WEBSOCKET_URL || '',
    reconnectAttempts: Number(process.env.NEXT_PUBLIC_WS_RECONNECT_ATTEMPTS) || 5,
    reconnectInterval: Number(process.env.NEXT_PUBLIC_WS_RECONNECT_INTERVAL) || 3000,
  },
  
  maps: {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  },
  
  features: {
    liveStream: process.env.NEXT_PUBLIC_FEATURE_LIVE_STREAM !== 'false',
    whatsApp: process.env.NEXT_PUBLIC_FEATURE_WHATSAPP !== 'false',
    location: process.env.NEXT_PUBLIC_FEATURE_LOCATION !== 'false',
    notifications: process.env.NEXT_PUBLIC_FEATURE_NOTIFICATIONS !== 'false',
    darkMode: process.env.NEXT_PUBLIC_FEATURE_DARK_MODE !== 'false',
    pwa: process.env.NEXT_PUBLIC_FEATURE_PWA !== 'false',
  },
  
  pagination: {
    defaultPage: Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE) || 1,
    defaultLimit: Number(process.env.NEXT_PUBLIC_DEFAULT_LIMIT) || 10,
    limitOptions: [5, 10, 20, 50, 100],
  },
  
  cache: {
    ttl: Number(process.env.NEXT_PUBLIC_CACHE_TTL) || 300,
    maxItems: Number(process.env.NEXT_PUBLIC_CACHE_MAX_ITEMS) || 100,
  },
  
  security: {
    rateLimitMax: Number(process.env.NEXT_PUBLIC_RATE_LIMIT_MAX) || 100,
    rateLimitWindow: Number(process.env.NEXT_PUBLIC_RATE_LIMIT_WINDOW) || 60,
  },
};

export default config;
