import { Route } from 'react-router';

import { LoginPage } from '@crypto-exchanger/admin/features/auth';

import { PublicLayout } from '../layouts/public-layout';

export const publicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/login" element={<LoginPage />} />
  </Route>
);
