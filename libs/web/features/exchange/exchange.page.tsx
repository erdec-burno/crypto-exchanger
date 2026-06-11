import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import {
  createExchangeOrder,
  createExchangeQuote,
} from '@shared/api-client';
import { Button, Card, Input } from '@shared/ui';
import { getUserSafeErrorMessage } from '@shared/utils';
import {
  createExchangeOrderSchema,
  type CreateExchangeOrderForm,
} from '@shared/validation';

export const ExchangePage = () => {
  const form = useForm<CreateExchangeOrderForm>({
    resolver: zodResolver(createExchangeOrderSchema),
    defaultValues: {
      fromCurrency: 'BTC',
      toCurrency: 'USDT',
      amount: '',
      payoutAddress: '',
      network: 'TRC20',
      acceptTerms: false,
    },
  });

  const orderMutation = useMutation({
    mutationFn: async (values: CreateExchangeOrderForm) => {
      const quote = await createExchangeQuote(values);
      return createExchangeOrder({ ...values, quoteId: quote.quoteId });
    },
  });

  const onSubmit = form.handleSubmit((values) => orderMutation.mutate(values));

  return (
    <Card className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-black text-slate-950">Exchange</h1>
      <p className="mt-2 text-sm text-slate-600">
        Displayed values are estimates. The backend returns final rate, fee,
        expiration, and payment address.
      </p>
      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <Field label="From" error={form.formState.errors.fromCurrency?.message}>
          <Input {...form.register('fromCurrency')} />
        </Field>
        <Field label="To" error={form.formState.errors.toCurrency?.message}>
          <Input {...form.register('toCurrency')} />
        </Field>
        <Field label="Amount" error={form.formState.errors.amount?.message}>
          <Input inputMode="decimal" {...form.register('amount')} />
        </Field>
        <Field label="Network" error={form.formState.errors.network?.message}>
          <Input {...form.register('network')} />
        </Field>
        <Field
          label="Payout address"
          error={form.formState.errors.payoutAddress?.message}
        >
          <Input {...form.register('payoutAddress')} />
        </Field>
        <label className="flex gap-2 text-sm text-slate-700">
          <input type="checkbox" {...form.register('acceptTerms')} /> I accept
          terms and AML/KYC notices.
        </label>
        {form.formState.errors.acceptTerms?.message ? (
          <p className="text-sm text-red-600">
            {form.formState.errors.acceptTerms.message}
          </p>
        ) : null}
        {orderMutation.error ? (
          <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {getUserSafeErrorMessage(orderMutation.error)}
          </p>
        ) : null}
        {orderMutation.data ? (
          <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
            Order created: {orderMutation.data.orderId}
          </p>
        ) : null}
        <Button type="submit" disabled={orderMutation.isPending}>
          {orderMutation.isPending ? 'Creating...' : 'Create order'}
        </Button>
      </form>
    </Card>
  );
};

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-800">
      <span>{label}</span>
      {children}
      {error ? <span className="font-normal text-red-600">{error}</span> : null}
    </label>
  );
};
