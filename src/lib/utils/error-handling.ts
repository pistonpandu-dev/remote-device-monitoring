import { AxiosError } from 'axios';

export interface AppError {
  code: string;
  message: string;
  details?: any;
}

export function handleApiError(error: unknown): AppError {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data;

    switch (status) {
      case 400:
        return {
          code: 'BAD_REQUEST',
          message: data?.message || 'Invalid request',
          details: data?.errors,
        };
      case 401:
        return {
          code: 'UNAUTHORIZED',
          message: 'Please login again',
        };
      case 403:
        return {
          code: 'FORBIDDEN',
          message: 'You do not have permission to perform this action',
        };
      case 404:
        return {
          code: 'NOT_FOUND',
          message: 'Resource not found',
        };
      case 429:
        return {
          code: 'RATE_LIMIT',
          message: 'Too many requests. Please try again later',
        };
      case 500:
        return {
          code: 'SERVER_ERROR',
          message: 'Internal server error. Please try again later',
        };
      default:
        return {
          code: 'UNKNOWN_ERROR',
          message: data?.message || 'An unexpected error occurred',
        };
    }
  }

  if (error instanceof Error) {
    return {
      code: 'ERROR',
      message: error.message,
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
  };
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return !error.response && error.message === 'Network Error';
  }
  return false;
}

export function isUnauthorizedError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 401;
  }
  return false;
}

export function isValidationError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 400 && error.response?.data?.errors;
  }
  return false;
}

export function getErrorMessage(error: unknown): string {
  const appError = handleApiError(error);
  return appError.message;
}

export function getErrorCode(error: unknown): string {
  const appError = handleApiError(error);
  return appError.code;
}
