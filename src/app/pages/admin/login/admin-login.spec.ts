import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AdminLoginComponent } from './admin-login';
import { API_BASE_URL } from '../../../core/config/api.config';

// submit() chains a csrf-cookie GET then a login POST via nested awaits;
// flushing the first only resolves on the next microtask, so a tick is
// needed before the second request has actually been dispatched.
function tick(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe('AdminLoginComponent', () => {
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLoginComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('shows a validation error and makes no request when fields are empty', async () => {
    const fixture = TestBed.createComponent(AdminLoginComponent);
    fixture.detectChanges();
    await fixture.componentInstance.submit();
    expect(fixture.componentInstance.errorMessage()).toContain('Please enter both');
  });

  it('navigates to the dashboard on a successful login', async () => {
    const fixture = TestBed.createComponent(AdminLoginComponent);
    fixture.componentInstance.username.set('admin');
    fixture.componentInstance.password.set('secret123');
    fixture.detectChanges();

    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    const submitPromise = fixture.componentInstance.submit();
    httpMock.expectOne(`${API_BASE_URL}/api/csrf-cookie.php`).flush({ success: true });
    await tick();
    httpMock
      .expectOne(`${API_BASE_URL}/api/admin/login.php`)
      .flush({ success: true, username: 'admin' });
    await submitPromise;

    expect(navigateSpy).toHaveBeenCalledWith(['/admin/dashboard']);
  });

  it('shows the server error message on a failed login', async () => {
    const fixture = TestBed.createComponent(AdminLoginComponent);
    fixture.componentInstance.username.set('admin');
    fixture.componentInstance.password.set('wrong');
    fixture.detectChanges();

    const submitPromise = fixture.componentInstance.submit();
    httpMock.expectOne(`${API_BASE_URL}/api/csrf-cookie.php`).flush({ success: true });
    await tick();
    httpMock
      .expectOne(`${API_BASE_URL}/api/admin/login.php`)
      .flush({ error: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });
    await submitPromise;

    expect(fixture.componentInstance.errorMessage()).toBe('Invalid credentials');
  });
});
