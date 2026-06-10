import type {
  AdminUser,
  ExchangeOrder,
  ExchangePair,
  ExchangeQuote,
  PaginatedResponse,
} from '../types';

import { httpClient } from './http-client';

export type CreateQuoteRequest = {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
};

export type CreateOrderRequest = CreateQuoteRequest & {
  quoteId: string;
  payoutAddress: string;
  network?: string;
};

export type AdminLoginRequest = {
  email: string;
  password: string;
  twoFactorCode?: string;
};

export function getPublicExchangePairs(): Promise<ExchangePair[]> {
  return httpClient.get<ExchangePair[]>('/public/exchange-pairs');
}

export function createExchangeQuote(input: CreateQuoteRequest): Promise<ExchangeQuote> {
  return httpClient.post<ExchangeQuote>('/public/quotes', input);
}

export function createExchangeOrder(input: CreateOrderRequest): Promise<ExchangeOrder> {
  return httpClient.post<ExchangeOrder>('/public/orders', input);
}

export function getPublicOrder(orderId: string): Promise<ExchangeOrder> {
  return httpClient.get<ExchangeOrder>(`/public/orders/${encodeURIComponent(orderId)}`);
}

export function getCurrentAdminUser(): Promise<AdminUser> {
  return httpClient.get<AdminUser>('/admin/me');
}

export function loginAdmin(input: AdminLoginRequest): Promise<AdminUser> {
  return httpClient.post<AdminUser>('/admin/login', input);
}

export function logoutAdmin(): Promise<void> {
  return httpClient.post<void>('/admin/logout');
}

export function getAdminOrders(): Promise<PaginatedResponse<ExchangeOrder>> {
  return httpClient.get<PaginatedResponse<ExchangeOrder>>('/admin/orders');
}
