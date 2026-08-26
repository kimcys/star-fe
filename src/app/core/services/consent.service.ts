import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { ConsentActionResponse, ConsentStatusResponse } from '../models/consent.model';

@Injectable({ providedIn: 'root' })
export class ConsentService {
  private readonly _showBanner = signal(false);
  private readonly _checked = signal(false);

  readonly showBanner = this._showBanner.asReadonly();
  readonly checked = this._checked.asReadonly();

  constructor(private readonly http: HttpClient) {}

  async refreshStatus(): Promise<void> {
    try {
      const res = await firstValueFrom(
        this.http.get<ConsentStatusResponse>(`${API_BASE_URL}/api/consent-status.php`),
      );
      this._showBanner.set(res.shouldShowBanner);
    } catch {
      this._showBanner.set(false);
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
