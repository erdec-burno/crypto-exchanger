import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router';

import {
  getCurrentAdminUser,
  logoutAdmin,
  refreshAdminSession,
} from '@shared/api-client';
import {
  Button,
  ErrorState,
  SessionExpiryWarningModal,
  Spinner,
} from '@shared/ui';
import { LoginPage } from '@crypto-exchanger/admin/features/auth';
import { AuditLogPage } from '@crypto-exchanger/admin/features/audit-log';
import { DashboardPage } from '@crypto-exchanger/admin/features/dashboard';
import { KycPage } from '@crypto-exchanger/admin/features/kyc';
import { OrdersPage } from '@crypto-exchanger/admin/features/orders';
import { RatesPage } from '@crypto-exchanger/admin/features/rates';
import { SettingsPage } from '@crypto-exchanger/admin/features/settings';
import { UsersPage } from '@crypto-exchanger/admin/features/users';
import { createAdminI18n } from '@crypto-exchanger/admin/i18n';

import './styles.css';

const queryClient = new QueryClient();
const adminNavigationItems = [
  { path: 'dashboard', translationKey: 'navigation.dashboard' },
  { path: 'orders', translationKey: 'navigation.orders' },
  { path: 'users', translationKey: 'navigation.users' },
  { path: 'rates', translationKey: 'navigation.rates' },
  { path: 'kyc', translationKey: 'navigation.kyc' },
  { path: 'settings', translationKey: 'navigation.settings' },
  { path: 'audit-log', translationKey: 'navigation.auditLog' },
] as const;

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const { t } = useTranslation('admin');
  const meQuery = useQuery({ queryKey: ['admin-me'], queryFn: getCurrentAdminUser });
  const refreshSessionMutation = useMutation({
    mutationFn: refreshAdminSession,
    onError: () => {
      client.clear();
      navigate('/login');
    },
    onSuccess: (user) => {
      client.setQueryData(['admin-me'], user);
    },
  });

  if (meQuery.isLoading) return <PageShell><Spinner /></PageShell>;
  if (meQuery.isError) return <Navigate to="/login" replace />;
  if (!meQuery.data) return <PageShell><ErrorState title={t('sessionRestoreError')} /></PageShell>;

  async function handleLogout() {
    await logoutAdmin();
    client.clear();
    navigate('/login');
  }

  return (
    <PageShell>
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-3xl bg-slate-950 p-4 text-white">
          <p className="px-3 text-xs uppercase tracking-[0.3em] text-cyan-300">{t('title')}</p>
          <nav className="mt-5 grid gap-2 text-sm font-semibold">
            {adminNavigationItems.map(({ path, translationKey }) => (
              <Link key={path} className="rounded-xl px-3 py-2 hover:bg-white/10" to={`/${path}`}>
                {t(translationKey)}
              </Link>
            ))}
          </nav>
          <Button className="mt-6 w-full" variant="secondary" onClick={handleLogout}>{t('logout')}</Button>
        </aside>
        <section><Outlet /></section>
      </div>
      <SessionExpiryWarningModal
        continueDisabled={refreshSessionMutation.isPending}
        continueLabel={
          refreshSessionMutation.isPending
            ? t('sessionExpiry.continuing')
            : t('sessionExpiry.continue')
        }
        description={t('sessionExpiry.description')}
        expiresAt={meQuery.data.sessionExpiresAt}
        onContinue={() => refreshSessionMutation.mutate()}
        title={t('sessionExpiry.title')}
        warningThresholdSeconds={meQuery.data.sessionExpiryWarningSeconds}
      />
    </PageShell>
  );
};

const PageShell = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen bg-[linear-gradient(135deg,#020617,#0f172a_35%,#e2e8f0_35%)] p-6"><main className="mx-auto max-w-7xl">{children}</main></div>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PageShell><LoginPage /></PageShell>} />
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:orderId" element={<OrdersPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:userId" element={<UsersPage />} />
            <Route path="/rates" element={<RatesPage />} />
            <Route path="/kyc" element={<KycPage />} />
            <Route path="/kyc/:caseId" element={<KycPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/audit-log" element={<AuditLogPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const i18n = await createAdminI18n();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </StrictMode>,
);
