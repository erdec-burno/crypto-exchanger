import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes, StaticRouter } from 'react-router';

import { getRuntimeConfig } from '@shared/config';
import { AdminLoginLink, NavigationMenu, type NavigationMenuItem } from '@shared/ui';
import { ExchangePage } from '@crypto-exchanger/web/features/exchange';
import { LandingPage } from '@crypto-exchanger/web/features/landing';
import { LegalPage } from '@crypto-exchanger/web/features/legal';
import { OrderStatusPage } from '@crypto-exchanger/web/features/order-status';
import { SupportPage } from '@crypto-exchanger/web/features/support';

const runtimeConfig = getRuntimeConfig();
const mainNavigationItems: NavigationMenuItem[] = [
  { to: '/exchange', label: 'Exchange' },
  { to: '/support', label: 'Support' },
  { to: '/terms', label: 'Terms' },
];

type AppProps = {
  url?: string;
  router?: 'browser' | 'static';
};

export const App = ({ url = '/', router = 'browser' }: AppProps) => {
  const queryClient = useMemo(() => new QueryClient(), []);
  const content = (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#cffafe,transparent_35%),linear-gradient(135deg,#f8fafc,#e2e8f0)] text-slate-950">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-lg font-black tracking-tight">
            Crypto Exchanger
          </a>
          <div className="flex items-center gap-4">
            <NavigationMenu items={mainNavigationItems} />
            <AdminLoginLink href={runtimeConfig.adminAppUrl}>Login</AdminLoginLink>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/exchange" element={<ExchangePage />} />
            <Route path="/order/:orderId" element={<OrderStatusPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/terms" element={<LegalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </QueryClientProvider>
  );

  if (router === 'static') {
    return <StaticRouter location={url}>{content}</StaticRouter>;
  }

  return <BrowserRouter>{content}</BrowserRouter>;
};
