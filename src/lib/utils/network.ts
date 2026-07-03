export const network = {
  isOnline: () => {
    return navigator.onLine;
  },

  getNetworkType: () => {
    const connection = (navigator as any).connection;
    if (!connection) return 'unknown';
    return connection.effectiveType || 'unknown';
  },

  getNetworkSpeed: () => {
    const connection = (navigator as any).connection;
    if (!connection) return null;
    return connection.downlink || null;
  },

  getRTT: () => {
    const connection = (navigator as any).connection;
    if (!connection) return null;
    return connection.rtt || null;
  },

  isSlowNetwork: () => {
    const type = network.getNetworkType();
    return type === 'slow-2g' || type === '2g';
  },

  isCellular: () => {
    const connection = (navigator as any).connection;
    if (!connection) return false;
    return connection.type === 'cellular';
  },

  checkConnectivity: async (url: string = '/api/health'): Promise<boolean> => {
    try {
      const response = await fetch(url, { 
        method: 'HEAD',
        cache: 'no-cache',
        signal: AbortSignal.timeout(5000),
      });
      return response.ok;
    } catch {
      return false;
    }
  },

  getIP: async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  },

  getLocation: (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  },
};
