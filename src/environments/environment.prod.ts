/**
 * Production build values, swapped in for environment.ts via the
 * `fileReplacements` entry in angular.json's production configuration.
 *
 * apiBaseUrl is empty on purpose: the real production deployment (Caddy,
 * see deploy/Caddyfile) serves the SPA and the PHP API from the *same*
 * origin, splitting traffic by path (/api/*, /consent-handler.php,
 * /admin/*.php go to the backend, everything else to the SPA) - so API
 * calls should resolve relative to whatever origin the page itself was
 * loaded from, not a hardcoded host:port. `${API_BASE_URL}/api/...`
 * with an empty base just becomes `/api/...`, a same-origin request.
 */
export const environment = {
  apiBaseUrl: '',
};
