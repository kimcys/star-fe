import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AdminDashboardComponent } from './admin-dashboard';
import { API_BASE_URL } from '../../../core/config/api.config';
import { ConsentLog } from '../../../core/models/consent.model';

// The constructor's fire-and-forget `load()` chains two nested `await`s
// (load() -> consentLogs.list()) before setting the `logs` signal, so
// `fixture.whenStable()` isn't a reliable enough wait here — flushing a
// macrotask lets all pending microtasks drain first.
function tick(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

const LOGS: ConsentLog[] = [
  {
    guid: 'a',
    consent_status: 'accepted',
    consent_version: 1,
    consented_at: '2026-08-20',
    ip_address: '1.1.1.1',
    created_at: '2026-08-20',
  },
  {
    guid: 'b',
    consent_status: 'declined',
    consent_version: 1,
    consented_at: '2026-08-21',
    ip_address: '2.2.2.2',
    created_at: '2026-08-21',
  },
];

describe('AdminDashboardComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loads consent logs on creation and computes accepted/declined counts', async () => {
    const fixture = TestBed.createComponent(AdminDashboardComponent);
    fixture.detectChanges();
    httpMock
      .expectOne(`${API_BASE_URL}/api/admin/consent-logs.php`)
      .flush({ success: true, logs: LOGS });
    await tick();
    fixture.detectChanges();

    expect(fixture.componentInstance.logs().length).toBe(2);
    expect(fixture.componentInstance.acceptedCount()).toBe(1);
    expect(fixture.componentInstance.declinedCount()).toBe(1);
    expect(fixture.componentInstance.loading()).toBe(false);
  });

  it('filters logs by search term', async () => {
    const fixture = TestBed.createComponent(AdminDashboardComponent);
    fixture.detectChanges();
    httpMock
      .expectOne(`${API_BASE_URL}/api/admin/consent-logs.php`)
      .flush({ success: true, logs: LOGS });
    await tick();

    fixture.componentInstance.onSearchChange('2.2.2.2');
    expect(fixture.componentInstance.filteredLogs().length).toBe(1);
    expect(fixture.componentInstance.filteredLogs()[0].guid).toBe('b');
  });

  it('filters logs by status', async () => {
    const fixture = TestBed.createComponent(AdminDashboardComponent);
    fixture.detectChanges();
    httpMock
      .expectOne(`${API_BASE_URL}/api/admin/consent-logs.php`)
      .flush({ success: true, logs: LOGS });
    await tick();

    fixture.componentInstance.onStatusFilterChange('declined');
    expect(fixture.componentInstance.filteredLogs().length).toBe(1);
    expect(fixture.componentInstance.filteredLogs()[0].consent_status).toBe('declined');
  });

  it('shows an error message when loading fails', async () => {
    const fixture = TestBed.createComponent(AdminDashboardComponent);
    fixture.detectChanges();
    httpMock
      .expectOne(`${API_BASE_URL}/api/admin/consent-logs.php`)
      .flush('boom', { status: 500, statusText: 'Server Error' });
    await tick();

    expect(fixture.componentInstance.errorMessage()).toContain('Unable to load');
    expect(fixture.componentInstance.loading()).toBe(false);
  });
});
