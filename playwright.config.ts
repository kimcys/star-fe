import { defineConfig, devices } from '@playwright/test';

/**
 * Runs against the real Dockerized stack (star-be's docker-compose.yml
 * - frontend, PHP API, and MySQL together), not a mocked backend. This
 * app's whole point is the consent flow talking to a real API, so an
 * E2E suite that stubs the backend out wouldn't be testing much.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'html' : 'list',
  use: {
    // Must be `localhost`, not `127.0.0.1`: the backend's
    // CORS_ALLOWED_ORIGIN (docker-compose.yml) is set to
    // http://localhost:4200 exactly, and bootstrap.php only echoes
    // back Access-Control-Allow-Origin on an exact match - see both
    // READMEs' "localhost vs 127.0.0.1" callout.
    baseURL: 'http://localhost:4200',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // Playwright expects webServer.command to stay running (an early
    // exit - even a clean one - is treated as a startup failure), but
    // `docker compose up -d` detaches immediately once containers are
    // healthy. `tail -f /dev/null` at the end keeps this wrapper alive
    // without doing anything, once the actual setup is done; killing
    // it on teardown doesn't touch the detached containers.
    command:
      'cd ../star-be && docker compose up -d --build && ' +
      'docker compose exec -T app php bin/create_admin.php e2e-admin E2eTestPassword123 && ' +
      'tail -f /dev/null',
    url: 'http://localhost:4200',
    timeout: 180_000,
    reuseExistingServer: true,
  },
});
