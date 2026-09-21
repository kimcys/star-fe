import { expect, test } from '@playwright/test';

/**
 * Each test gets a fresh browser context (Playwright's default), so
 * there's never a leftover accept/decline cookie from a previous test
 * to work around.
 */

test('shows the consent banner on the home page for a first-time visitor', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'We value your privacy' })).toBeVisible();
});

test('does not show the consent banner on Privacy Policy or Terms & Conditions', async ({
  page,
}) => {
  await page.goto('/privacy-policy');
  await expect(page.getByRole('dialog')).toHaveCount(0);

  await page.goto('/terms-conditions');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('accepting the banner hides it and the decision persists across a reload', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('dialog')).toBeVisible();

  await page.getByRole('button', { name: 'Accept' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);

  await page.reload();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('declining the banner hides it immediately', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('dialog')).toBeVisible();

  await page.getByRole('button', { name: 'Decline' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('the banner reappears on Home after visiting Privacy Policy without deciding', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('dialog')).toBeVisible();

  await page.getByRole('link', { name: 'Privacy Statement' }).click();
  await expect(page).toHaveURL(/\/privacy-policy$/);
  await expect(page.getByRole('dialog')).toHaveCount(0);

  await page.goto('/');
  await expect(page.getByRole('dialog')).toBeVisible();
});
