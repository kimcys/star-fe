import { Page, expect, test } from '@playwright/test';

const USERNAME = 'e2e-admin';
const PASSWORD = 'E2eTestPassword123';

/**
 * The admin shell renders <app-consent-banner> too (it's a legacy
 * no-JS-fallback-adjacent portal, not one of the public legal pages
 * the banner is suppressed on), so a fresh browser context can pop it
 * up on top of the login/dashboard UI. Not what these tests are
 * about - clear it out of the way if it shows up.
 */
async function dismissConsentBannerIfPresent(page: Page): Promise<void> {
  const dialog = page.getByRole('dialog');
  // The banner only appears after the async consent-status round trip
  // resolves - give it a moment before deciding it isn't coming.
  await dialog.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
  if (await dialog.isVisible()) {
    await page.getByRole('button', { name: 'Accept' }).click();
    await expect(dialog).toHaveCount(0);
  }
}

test('visiting the dashboard while logged out redirects to the login page', async ({ page }) => {
  await page.goto('/admin/dashboard');
  await dismissConsentBannerIfPresent(page);

  await expect(page).toHaveURL(/\/admin\/login$/);
});

test('logging in with valid credentials reaches the dashboard, and logging out returns to login', async ({
  page,
}) => {
  await page.goto('/admin/login');
  await dismissConsentBannerIfPresent(page);

  await page.getByLabel('Username').fill(USERNAME);
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page).toHaveURL(/\/admin\/dashboard$/);
  await expect(page.getByRole('heading', { name: 'Consent Records' })).toBeVisible();

  await page.getByRole('button', { name: 'Log out' }).click();
  await expect(page).toHaveURL(/\/admin\/login$/);
});

test('logging in with a wrong password shows an error and stays on the login page', async ({
  page,
}) => {
  await page.goto('/admin/login');
  await dismissConsentBannerIfPresent(page);

  await page.getByLabel('Username').fill(USERNAME);
  await page.getByLabel('Password').fill('definitely-wrong-password');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.getByText('Invalid username or password.')).toBeVisible();
  await expect(page).toHaveURL(/\/admin\/login$/);
});
