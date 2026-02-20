import type { ErrorCode } from './errorCodes';

type AppErrorParams = {
  status: number;
  code: ErrorCode;
  message: string;
  details?: unknown;
  expose?: boolean;
};

export class AppError extends Error {
  public readonly status: number;
  public readonly code: ErrorCode;
  public readonly details?: unknown;
  public readonly expose: boolean;

  constructor({ status, code, message, details, expose }: AppErrorParams) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.code = code;
    this.details = details;
    this.expose = expose ?? status < 500;
  }
}
