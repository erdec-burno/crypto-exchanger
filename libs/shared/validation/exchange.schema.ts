import { z } from 'zod';

export const createExchangeOrderSchema = z.object({
  fromCurrency: z.string().min(1, 'Select source currency'),
  toCurrency: z.string().min(1, 'Select target currency'),
  amount: z.string().regex(/^\d+(\.\d+)?$/, 'Enter a valid amount'),
  payoutAddress: z.string().min(8, 'Enter a payout wallet address'),
  network: z.string().optional(),
  acceptTerms: z.boolean().refine((value) => value, 'Accept terms to continue'),
});

export type CreateExchangeOrderForm = z.infer<typeof createExchangeOrderSchema>;
