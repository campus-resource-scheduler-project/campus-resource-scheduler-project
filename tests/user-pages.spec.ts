/* eslint-disable max-len */
import { test, expect } from '@playwright/test';

test.use({
  storageState: 'vercel-user-auth.json',
});

test('User Pages', async ({ page }) => {
  await page.goto('https://campus-resource-scheduler-project.vercel.app/profile');
  await expect(page.getByText('John Foo')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Student' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Email Address: john@foo.com' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Phone Number: (808) 432-' }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Standing: Junior' }).first()).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^CS Major at WCC\. I am unemployed\. I need resources n stuff\. lol$/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Major: Computer Science' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Standing: Junior' }).nth(1)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Campus: Windward Community' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Phone Number: (808) 432-' }).nth(1)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Personal Email: johnfoo@gmail' })).toBeVisible();
});
