import { expect, test } from '@playwright/test';

test('has login page heading', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Admin login',
  );
});
