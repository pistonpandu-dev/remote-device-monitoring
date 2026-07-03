'use client';

import { Metric } from 'web-vitals';

export function reportWebVitals(metric: Metric) {
  // Send to analytics
  console.log('Web Vitals:', metric);
  
  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: metric.value,
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Send to custom analytics endpoint
  fetch('/api/analytics/web-vitals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      navigationType: metric.navigationType,
    }),
  }).catch((error) => {
    console.error('Failed to send web vitals:', error);
  });
}
