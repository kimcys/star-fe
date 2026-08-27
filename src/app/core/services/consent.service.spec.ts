import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ConsentService } from './consent.service';
import { API_BASE_URL } from '../config/api.config';

describe('ConsentService', () => {
  let service: ConsentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ConsentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('sets showBanner from the status endpoint', async () => {
    const promise = service.refreshStatus();
    httpMock
      .expectOne(`${API_BASE_URL}/api/consent-status.php`)
      .flush({ success: true, shouldShowBanner: true });
    await promise;
    expect(service.showBanner()).toBe(true);
    expect(service.checked()).toBe(true);
  });

  it('hides the banner if the status check fails', async () => {
    const promise = service.refreshStatus();
    httpMock
      .expectOne(`${API_BASE_URL}/api/consent-status.php`)
      .flush('boom', { status: 500, statusText: 'Server Error' });
    await promise;
    expect(service.showBanner()).toBe(false);
    expect(service.checked()).toBe(true);
  });

  it('accept posts the decision and hides the banner', async () => {
    const promise = service.accept();
    httpMock
      .expectOne(`${API_BASE_URL}/consent-handler.php`)
      .flush({ success: true, action: 'accept' });
    await promise;
    expect(service.showBanner()).toBe(false);
  });

  it('decline posts the decision and hides the banner', async () => {
    const promise = service.decline();
    httpMock
      .expectOne(`${API_BASE_URL}/consent-handler.php`)
      .flush({ success: true, action: 'decline' });
    await promise;
    expect(service.showBanner()).toBe(false);
  });
});
