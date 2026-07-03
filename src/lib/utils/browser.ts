export const browser = {
  getBrowserInfo: () => {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let version = '';

    if (ua.includes('Chrome')) {
      browser = 'Chrome';
      version = ua.match(/Chrome\/(\d+)/)?.[1] || '';
    } else if (ua.includes('Firefox')) {
      browser = 'Firefox';
      version = ua.match(/Firefox\/(\d+)/)?.[1] || '';
    } else if (ua.includes('Safari')) {
      browser = 'Safari';
      version = ua.match(/Version\/(\d+)/)?.[1] || '';
    } else if (ua.includes('Edge')) {
      browser = 'Edge';
      version = ua.match(/Edge\/(\d+)/)?.[1] || '';
    }

    return { browser, version };
  },

  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  },

  isIOS: () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  },

  isAndroid: () => {
    return /Android/.test(navigator.userAgent);
  },

  isDesktop: () => {
    return !browser.isMobile();
  },

  getOS: () => {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Unknown';
  },

  getScreenSize: () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },

  getViewport: () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
    };
  },

  isDarkMode: () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  },

  isTouchDevice: () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },

  downloadFile: (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  copyToClipboard: async (text: string) => {
    await navigator.clipboard.writeText(text);
  },

  readFromClipboard: async () => {
    return await navigator.clipboard.readText();
  },

  openNewTab: (url: string) => {
    window.open(url, '_blank');
  },

  reloadPage: () => {
    window.location.reload();
  },

  scrollToTop: (behavior: ScrollBehavior = 'smooth') => {
    window.scrollTo({ top: 0, behavior });
  },

  scrollToElement: (elementId: string, behavior: ScrollBehavior = 'smooth') => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior });
    }
  },
};
