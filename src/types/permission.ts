export type PermissionName = 
  | 'geolocation'
  | 'notifications'
  | 'camera'
  | 'microphone'
  | 'background-sync'
  | 'persistent-storage';

export type PermissionState = 'granted' | 'denied' | 'prompt';

export interface PermissionStatus {
  name: PermissionName;
  state: PermissionState;
  isSupported: boolean;
}

export interface PermissionRequest {
  name: PermissionName;
  request: () => Promise<boolean>;
}
