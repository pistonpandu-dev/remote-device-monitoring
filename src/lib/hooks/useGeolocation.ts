'use client';

import { useState, useEffect } from 'react';

interface GeolocationState {
  loading: boolean;
  error: string | null;
  position: GeolocationPosition | null;
}

export function useGeolocation(options?: PositionOptions) {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    error: null,
    position: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!navigator.geolocation) {
      setState({
        loading: false,
        error: 'Geolocation is not supported by your browser',
        position: null,
      });
      return;
    }

    let watchId: number;

    const handleSuccess = (position: GeolocationPosition) => {
      setState({
        loading: false,
        error: null,
        position,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      setState({
        loading: false,
        error: error.message,
        position: null,
      });
    };

    if (options?.enableHighAccuracy) {
      watchId = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        options
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        options
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [options]);

  const refresh = () => {
    setState(prev => ({ ...prev, loading: true }));
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState({
            loading: false,
            error: null,
            position,
          });
        },
        (error) => {
          setState({
            loading: false,
            error: error.message,
            position: null,
          });
        },
        options
      );
    }
  };

  return { ...state, refresh };
}
