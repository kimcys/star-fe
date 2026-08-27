import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ConsentLogsService } from './consent-logs.service';
import { API_BASE_URL } from '../config/api.config';

describe('ConsentLogsService', () => {
  let service: ConsentLogsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ConsentLogsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('returns the logs array from the response', async () => {
    const promise = service.list();
    httpMock.expectOne(`${API_BASE_URL}/api/admin/consent-logs.php`).flush({
      success: true,
      logs: [
        {
          guid: 'a',
          consent_status: 'accepted',
          consent_version: 1,
          consented_at: '2026-08-20',
          ip_address: '1.1.1.1',
          created_at: '2026-08-20',
        },
      ],
    });
    const logs = await promise;
    expect(logs.length).toBe(1);
    expect(logs[0].guid).toBe('a');
  });
});
