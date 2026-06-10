import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router';

import { getCurrentAdminUser, logoutAdmin } from '@shared/api-client';
import { Button, ErrorState, Spinner } from '@shared/ui';
import { LoginPage } from '@crypto-exchanger/admin/features/auth';
import { AuditLogPage } from '@crypto-exchanger/admin/features/audit-log';
import { DashboardPage } from '@crypto-exchanger/admin/features/dashboard';
import { KycPage } from '@crypto-exchanger/admin/features/kyc';
import { OrdersPage } from '@crypto-exchanger/admin/features/orders';
import { RatesPage } from '@crypto-exchanger/admin/features/rates';
import { SettingsPage } from '@crypto-exchanger/admin/features/settings';
import { UsersPage } from '@crypto-exchanger/admin/features/users';

import './styles.css';

const queryClient = new QueryClient();

function ProtectedLayout() {
  const navigate = useNavigate();
  const client = useQueryClient();
  const meQuery = useQuery({ queryKey: ['admin-me'], queryFn: getCurrentAdminUser });

  if (meQuery.isLoading) return <PageShell><Spinner /></PageShell>;
  if (meQuery.isError) return <Navigate to="/login" replace />;
  if (!meQuery.data) return <PageShell><ErrorState title="Admin session could not be restored." /></PageShell>;

  async function handleLogout() {
    await logoutAdmin();
    client.clear();
    navigate('/login');
  }

  return (
    <PageShell>
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-3xl bg-slate-950 p-4 text-white">
          <p className="px-3 text-xs uppercase tracking-[0.3em] text-cyan-300">Admin</p>
          <nav className="mt-5 grid gap-2 text-sm font-semibold">
            {['dashboard', 'orders', 'users', 'rates', 'kyc', 'settings', 'audit-log'].map((path) => <Link key={path} className="rounded-xl px-3 py-2 hover:bg-white/10" to={`/${path}`}>{path}</Link>)}
          </nav>
          <Button className="mt-6 w-full" variant="secondary" onClick={handleLogout}>Logout</Button>
        </aside>
        <section><Outlet /></section>
      </div>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[linear-gradient(135deg,#020617,#0f172a_35%,#e2e8f0_35%)] p-6"><main className="mx-auto max-w-7xl">{children}</main></div>;
}

function App() {
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
}

createRoot(document.getElementById('root') as HTMLElement).render(<StrictMode><App /></StrictMode>);
