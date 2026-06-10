import type { ApiError } from '../types';

export function isApiError(value: unknown): value is ApiError {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.status === 'number' &&
    typeof candidate.code === 'string' &&
    typeof candidate.message === 'string'
  );
}

export function normalizeApiError(error: unknown): ApiError {
  if (isApiError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return {
      status: 0,
      code: 'network_error',
      message: error.message,
    };
  }

  return {
    status: 0,
    code: 'unknown_error',
    message: 'Unexpected API error',
    details: error,
  };
}
