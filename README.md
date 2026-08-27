# Star Media Group — Frontend (star-fe)

Angular 22 + Tailwind CSS v4 frontend for the practical assessment. A
4-page public site (Home, About, Privacy Policy, Terms & Conditions)
with a blocking cookie-consent banner, plus a bonus admin portal to
view submitted consent decisions. Consumes the JSON API in the sibling
[`star-be`](../star-be) repo.

## Status

- ✅ 4 public pages, all sharing a common `ShellComponent` layout
  (navbar + footer)
- ✅ Mobile-responsive navbar with a hamburger menu on small screens
- ✅ Blocking cookie-consent banner (`ConsentBannerComponent`) — locks
  page scroll until accepted/declined, links to Terms & Conditions and
  Privacy Policy, re-checked via the backend on every load since the
  real consent cookies are httponly
- ✅ Admin login + dashboard (route-guarded), listing consent records
  from the backend — restyled to match the public site's design system
  (shared topbar, logo, and stat tiles, not a separate look)
- ✅ Apple-inspired design system (see [Design system](#design-system)
  below) — flat borderless surfaces, pill buttons, an 8-step type
  scale, all as Tailwind v4 `@theme` tokens, with the Star Media Group
  brand red as the single accent colour instead of Apple's blue
- ✅ Dark mode (see [Dark mode](#dark-mode) below) — a toggle in the
  navbar and admin topbar, system-preference-aware, persisted across
  visits, covering every page including the admin portal
- ✅ Real Star Media Group branding — the actual logo asset
  (`public/star-logo.png` / a cropped wordmark `star-logo-mark.png`)
  and copy adapted from [starmediagroup.my](https://www.starmediagroup.my)
  across Home, About, Privacy Policy, and Terms & Conditions (company
  profile, brand portfolio, real office address/phone/email/hours)
- ✅ Embedded map of the office location (Menara Star) on the About
  page, via OpenStreetMap — no API key or billing required, works
  out of the box
- ✅ Built from small, reusable, presentation-only components —
  `app-button`, `app-card`, `app-page-hero`, `app-legal-sections`,
  `app-form-field`, `app-alert`, `app-input`, `app-spinner`,
  `app-table`, `app-pagination`, `app-logo`, `app-topbar`,
  `app-section-header`, `app-stat-tile`, `app-theme-toggle` — plus two
  shared data sources (`shared/nav-links.ts`, `shared/site-info.ts`)
  so things like the nav links or office address exist in exactly one
  place
- ✅ Every component template is a linked `.html` file (`templateUrl`)
  — no inline templates anywhere in the app
- ✅ Full unit test coverage — a co-located `*.spec.ts` next to every
  component, page, layout, service, guard, and interceptor (33 spec
  files, 89 tests) using Vitest + jsdom via Angular's built-in test
  runner

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

### Map

The About page (`src/app/pages/about/about.ts`) embeds the office
location via **OpenStreetMap's** free embed (`openstreetmap.org/export/embed.html`)
— just a bounding box and a marker built from the office's coordinates
(`OFFICE_LAT`/`OFFICE_LON` in `src/app/shared/site-info.ts`, geocoded
via Nominatim). No API key, account, or billing needed, so it renders
correctly with zero setup.

## Building

```bash
npm run build     # outputs to dist/star-fe
```

### Docker

A `Dockerfile` builds the production bundle (Node) and serves the
static `dist/star-fe/browser` output via nginx, with `nginx.conf`
handling the Angular Router's client-side routes (any path that isn't
a real file falls back to `index.html`, so a hard refresh on `/about`
or `/admin/dashboard` works instead of 404ing).

Standalone:

```bash
docker build -t star-fe-web .
docker run -p 4200:80 star-fe-web
```

Or as part of the whole stack — `star-be`'s `docker-compose.yml`
includes this as a third `web` service (context: `../star-fe`), so
from `../star-be`:

```bash
docker compose up -d --build
```

brings up the backend, database, *and* frontend together, all on
their existing ports (`4200` for the frontend, matching
`CORS_ALLOWED_ORIGIN=http://localhost:4200` and `ng serve`'s default —
API calls from the browser work unchanged either way). Stop your local
`npm start` first if it's already bound to `4200`.

## Running unit tests

```bash
npm test                        # ng test — watch mode in an interactive terminal
npx ng test --watch=false       # single run, e.g. for CI
npx ng test --coverage          # with a coverage report
npx ng test --filter="Button"   # only tests matching a name pattern
```

Uses Angular's built-in Vitest-based unit-test builder
(`@angular/build:unit-test`) with a jsdom environment — no separate
`vitest.config.ts` needed. Every `*.spec.ts` under `src/` is picked up
automatically; new components should get one alongside them following
the existing pattern (standalone `TestBed.configureTestingModule`,
`provideRouter([])` when `RouterLink` is involved,
`provideHttpClient()` + `provideHttpClientTesting()` /
`HttpTestingController` for anything backend-backed).

## Design system

The visual language (colours, type scale, spacing, radii) lives as
Tailwind v4 `@theme` tokens in [`src/styles.css`](src/styles.css) —
an Apple-product-page-inspired system (flat, borderless, pill buttons,
generous whitespace) documented in `design.md` at the repo root, with
one deliberate deviation: the numeric `--spacing-*` overrides from
that spec were **not** imported, since they redefine Tailwind's
default spacing scale keys (e.g. `p-4` would silently drop from 16px
to 4px) and would have changed spacing on every page, not just the
ones using the new tokens. Existing Tailwind spacing numbers already
land on the same pixel values (e.g. `p-7` = 28px).

The one brand-specific override: primary actions use
`--color-brand-red` (`#DA2128`, sampled directly from
`public/star-logo.png`) rather than Apple's blue, since this is Star
Media Group's own masthead colour.

## Dark mode

Because every colour is already a semantic `@theme` token, dark mode
is a single override block in `src/styles.css`:

```css
.dark {
  --color-primary-ink: #f5f5f7;
  --color-paper: #000000;
  /* ...and so on for every other semantic token */
}
```

`ThemeService` (`core/services/theme.service.ts`) toggles a `dark`
class on `<html>` — nothing else needs to know dark mode exists, since
every `bg-canvas` / `text-primary-ink` / etc. utility already resolves
through these custom properties. The one exception is
`--color-ink-fixed`, used only by the home page's hero band: that
section is *meant* to stay a fixed dark colour regardless of theme
(an intentional Apple-style dark accent band, not the page background),
so it deliberately isn't overridden in `.dark`.

- **Toggle**: the sun/moon button in the navbar (public site) and the
  admin topbar — both routes share the same toggle and the same
  persisted preference.
- **Persistence**: `localStorage` (`star-media-theme`); on first visit
  with no stored preference, it falls back to the OS/browser's
  `prefers-color-scheme`.
- **Status/error colours**: `alert`, the button's `danger` variant, and
  form-field error text use their own named tokens
  (`--color-danger`, `--color-success`, ...) instead of raw Tailwind
  `red-*`/`green-*` classes, specifically so they also get a dark-mode
  definition rather than being invisible/illegible on a black surface.
- **Logo**: a second asset, `public/star-logo-mark-dark.png` (same red
  "Star" wordmark, the "MEDIA GROUP" subtext recoloured light grey),
  swapped in by `app-logo` based on `ThemeService.theme()` — the
  original dark-gray-on-transparent version has poor contrast on a
  black background.

> **If you add a new component:** style it with the semantic tokens
> (`bg-paper`, `text-primary-ink`, `border-hairline`, ...) rather than
> Tailwind's raw palette (`bg-white`, `text-red-600`, ...) — that's
> what makes it dark-mode-aware for free. `ShellComponent`'s wrapper
> div originally had a hardcoded `bg-white` that stayed white in dark
> mode until it was caught and switched to `bg-paper`; that's the
> failure mode to avoid.

### Testing dark mode

`ThemeService` reads/writes real `localStorage` and toggles a real
class on `document.documentElement`. Because this project's spec files
all share one process (`isolate: false`, the Vitest default here), a
test that leaves the theme toggled would otherwise leak into every
spec file that runs after it. `src/test-setup.ts` — registered via
`architect.test.options.setupFiles` in `angular.json` — resets both
after every single test, project-wide.

## Project structure

```
src/
  test-setup.ts        # global Vitest setup (resets localStorage / the
                        # <html> "dark" class after every test)
  app/
    core/            # config, services (ConsentService, AdminAuthService,
                      # ConsentLogsService, ThemeService), the API
                      # interceptor, the admin route guard, and shared models
    shared/
      nav-links.ts       # single source of the 4 public nav links
      site-info.ts       # single source of office address/phone/email/
                          # hours and the legal "last updated" date
      components/        # reusable, presentation-only UI building blocks
    layout/          # ShellComponent (public site) and AdminShellComponent
    pages/           # one folder per routed page
```

Routing (`app.routes.ts`) lazy-loads every page with `loadComponent`.
Every component template is a linked `.html` file next to its `.ts`
(no inline `template:` strings), and every component/service/guard/
interceptor has a co-located `.spec.ts`.
