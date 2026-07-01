export interface Device {
  id: string;
  deviceName: string;
  manufacturer: string;
  model: string;
  androidVersion: string;
  cpu: string;
  ram: string;
  storage: string;
  ipAddress: string;
  networkType: string;
  battery: number;
  isOnline: boolean;
  lastConnected: string;
  lastLocation?: {
    latitude: number;
    longitude: number;
    accuracy: number;
    speed: number;
    heading: number;
    address: string;
    timestamp: string;
  };
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  devices: Device[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Invite {
  id: string;
  email: string;
  token: string;
  status: 'pending' | 'accepted' | 'expired';
  createdAt: string;
  expiresAt: string;
}

export interface PairingQR {
  id: string;
  qrCode: string;
  status: 'waiting' | 'connected' | 'expired';
  deviceId?: string;
  createdAt: string;
  expiresAt: string;
}

export interface WhatsAppMessage {
  id: string;
  contactName: string;
  phoneNumber: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  media?: {
    type: 'image' | 'video' | 'document';
    url: string;
  };
}

export interface LocationHistory {
  id: string;
  deviceId: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  accuracy: number;
  address: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    sound: boolean;
  };
  apiConfiguration: {
    endpoint: string;
    timeout: number;
  };
}

export interface DashboardStats {
  totalClients: number;
  onlineClients: number;
  offlineClients: number;
  activeDevices: number;
}
