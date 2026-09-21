import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { ConsentActionResponse, ConsentStatusResponse } from '../models/consent.model';

@Injectable({ providedIn: 'root' })
export class ConsentService {
  private readonly _showBanner = signal(false);
  private readonly _checked = signal(false);
  private readonly _unreachable = signal(false);

  readonly showBanner = this._showBanner.asReadonly();
  readonly checked = this._checked.asReadonly();

  /**
   * True when the last status check failed even after the HTTP
   * interceptor's automatic retries - e.g. the backend is down or very
   * slow. Deliberately does NOT force showBanner to false in that case:
   * the previous known state (if any) is kept as-is, and the UI can use
   * this flag to show a small "couldn't verify" notice instead of
   * silently pretending consent was already handled.
   */
  readonly unreachable = this._unreachable.asReadonly();

  constructor(private readonly http: HttpClient) {}

  async refreshStatus(): Promise<void> {
    try {
      const res = await firstValueFrom(
        this.http.get<ConsentStatusResponse>(`${API_BASE_URL}/api/consent-status.php`),
      );
      this._showBanner.set(res.shouldShowBanner);
      this._unreachable.set(false);
    } catch {
      this._unreachable.set(true);
    } finally {
      this._checked.set(true);
    }
  }

  async accept(): Promise<void> {
    await firstValueFrom(
      this.http.post<ConsentActionResponse>(`${API_BASE_URL}/consent-handler.php`, {
        action: 'accept',
      }),
    );
    this._showBanner.set(false);
  }

  async decline(): Promise<void> {
    await firstValueFrom(
      this.http.post<ConsentActionResponse>(`${API_BASE_URL}/consent-handler.php`, {
        action: 'decline',
      }),
    );
    this._showBanner.set(false);
  }
}
