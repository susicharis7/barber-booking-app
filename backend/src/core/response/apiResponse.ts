import type { Response } from 'express';

type ApiMeta = Record<string, unknown>;

type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

const getRequestIdFromResponse = (res: Response): string => {
  const headerValue = res.getHeader('x-request-id');

  if (typeof headerValue === 'string') return headerValue;
  if (Array.isArray(headerValue) && headerValue.length > 0) return String(headerValue[0]);

  return '';
};

export const sendSuccess = <T>(
  res: Response,
  data: T,
  status = 200,
  meta?: ApiMeta
): void => {
  const body: Record<string, unknown> = {
    success: true,
    data,
    requestId: getRequestIdFromResponse(res),
  };

  if (meta) body.meta = meta;

  res.status(status).json(body);
};

export const sendError = (res: Response, status: number, error: ApiError): void => {
  res.status(status).json({
    success: false,
    error,
    requestId: getRequestIdFromResponse(res),
  });
};
