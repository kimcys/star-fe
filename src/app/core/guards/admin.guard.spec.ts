import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { adminGuard, adminLoginGuard } from './admin.guard';
import { API_BASE_URL } from '../config/api.config';

describe('admin guards', () => {
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('adminGuard', () => {
    it('allows access when the session is logged in', async () => {
      const resultPromise = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));
      httpMock.expectOne(`${API_BASE_URL}/api/admin/me.php`).flush({ loggedIn: true });
      expect(await resultPromise).toBe(true);
    });

    it('redirects to /admin/login when not logged in', async () => {
      const resultPromise = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));
      httpMock.expectOne(`${API_BASE_URL}/api/admin/me.php`).flush({ loggedIn: false });
      const result = (await resultPromise) as UrlTree;
      expect(router.serializeUrl(result)).toBe('/admin/login');
    });

    it('redirects to /admin/login when the session check errors', async () => {
      const resultPromise = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));
      httpMock
        .expectOne(`${API_BASE_URL}/api/admin/me.php`)
        .flush('boom', { status: 500, statusText: 'Server Error' });
      const result = (await resultPromise) as UrlTree;
      expect(router.serializeUrl(result)).toBe('/admin/login');
    });
  });

  describe('adminLoginGuard', () => {
    it('redirects to the dashboard when already logged in', async () => {
      const resultPromise = TestBed.runInInjectionContext(() =>
        adminLoginGuard({} as any, {} as any),
      );
      httpMock.expectOne(`${API_BASE_URL}/api/admin/me.php`).flush({ loggedIn: true });
      const result = (await resultPromise) as UrlTree;
      expect(router.serializeUrl(result)).toBe('/admin/dashboard');
    });

    it('allows access to the login page when not logged in', async () => {
      const resultPromise = TestBed.runInInjectionContext(() =>
        adminLoginGuard({} as any, {} as any),
      );
      httpMock.expectOne(`${API_BASE_URL}/api/admin/me.php`).flush({ loggedIn: false });
      expect(await resultPromise).toBe(true);
    });
  });
});
