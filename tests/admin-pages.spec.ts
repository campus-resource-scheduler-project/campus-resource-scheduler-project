import { test, expect } from '@playwright/test';

test.use({
  storageState: 'vercel-admin-auth.json',
});

test('Admin Pages', async ({ page }) => {
  await page.goto('https://campus-resource-scheduler-project.vercel.app/profile');
  await expect(page.locator('b').filter({ hasText: 'Admin' })).toBeVisible();
  await expect(page.locator('h5').filter({ hasText: 'Admin' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Email Address: admin@foo.com' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Phone Number: (808) 123-' }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Standing: N/A' }).first()).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^default$/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Major: N/A' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Standing: N/A' }).nth(1)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Campus: University of Hawaii' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Phone Number: (808) 123-' }).nth(1)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Personal Email: admin@gmail.' })).toBeVisible();
});
