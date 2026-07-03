import { AppError } from './AppError';

export class ApiError extends AppError {
  public readonly endpoint: string;
  public readonly method: string;
  public readonly response?: any;

  constructor(
    message: string = 'API request failed',
    endpoint: string,
    method: string,
    code: string = 'API_ERROR',
    statusCode: number = 500,
    response?: any
  ) {
    super(message, code, statusCode, true, { endpoint, method, response });
    this.name = 'ApiError';
    this.endpoint = endpoint;
    this.method = method;
    this.response = response;
  }
}

export class NetworkError extends ApiError {
  constructor(endpoint: string, method: string) {
    super(
      'Network request failed',
      endpoint,
      method,
      'NETWORK_ERROR',
      0
    );
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends ApiError {
  constructor(endpoint: string, method: string) {
    super(
      'Request timeout',
      endpoint,
      method,
      'TIMEOUT_ERROR',
      408
    );
    this.name = 'TimeoutError';
  }
}
