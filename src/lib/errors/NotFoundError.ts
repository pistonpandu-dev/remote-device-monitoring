import { AppError } from './AppError';

export class NotFoundError extends AppError {
  public readonly resource: string;

  constructor(
    resource: string,
    id?: string,
    message: string = `${resource} not found${id ? ` with id: ${id}` : ''}`
  ) {
    super(message, 'NOT_FOUND', 404, true, { resource, id });
    this.name = 'NotFoundError';
    this.resource = resource;
  }
}
