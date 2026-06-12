import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DashboardPage } from '@crypto-exchanger/admin/features/dashboard';

describe('Admin app', () => {
  it('renders the dashboard heading', () => {
    render(<DashboardPage />);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain(
      'Dashboard',
    );
  });
});
