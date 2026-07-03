export interface NetworkInfo {
  isOnline: boolean;
  type: string;
  speed: number | null;
  rtt: number | null;
  isCellular: boolean;
  isSlow: boolean;
}

export interface NetworkRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: any;
  timeout?: number;
}

export interface NetworkResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: NetworkRequest;
}

export interface NetworkError {
  message: string;
  code: string;
  status?: number;
  data?: any;
}
