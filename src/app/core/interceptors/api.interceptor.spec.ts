import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, defer, firstValueFrom, of, throwError } from 'rxjs';
import { apiInterceptor } from './api.interceptor';
import { API_BASE_URL } from '../config/api.config';

function clearCookies(): void {
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (name) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  });
}

// Test doubles only ever need to satisfy the shape HttpHandlerFn is
// called with, not literally return an HttpEvent - this one cast (in
// one place, spelled out, never a bare `any`) says so.
function asHandler(fn: (req: HttpRequest<unknown>) => Observable<unknown>): HttpHandlerFn {
  return fn as unknown as HttpHandlerFn;
}

describe('apiInterceptor', () => {
  afterEach(() => {
    clearCookies();
  });

  it('passes non-API requests through unchanged', () => {
    const req = new HttpRequest('GET', 'https://example.com/data');
    const nextMock = vi.fn((r: HttpRequest<unknown>) => of(r));
    apiInterceptor(req, asHandler(nextMock));
    expect(nextMock).toHaveBeenCalledWith(req);
  });

  it('adds withCredentials to API requests', () => {
    const req = new HttpRequest('GET', `${API_BASE_URL}/api/consent-status.php`);
    const nextMock = vi.fn((r: HttpRequest<unknown>) => of(r));
    apiInterceptor(req, asHandler(nextMock));
    const forwarded = nextMock.mock.calls[0][0];
    expect(forwarded.withCredentials).toBe(true);
  });

  it('does not attach an XSRF header to safe methods even if a token cookie exists', () => {
    document.cookie = 'XSRF-TOKEN=abc123';
    const req = new HttpRequest('GET', `${API_BASE_URL}/api/consent-status.php`);
    const nextMock = vi.fn((r: HttpRequest<unknown>) => of(r));
    apiInterceptor(req, asHandler(nextMock));
    const forwarded = nextMock.mock.calls[0][0];
    expect(forwarded.headers.has('X-XSRF-TOKEN')).toBe(false);
  });

  it('attaches the XSRF header from the cookie on unsafe methods', () => {
    document.cookie = 'XSRF-TOKEN=abc123';
    const req = new HttpRequest('POST', `${API_BASE_URL}/consent-handler.php`, {
      action: 'accept',
    });
    const nextMock = vi.fn((r: HttpRequest<unknown>) => of(r));
    apiInterceptor(req, asHandler(nextMock));
    const forwarded = nextMock.mock.calls[0][0];
    expect(forwarded.headers.get('X-XSRF-TOKEN')).toBe('abc123');
  });

  it('does not attach an XSRF header on unsafe methods when no cookie is present', () => {
    const req = new HttpRequest('POST', `${API_BASE_URL}/consent-handler.php`, {
      action: 'accept',
    });
    const nextMock = vi.fn((r: HttpRequest<unknown>) => of(r));
    apiInterceptor(req, asHandler(nextMock));
    const forwarded = nextMock.mock.calls[0][0];
    expect(forwarded.headers.has('X-XSRF-TOKEN')).toBe(false);
  });

  it('retries a failing GET request and resolves once it eventually succeeds', async () => {
    const req = new HttpRequest('GET', `${API_BASE_URL}/api/consent-status.php`);
    let attempts = 0;
    // defer() re-runs its factory on every subscription, so each retry's
    // resubscribe genuinely counts as a new attempt - just like a real
    // HTTP backend issuing a fresh request each time it's subscribed to.
    const next = asHandler((r) =>
      defer(() => {
        attempts++;
        return attempts < 3 ? throwError(() => new Error('network down')) : of(r);
      }),
    );

    await firstValueFrom(apiInterceptor(req, next) as Observable<HttpEvent<unknown>>);

    expect(attempts).toBe(3);
  });

  it('gives up after the max retry count for a GET that never succeeds', async () => {
    const req = new HttpRequest('GET', `${API_BASE_URL}/api/consent-status.php`);
    let attempts = 0;
    const next = asHandler(() =>
      defer(() => {
        attempts++;
        return throwError(() => new Error('network down'));
      }),
    );

    await expect(
      firstValueFrom(apiInterceptor(req, next) as Observable<HttpEvent<unknown>>),
    ).rejects.toThrow('network down');
    expect(attempts).toBe(3); // initial attempt + 2 retries
  });

  it('does not retry a failing POST request', async () => {
    const req = new HttpRequest('POST', `${API_BASE_URL}/consent-handler.php`, {
      action: 'accept',
    });
    let attempts = 0;
    const next = asHandler(() => {
      attempts++;
      return throwError(() => new Error('network down'));
    });

    await expect(
      firstValueFrom(apiInterceptor(req, next) as Observable<HttpEvent<unknown>>),
    ).rejects.toThrow('network down');
    expect(attempts).toBe(1);
  });
});
