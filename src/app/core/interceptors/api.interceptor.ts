import { HttpInterceptorFn } from '@angular/common/http';
import { retry, timeout, timer } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

// Only GET/HEAD are safe to retry automatically - retrying a POST whose
// response was merely lost (not its request) could double-submit an
// accept/decline decision or a login attempt.
const RETRYABLE_METHODS = new Set(['GET', 'HEAD']);

const REQUEST_TIMEOUT_MS = 8_000;
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 500;

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(API_BASE_URL)) {
    return next(req);
  }

  let apiReq = req.clone({ withCredentials: true });

  if (!SAFE_METHODS.has(req.method)) {
    const xsrfToken = readCookie('XSRF-TOKEN');
    if (xsrfToken) {
      apiReq = apiReq.clone({ setHeaders: { 'X-XSRF-TOKEN': xsrfToken } });
    }
  }

  const response$ = next(apiReq).pipe(timeout(REQUEST_TIMEOUT_MS));

  if (!RETRYABLE_METHODS.has(req.method)) {
    return response$;
  }

  return response$.pipe(
    retry({
      count: MAX_RETRIES,
      delay: (_error, retryAttempt) => timer(retryAttempt * RETRY_DELAY_MS),
    }),
  );
};
