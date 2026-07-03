import { event } from './index';

export const AnalyticsEvents = {
  // Authentication
  LOGIN: 'login',
  LOGOUT: 'logout',
  REGISTER: 'register',
  PASSWORD_RESET: 'password_reset',
  
  // Dashboard
  DASHBOARD_VIEW: 'dashboard_view',
  STATS_VIEW: 'stats_view',
  
  // Clients
  CLIENT_CREATE: 'client_create',
  CLIENT_UPDATE: 'client_update',
  CLIENT_DELETE: 'client_delete',
  CLIENT_VIEW: 'client_view',
  CLIENT_SEARCH: 'client_search',
  CLIENT_FILTER: 'client_filter',
  
  // Devices
  DEVICE_VIEW: 'device_view',
  DEVICE_PAIR: 'device_pair',
  DEVICE_UNPAIR: 'device_unpair',
  DEVICE_ONLINE: 'device_online',
  DEVICE_OFFLINE: 'device_offline',
  
  // Stream
  STREAM_START: 'stream_start',
  STREAM_STOP: 'stream_stop',
  STREAM_FULLSCREEN: 'stream_fullscreen',
  STREAM_SCREENSHOT: 'stream_screenshot',
  STREAM_ROTATE: 'stream_rotate',
  
  // Location
  LOCATION_VIEW: 'location_view',
  LOCATION_UPDATE: 'location_update',
  ROUTE_VIEW: 'route_view',
  
  // WhatsApp
  WHATSAPP_VIEW: 'whatsapp_view',
  WHATSAPP_MESSAGE: 'whatsapp_message',
  WHATSAPP_SEARCH: 'whatsapp_search',
  
  // Notifications
  NOTIFICATION_RECEIVE: 'notification_receive',
  NOTIFICATION_CLICK: 'notification_click',
  NOTIFICATION_DISMISS: 'notification_dismiss',
  NOTIFICATIONS_CLEAR: 'notifications_clear',
  
  // Settings
  SETTINGS_VIEW: 'settings_view',
  SETTINGS_UPDATE: 'settings_update',
  THEME_CHANGE: 'theme_change',
  PASSWORD_CHANGE: 'password_change',
  
  // Error
  ERROR_OCCUR: 'error_occur',
  ERROR_RECOVER: 'error_recover',
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  event({
    action: eventName,
    category: properties?.category || 'General',
    label: properties?.label,
    value: properties?.value,
  });
};
