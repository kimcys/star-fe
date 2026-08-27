import { environment } from '../../../environments/environment';

// Must be same-site (not just same-machine) with the Angular dev origin
// (http://localhost:4200) - the backend's session/consent/CSRF cookies are
// SameSite=Lax, which Chrome will not send back on XHR/fetch requests to a
// different hostname (127.0.0.1 vs localhost count as cross-site) even
// though they resolve to the same server.
export const API_BASE_URL = environment.apiBaseUrl;
