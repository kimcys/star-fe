import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AdminShellComponent } from './admin-shell';
import { AdminAuthService } from '../../core/services/admin-auth.service';

class FakeAdminAuthService {
  readonly session = signal<{ loggedIn: boolean; username?: string }>({
    loggedIn: true,
    username: 'admin',
  });
  logout = vi.fn().mockResolvedValue(undefined);
}

describe('AdminShellComponent', () => {
  let fakeAuth: FakeAdminAuthService;

  beforeEach(async () => {
    fakeAuth = new FakeAdminAuthService();
    await TestBed.configureTestingModule({
      imports: [AdminShellComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AdminAuthService, useValue: fakeAuth },
      ],
    }).compileComponents();
  });

  it('shows the username and a log out control when logged in', () => {
    const fixture = TestBed.createComponent(AdminShellComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('admin');
    expect(fixture.nativeElement.textContent).toContain('Log out');
  });

  it('hides the session controls when logged out', () => {
    fakeAuth.session.set({ loggedIn: false });
    const fixture = TestBed.createComponent(AdminShellComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('Log out');
  });

  it('calls logout and navigates to the login page', async () => {
    const fixture = TestBed.createComponent(AdminShellComponent);
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    await fixture.componentInstance.logout();

    expect(fakeAuth.logout).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/login']);
  });
});
