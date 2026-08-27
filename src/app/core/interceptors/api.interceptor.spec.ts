import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';
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

describe('apiInterceptor', () => {
  afterEach(() => {
    clearCookies();
  });

  it('passes non-API requests through unchanged', () => {
    const req = new HttpRequest('GET', 'https://example.com/data');
    const next: HttpHandlerFn = vi.fn((r) => of(r)) as any;
    apiInterceptor(req, next);
    expect(next).toHaveBeenCalledWith(req);
  });

  it('adds withCredentials to API requests', () => {
    const req = new HttpRequest('GET', `${API_BASE_URL}/api/consent-status.php`);
    const next: HttpHandlerFn = vi.fn((r) => of(r)) as any;
    apiInterceptor(req, next);
    const forwarded = (next as any).mock.calls[0][0] as HttpRequest<unknown>;
    expect(forwarded.withCredentials).toBe(true);
  });

  it('does not attach an XSRF header to safe methods even if a token cookie exists', () => {
    document.cookie = 'XSRF-TOKEN=abc123';
    const req = new HttpRequest('GET', `${API_BASE_URL}/api/consent-status.php`);
    const next: HttpHandlerFn = vi.fn((r) => of(r)) as any;
    apiInterceptor(req, next);
    const forwarded = (next as any).mock.calls[0][0] as HttpRequest<unknown>;
    expect(forwarded.headers.has('X-XSRF-TOKEN')).toBe(false);
  });

  it('attaches the XSRF header from the cookie on unsafe methods', () => {
    document.cookie = 'XSRF-TOKEN=abc123';
    const req = new HttpRequest('POST', `${API_BASE_URL}/consent-handler.php`, { action: 'accept' });
    const next: HttpHandlerFn = vi.fn((r) => of(r)) as any;
    apiInterceptor(req, next);
    const forwarded = (next as any).mock.calls[0][0] as HttpRequest<unknown>;
    expect(forwarded.headers.get('X-XSRF-TOKEN')).toBe('abc123');
  });

  it('does not attach an XSRF header on unsafe methods when no cookie is present', () => {
    const req = new HttpRequest('POST', `${API_BASE_URL}/consent-handler.php`, { action: 'accept' });
    const next: HttpHandlerFn = vi.fn((r) => of(r)) as any;
    apiInterceptor(req, next);
    const forwarded = (next as any).mock.calls[0][0] as HttpRequest<unknown>;
    expect(forwarded.headers.has('X-XSRF-TOKEN')).toBe(false);
  });
});
