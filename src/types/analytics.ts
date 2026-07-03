export interface AnalyticsEvent {
  name: string;
  category?: string;
  label?: string;
  value?: number;
  timestamp?: string;
  metadata?: Record<string, any>;
}

export interface AnalyticsPageView {
  path: string;
  title?: string;
  referrer?: string;
  timestamp?: string;
}

export interface AnalyticsUser {
  id: string;
  email?: string;
  name?: string;
  properties?: Record<string, any>;
}

export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  id: string;
  navigationType: string;
  timestamp: string;
}
