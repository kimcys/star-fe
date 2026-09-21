/**
 * Production build values, swapped in for environment.ts via the
 * `fileReplacements` entry in angular.json's production configuration.
 *
 * This exact file gets overwritten at Docker build time (see the
 * Dockerfile's ARG API_BASE_URL) with whatever URL that specific image
 * actually needs - the real production deploy uses
 * https://api.aimanhakimcy.com, while the local docker-compose stack
 * uses the default below unchanged. The value committed here only
 * matters if someone runs `ng build --configuration production`
 * directly, outside Docker - localhost:8000 matches the local
 * docker-compose backend's published port for that case.
 */
export const environment = {
  apiBaseUrl: 'http://localhost:8000',
};
