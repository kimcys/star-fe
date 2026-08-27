/**
 * Production build values, swapped in for environment.ts via the
 * `fileReplacements` entry in angular.json's production configuration.
 *
 * apiBaseUrl matches environment.ts - this project's Docker setup
 * serves the SPA (nginx, this build) and the PHP API as two separate
 * origins (:4200 and :8000), with no reverse proxy between them (see
 * nginx.conf), so the frontend must call the API's full URL rather
 * than a same-origin relative path. Override this if the API is ever
 * actually served from the same origin as the SPA.
 */
export const environment = {
  apiBaseUrl: 'http://localhost:8000',
};
