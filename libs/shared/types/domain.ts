export type Currency = {
  code: string;
  name: string;
  precision: number;
  networks: CurrencyNetwork[];
};

export type CurrencyNetwork = {
  code: string;
  name: string;
};

export type ExchangePair = {
  fromCurrency: string;
  toCurrency: string;
  enabled: boolean;
};

export type ExchangeQuote = {
  quoteId: string;
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  rate: string;
  fee: string;
  finalAmount: string;
  expiresAt: string;
};

export type OrderStatus =
  | 'created'
  | 'waiting_payment'
  | 'paid'
  | 'processing'
  | 'completed'
  | 'cancelled'
  | 'failed'
  | 'expired';

export type ExchangeOrder = {
  orderId: string;
  quoteId: string;
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  finalAmount: string;
  paymentAddress: string;
  payoutAddress: string;
  status: OrderStatus;
  expiresAt: string;
  createdAt: string;
};

export type AdminUser = {
  id: string;
  email: string;
  displayName: string;
  roles: string[];
  sessionExpiresAt: string;
  sessionExpiryWarningSeconds: number;
};

export type AdminSettings = {
  exchangeEnabled: boolean;
  maintenanceMode: boolean;
  defaultFiatCurrency: string;
  supportEmail: string;
  sessionTtlSeconds: number;
  sessionExpiryWarningSeconds: number;
};

export type CustomerUser = {
  id: string;
  email: string;
  kycStatus: KycStatus;
};

export type KycStatus = 'not_started' | 'pending' | 'approved' | 'rejected';

export type AmlCheckStatus = 'not_checked' | 'pending' | 'clear' | 'review_required' | 'blocked';

export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  meta: PaginationMeta;
};

export type ApiError = {
  status: number;
  code: string;
  message: string;
  details?: unknown;
};
