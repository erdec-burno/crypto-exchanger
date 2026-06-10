import { getRuntimeConfig } from '../config';
import type { ApiError } from '../types';

export type HttpClientOptions = {
  baseUrl?: string;
  credentials?: RequestCredentials;
};

export type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

export class HttpClient {
  private readonly baseUrl: string;
  private readonly credentials: RequestCredentials;

  constructor(options: HttpClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? getRuntimeConfig().apiBaseUrl;
    this.credentials = options.credentials ?? 'include';
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const headers = new Headers(options.headers);

    if (options.body !== undefined && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      credentials: options.credentials ?? this.credentials,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });

    const payload = await readJson(response);

    if (!response.ok) {
      throw normalizeResponseError(response, payload);
    }

    return payload as T;
  }

  get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'POST', body });
  }
}

async function readJson(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined;
  }

  const text = await response.text();
  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function normalizeResponseError(response: Response, payload: unknown): ApiError {
  if (payload && typeof payload === 'object') {
    const candidate = payload as Partial<ApiError>;
    return {
      status: response.status,
      code: typeof candidate.code === 'string' ? candidate.code : 'api_error',
      message: typeof candidate.message === 'string' ? candidate.message : response.statusText,
      details: candidate.details,
    };
  }

  return {
    status: response.status,
    code: 'api_error',
    message: response.statusText,
    details: payload,
  };
}

export const httpClient = new HttpClient();
