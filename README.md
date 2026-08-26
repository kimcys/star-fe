# Star Media Group — Frontend (star-fe)

Angular 22 + Tailwind CSS v4 frontend for the practical assessment. A
4-page public site (Home, About Us / Contact Us, Privacy Policy, Terms &
Conditions) with a blocking cookie-consent banner, plus a bonus admin
portal to view submitted consent decisions. Consumes the JSON API in the
sibling [`star-be`](../star-be) repo.

## Status

- ✅ 4 public pages, all sharing a common `ShellComponent` layout
  (navbar + footer)
- ✅ Mobile-responsive navbar with a hamburger menu on small screens
- ✅ Blocking cookie-consent banner (`ConsentBannerComponent`) — locks
  page scroll until accepted/declined, links to Terms & Conditions and
  Privacy Policy, re-checked via the backend on every load since the
  real consent cookies are httponly
- ✅ Admin login + dashboard (route-guarded), listing consent records
  from the backend
- ✅ Built from small reusable components (`app-button`, `app-card`,
  `app-page-hero`, `app-legal-sections`, `app-form-field`, `app-alert`,
  `app-badge`, `app-spinner`, `app-table`) shared across pages instead
  of duplicating markup

## Requirements

- Node.js 20+ and npm
- The `star-be` backend running and reachable (see its README) —
  either via `docker compose up -d --build` in `../star-be`, or the
  manual PHP/MySQL setup described there

## Local setup

```bash
npm install
npm start        # ng serve, http://localhost:4200
```

### Backend URL

The API base URL is a single constant:
[`src/app/core/config/api.config.ts`](src/app/core/config/api.config.ts).
It defaults to `http://localhost:8000`, matching the backend's
`CORS_ALLOWED_ORIGIN=http://localhost:4200` default.

> **Important:** use `http://localhost:8000`, not `http://127.0.0.1:8000`,
> even though both reach the same server. The backend's session, CSRF,
> and consent cookies are all `SameSite=Lax`. Because `localhost` and
> `127.0.0.1` are treated as different sites for `SameSite` purposes,
> calling the `127.0.0.1` URL from a page served at `localhost:4200`
> means the browser will set those cookies but silently refuse to send
> them back on the next request — the consent banner would then
> reappear on every reload even after accepting. Keeping both frontend
> and backend on the `localhost` host keeps them same-site.

## Building

```bash
npm run build     # outputs to dist/star-fe
```

## Running unit tests

```bash
npm test          # Vitest
```

## Project structure

```
src/app/
  core/            # config, services (ConsentService, AdminAuthService,
                    # ConsentLogsService), the API interceptor, the
                    # admin route guard, and shared models
  shared/components/  # reusable, presentation-only UI building blocks
  layout/          # ShellComponent (public site) and AdminShellComponent
  pages/           # one folder per routed page
```

Routing (`app.routes.ts`) lazy-loads every page with `loadComponent`.
