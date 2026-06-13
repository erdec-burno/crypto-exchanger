import { createRoutesStub } from 'react-router';
import { render, screen } from '@testing-library/react';

import { LoginPage } from '../../app/routes/public/login';

test('renders demo sign-in credentials', async () => {
  const ReactRouterStub = createRoutesStub([
    {
      path: '/login',
      Component: LoginPage,
      loader: () => ({ redirectTo: '/dashboard' }),
    },
  ]);

  render(<ReactRouterStub initialEntries={['/login']} />);

  expect(
    await screen.findByRole('heading', { name: 'Sign in to your dashboard' }),
  ).toBeTruthy();
  expect(screen.getByDisplayValue('admin@example.com')).toBeTruthy();
  expect(screen.getByDisplayValue('demo1234')).toBeTruthy();
});
