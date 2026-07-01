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
// ... previous types ...

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FilterOptions {
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface CommandResponse {
  success: boolean;
  command: string;
  result: any;
  timestamp: string;
}

export interface WebRTCStream {
  id: string;
  deviceId: string;
  stream: MediaStream;
  status: 'connecting' | 'connected' | 'disconnected';
  bitrate: number;
  fps: number;
  resolution: string;
  latency: number;
}

export interface QRCodeData {
  id: string;
  code: string;
  status: 'waiting' | 'connected' | 'expired';
  deviceId?: string;
  createdAt: string;
  expiresAt: string;
  refreshInterval: number;
}

export interface ChatMessage {
  id: string;
  contactId: string;
  contactName: string;
  phoneNumber: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  isOutgoing: boolean;
  media?: {
    type: 'image' | 'video' | 'document' | 'audio';
    url: string;
    thumbnail?: string;
    size: number;
    mimeType: string;
  };
}

export interface ChatContact {
  id: string;
  name: string;
  phoneNumber: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  isOnline: boolean;
  avatar?: string;
}

export interface MapMarker {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  description?: string;
  icon?: string;
}

export interface RoutePoint {
  lat: number;
  lng: number;
  timestamp: string;
  speed: number;
  heading: number;
  accuracy: number;
}

export interface SystemMetric {
  id: string;
  deviceId: string;
  timestamp: string;
  metrics: {
    cpu: number;
    memory: number;
    storage: number;
    battery: number;
    network: {
      type: string;
      strength: number;
      speed: number;
    };
  };
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: any;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}
