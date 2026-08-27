import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AdminAuthService } from './admin-auth.service';
import { API_BASE_URL } from '../config/api.config';

// `login`/`logout` chain two sequential HTTP calls (csrf-cookie, then the
// real request) via nested `await`s. Flushing the first request only
// resolves its Promise on the next microtask, so a synchronous
// `expectOne` for the second request right after `flush()` runs too
// early — this drains the microtask queue so the second request has
// actually been dispatched.
function tick(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe('AdminAuthService', () => {
  let service: AdminAuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AdminAuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('starts logged out', () => {
    expect(service.session()).toEqual({ loggedIn: false });
  });

  it('fetchSession updates the session signal', async () => {
    const promise = service.fetchSession();
    httpMock
      .expectOne(`${API_BASE_URL}/api/admin/me.php`)
      .flush({ loggedIn: true, username: 'admin' });
    await promise;
    expect(service.session()).toEqual({ loggedIn: true, username: 'admin' });
  });

  it('login fetches a CSRF cookie first, then posts credentials and updates the session on success', async () => {
    const promise = service.login('admin', 'secret123');
    httpMock.expectOne(`${API_BASE_URL}/api/csrf-cookie.php`).flush({ success: true });
    await tick();
    httpMock
      .expectOne(`${API_BASE_URL}/api/admin/login.php`)
      .flush({ success: true, username: 'admin' });

    const result = await promise;
    expect(result.success).toBe(true);
    expect(service.session()).toEqual({ loggedIn: true, username: 'admin' });
  });

  it('login returns the server error message on failure without changing the session', async () => {
    const promise = service.login('admin', 'wrong');
    httpMock.expectOne(`${API_BASE_URL}/api/csrf-cookie.php`).flush({ success: true });
    await tick();
    httpMock
      .expectOne(`${API_BASE_URL}/api/admin/login.php`)
      .flush(
        { error: 'Invalid username or password.' },
        { status: 401, statusText: 'Unauthorized' },
      );

    const result = await promise;
    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid username or password.');
    expect(service.session()).toEqual({ loggedIn: false });
  });

  it('logout fetches a CSRF cookie, posts, then clears the session', async () => {
    const promise = service.logout();
    httpMock.expectOne(`${API_BASE_URL}/api/csrf-cookie.php`).flush({ success: true });
    await tick();
    httpMock.expectOne(`${API_BASE_URL}/api/admin/logout.php`).flush({ success: true });
    await promise;
    expect(service.session()).toEqual({ loggedIn: false });
  });
});
