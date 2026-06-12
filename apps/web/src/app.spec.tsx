import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './app';

describe('App', () => {
  it('renders the landing page heading', () => {
    render(<App router="static" />);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain(
      'Fast exchange flows',
    );
  });
});
