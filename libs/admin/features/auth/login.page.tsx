import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { loginAdmin } from '@shared/api-client';
import { Button, Card, Input } from '@shared/ui';
import {
  adminLoginSchema,
  type AdminLoginForm,
} from '@shared/validation';
import { formatText, getUserSafeErrorMessage } from '@shared/utils';
import { Currency } from '@shared/types';

const currency: Currency = {
  name: 'US Dollar',
  code: 'USD',
  precision: 2,
  networks: [],
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm<AdminLoginForm>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { email: '', password: '', twoFactorCode: '' },
  });
  const mutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-me'] });
      navigate('/dashboard');
    },
  });

  return (
    <Card className="mx-auto max-w-md">
      <h1 className="text-3xl font-black text-slate-950">
        {formatText('Admin login')}
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Authentication is restored through /admin/me using HttpOnly cookies.{' '}
        <strong>{currency.name}</strong>
      </p>
      <form
        className="mt-6 grid gap-4"
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      >
        <Field label="Email" error={form.formState.errors.email?.message}>
          <Input type="email" {...form.register('email')} />
        </Field>
        <Field label="Password" error={form.formState.errors.password?.message}>
          <Input type="password" {...form.register('password')} />
        </Field>
        <Field
          label="2FA code"
          error={form.formState.errors.twoFactorCode?.message}
        >
          <Input {...form.register('twoFactorCode')} />
        </Field>
        {mutation.error ? (
          <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {getUserSafeErrorMessage(mutation.error)}
          </p>
        ) : null}
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Signing in...' : 'Sign in'}
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
