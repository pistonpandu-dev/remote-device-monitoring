import { AppError } from './AppError';

export class AuthError extends AppError {
  constructor(
    message: string = 'Authentication failed',
    code: string = 'AUTH_ERROR',
    statusCode: number = 401,
    details?: any
  ) {
    super(message, code, statusCode, true, details);
    this.name = 'AuthError';
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 'UNAUTHORIZED', 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AuthError {
  constructor(message: string = 'Access forbidden') {
    super(message, 'FORBIDDEN', 403);
    this.name = 'ForbiddenError';
  }
}

export class SessionExpiredError extends AuthError {
  constructor(message: string = 'Session expired') {
    super(message, 'SESSION_EXPIRED', 401);
    this.name = 'SessionExpiredError';
  }
}
