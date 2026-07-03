import { AppError } from './AppError';

export class ValidationError extends AppError {
  public readonly fields: Record<string, string[]>;

  constructor(
    message: string = 'Validation failed',
    fields: Record<string, string[]> = {},
    code: string = 'VALIDATION_ERROR',
    statusCode: number = 400
  ) {
    super(message, code, statusCode, true, { fields });
    this.name = 'ValidationError';
    this.fields = fields;
  }
}
