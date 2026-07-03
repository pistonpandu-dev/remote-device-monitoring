export interface BrowserInfo {
  name: string;
  version: string;
  isMobile: boolean;
  isDesktop: boolean;
  os: string;
  screenSize: {
    width: number;
    height: number;
  };
  viewport: {
    width: number;
    height: number;
    orientation: 'portrait' | 'landscape';
  };
  isDarkMode: boolean;
  isTouchDevice: boolean;
  connection: {
    type: string;
    speed: number | null;
    rtt: number | null;
  };
}
