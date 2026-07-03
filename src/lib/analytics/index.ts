'use client';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom events
export const trackLogin = (method: 'email' | 'google' | 'facebook') => {
  event({
    action: 'login',
    category: 'Authentication',
    label: method,
  });
};

export const trackLogout = () => {
  event({
    action: 'logout',
    category: 'Authentication',
  });
};

export const trackDevicePair = (status: 'success' | 'failed') => {
  event({
    action: 'device_pair',
    category: 'Device',
    label: status,
  });
};

export const trackStreamStart = (deviceId: string) => {
  event({
    action: 'stream_start',
    category: 'Stream',
    label: deviceId,
  });
};

export const trackStreamStop = (deviceId: string) => {
  event({
    action: 'stream_stop',
    category: 'Stream',
    label: deviceId,
  });
};

export const trackLocationView = (deviceId: string) => {
  event({
    action: 'location_view',
    category: 'Location',
    label: deviceId,
  });
};
