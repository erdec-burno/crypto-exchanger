import { Navigate, Route } from 'react-router';

import { DashboardPage } from '@crypto-exchanger/admin/features/dashboard';
import { SettingsPage } from '@crypto-exchanger/admin/features/settings';

import { PrivateLayout } from '../layouts/private-layout';

export const privateRoutes = (
  <Route element={<PrivateLayout />}>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/settings" element={<SettingsPage />} />
  </Route>
);
