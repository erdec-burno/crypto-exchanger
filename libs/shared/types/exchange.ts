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
