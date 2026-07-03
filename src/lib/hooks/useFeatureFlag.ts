'use client';

import { useState, useEffect } from 'react';

interface FeatureFlags {
  [key: string]: boolean;
}

const defaultFlags: FeatureFlags = {
  'live-stream': true,
  'whatsapp-monitoring': true,
  'location-tracking': true,
  'dark-mode': true,
  'pwa': true,
  'notifications': true,
};

export function useFeatureFlag(flag: string): boolean {
  const [isEnabled, setIsEnabled] = useState(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`feature_${flag}`);
      if (stored !== null) {
        return stored === 'true';
      }
    }
    return defaultFlags[flag] || false;
  });

  useEffect(() => {
    // Fetch from API
    const fetchFlag = async () => {
      try {
        const response = await fetch(`/api/features/${flag}`);
        const data = await response.json();
        setIsEnabled(data.enabled);
        localStorage.setItem(`feature_${flag}`, String(data.enabled));
      } catch (error) {
        console.error('Failed to fetch feature flag:', error);
        // Use default value
        setIsEnabled(defaultFlags[flag] || false);
      }
    };

    fetchFlag();
  }, [flag]);

  return isEnabled;
}
