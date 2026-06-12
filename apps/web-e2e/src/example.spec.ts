import { expect, test } from '@playwright/test';

test('has landing page heading', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Fast exchange flows',
  );
});
