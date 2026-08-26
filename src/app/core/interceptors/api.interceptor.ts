import { HttpInterceptorFn } from '@angular/common/http';
import { API_BASE_URL } from '../config/api.config';

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

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

  return next(apiReq);
};
