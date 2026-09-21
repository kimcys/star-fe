import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ConsentBannerComponent, HIDE_CONSENT_BANNER_ROUTE_DATA_KEY } from './consent-banner';
import { API_BASE_URL } from '../../../core/config/api.config';

@Component({ template: '', standalone: true })
class BlankComponent {}

// The constructor's fire-and-forget `refreshStatus()` call, and the
// (click)-triggered accept()/decline() calls, resolve a signal after an
// `await` inside a plain async method the test has no promise handle
// for — a tick lets that microtask run before we inspect the DOM.
function tick(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe('ConsentBannerComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsentBannerComponent],
      providers: [
        provideRouter([
          { path: '', component: BlankComponent },
          {
            path: 'terms-conditions',
            component: BlankComponent,
            data: { [HIDE_CONSENT_BANNER_ROUTE_DATA_KEY]: true },
          },
        ]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    document.documentElement.classList.remove('overflow-hidden');
    document.body.classList.remove('overflow-hidden');
    httpMock.verify();
  });

  it('shows the banner and locks scroll once the status check resolves true', async () => {
    const fixture = TestBed.createComponent(ConsentBannerComponent);
    fixture.detectChanges();
    httpMock
      .expectOne(`${API_BASE_URL}/api/consent-status.php`)
      .flush({ success: true, shouldShowBanner: true });
    await tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();
    expect(document.body.classList.contains('overflow-hidden')).toBe(true);
  });

  it('stays hidden and leaves scroll unlocked when the status check resolves false', async () => {
    const fixture = TestBed.createComponent(ConsentBannerComponent);
    fixture.detectChanges();
    httpMock
      .expectOne(`${API_BASE_URL}/api/consent-status.php`)
      .flush({ success: true, shouldShowBanner: false });
    await tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
    expect(document.body.classList.contains('overflow-hidden')).toBe(false);
  });

  it('hides the banner and posts an accept decision when Accept is clicked', async () => {
    const fixture = TestBed.createComponent(ConsentBannerComponent);
    fixture.detectChanges();
    httpMock
      .expectOne(`${API_BASE_URL}/api/consent-status.php`)
      .flush({ success: true, shouldShowBanner: true });
    await tick();
    fixture.detectChanges();

    const acceptButton = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('button'),
    ).find((b) => b.textContent?.includes('Accept'))!;
    acceptButton.click();

    httpMock
      .expectOne(`${API_BASE_URL}/consent-handler.php`)
      .flush({ success: true, action: 'accept' });
    await tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });

  it('stays hidden on a route flagged with hideConsentBanner even when the status check resolves true', async () => {
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/terms-conditions');

    const fixture = TestBed.createComponent(ConsentBannerComponent);
    fixture.detectChanges();
    httpMock
      .expectOne(`${API_BASE_URL}/api/consent-status.php`)
      .flush({ success: true, shouldShowBanner: true });
    await tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
    expect(document.body.classList.contains('overflow-hidden')).toBe(false);
  });

  it('reappears after navigating away from a hideConsentBanner route, still with no decision recorded', async () => {
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/terms-conditions');

    const fixture = TestBed.createComponent(ConsentBannerComponent);
    fixture.detectChanges();
    httpMock
      .expectOne(`${API_BASE_URL}/api/consent-status.php`)
      .flush({ success: true, shouldShowBanner: true });
    await tick();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();

    await router.navigateByUrl('/');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it('shows a non-blocking notice, without locking scroll, when the status check is unreachable', async () => {
    const fixture = TestBed.createComponent(ConsentBannerComponent);
    fixture.detectChanges();
    httpMock
      .expectOne(`${API_BASE_URL}/api/consent-status.php`)
      .flush('boom', { status: 500, statusText: 'Server Error' });
    await tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
    expect(document.body.classList.contains('overflow-hidden')).toBe(false);
  });

  it('hides the banner and posts a decline decision when Decline is clicked', async () => {
    const fixture = TestBed.createComponent(ConsentBannerComponent);
    fixture.detectChanges();
    httpMock
      .expectOne(`${API_BASE_URL}/api/consent-status.php`)
      .flush({ success: true, shouldShowBanner: true });
    await tick();
    fixture.detectChanges();

    const declineButton = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('button'),
    ).find((b) => b.textContent?.includes('Decline'))!;
    declineButton.click();

    httpMock
      .expectOne(`${API_BASE_URL}/consent-handler.php`)
      .flush({ success: true, action: 'decline' });
    await tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });
});
