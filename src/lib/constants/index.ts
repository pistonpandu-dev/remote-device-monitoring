export const APP_NAME = 'Remote Device Monitoring';
export const APP_VERSION = '1.0.0';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    PROFILE: '/auth/profile',
  },
  CLIENTS: {
    BASE: '/clients',
    STATS: '/clients/stats',
  },
  DEVICES: {
    BASE: '/devices',
    STATUS: '/devices/:id/status',
    COMMAND: '/devices/:id/command',
  },
  INVITES: {
    BASE: '/invites',
    VERIFY: '/invites/verify/:token',
    ACCEPT: '/invites/accept/:token',
    RESEND: '/invites/:id/resend',
  },
  LOCATIONS: {
    BASE: '/locations',
    CURRENT: '/locations/:deviceId/current',
    HISTORY: '/locations/:deviceId/history',
  },
  WHATSAPP: {
    BASE: '/whatsapp',
    MESSAGES: '/whatsapp/messages',
    CHATS: '/whatsapp/chats',
  },
  NOTIFICATIONS: {
    BASE: '/notifications',
    MARK_READ: '/notifications/:id/read',
    MARK_ALL_READ: '/notifications/read-all',
  },
  SETTINGS: {
    BASE: '/settings',
    THEME: '/settings/theme',
    NOTIFICATIONS: '/settings/notifications',
    API: '/settings/api',
  },
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  CLIENTS: '/clients',
  CLIENT_DETAIL: '/clients/:id',
  INVITES: '/invites',
  PAIR: '/pair',
  LIVE_SCREEN: '/live-screen',
  LIVE_SCREEN_DEVICE: '/live-screen/:deviceId',
  WHATSAPP: '/whatsapp',
  LOCATION: '/location',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
};

export const STORAGE_KEYS = {
  THEME: 'theme',
  AUTH_TOKEN: 'auth-token',
  USER: 'user',
  SETTINGS: 'settings',
  NOTIFICATIONS: 'notifications',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [5, 10, 20, 50, 100],
};

export const STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  EXPIRED: 'expired',
  ONLINE: 'online',
  OFFLINE: 'offline',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Unauthorized. Please login again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Internal server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logout successful!',
  REGISTER_SUCCESS: 'Account created successfully!',
  PASSWORD_RESET_SENT: 'Password reset email sent!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  CLIENT_CREATED: 'Client created successfully!',
  CLIENT_UPDATED: 'Client updated successfully!',
  CLIENT_DELETED: 'Client deleted successfully!',
  DEVICE_CREATED: 'Device created successfully!',
  DEVICE_UPDATED: 'Device updated successfully!',
  DEVICE_DELETED: 'Device deleted successfully!',
  INVITE_SENT: 'Invite sent successfully!',
  INVITE_RESENT: 'Invite resent successfully!',
  INVITE_CANCELLED: 'Invite cancelled successfully!',
};
