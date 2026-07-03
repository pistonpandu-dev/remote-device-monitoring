import { io, Socket } from 'socket.io-client';
import { logger } from '@/lib/logger';

export interface WebSocketOptions {
  url?: string;
  autoConnect?: boolean;
  reconnection?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  auth?: Record<string, any>;
}

export class WebSocketClient {
  private socket: Socket | null = null;
  private options: WebSocketOptions;
  private isConnected = false;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private messageHandlers: Map<string, ((data: any) => void)[]> = new Map();

  constructor(options: WebSocketOptions = {}) {
    this.options = {
      url: process.env.NEXT_PUBLIC_WEBSOCKET_URL || '',
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
      ...options,
    };

    if (this.options.autoConnect) {
      this.connect();
    }
  }

  connect(): void {
    if (this.socket?.connected) {
      return;
    }

    const url = this.options.url || process.env.NEXT_PUBLIC_WEBSOCKET_URL;
    if (!url) {
      logger.error('WebSocket URL not configured');
      return;
    }

    this.socket = io(url, {
      transports: ['websocket'],
      reconnection: this.options.reconnection,
      reconnectionAttempts: this.options.reconnectionAttempts,
      reconnectionDelay: this.options.reconnectionDelay,
      auth: this.options.auth,
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      this.isConnected = true;
      logger.info('WebSocket connected');
      this.emit('connection:status', { status: 'connected' });
    });

    this.socket.on('disconnect', (reason) => {
      this.isConnected = false;
      logger.info(`WebSocket disconnected: ${reason}`);
      this.emit('connection:status', { status: 'disconnected', reason });
    });

    this.socket.on('connect_error', (error) => {
      logger.error(`WebSocket connection error: ${error.message}`);
      this.emit('connection:error', { error: error.message });
    });

    this.socket.on('reconnect', (attempt) => {
      logger.info(`WebSocket reconnected after ${attempt} attempts`);
      this.emit('connection:reconnect', { attempt });
    });

    this.socket.on('reconnect_failed', () => {
      logger.error('WebSocket reconnection failed');
      this.emit('connection:reconnect_failed');
    });

    // Handle incoming messages
    this.socket.onAny((event: string, ...args: any[]) => {
      if (event.startsWith('connection:')) return;
      this.handleIncomingMessage(event, args[0]);
    });
  }

  private handleIncomingMessage(event: string, data: any): void {
    const handlers = this.messageHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }

  on(event: string, handler: (data: any) => void): void {
    if (!this.messageHandlers.has(event)) {
      this.messageHandlers.set(event, []);
    }
    this.messageHandlers.get(event)!.push(handler);
  }

  off(event: string, handler: (data: any) => void): void {
    const handlers = this.messageHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }

  emit(event: string, data: any): void {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      logger.warn(`WebSocket not connected, cannot emit ${event}`);
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  reconnect(): void {
    this.disconnect();
    this.connect();
  }

  isConnectedToSocket(): boolean {
    return this.isConnected;
  }
}

export const websocket = new WebSocketClient({
  autoConnect: typeof window !== 'undefined',
});
