import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes } from 'react-router';

import { privateRoutes } from './routes/private-routes';
import { publicRoutes } from './routes/public-routes';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {publicRoutes}
          {privateRoutes}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
