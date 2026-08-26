import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { AdminLoginResponse, AdminSession } from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly _session = signal<AdminSession>({ loggedIn: false });
  readonly session = this._session.asReadonly();

  constructor(private readonly http: HttpClient) {}

  async ensureCsrfCookie(): Promise<void> {
    await firstValueFrom(
      this.http.get<{ success: boolean }>(`${API_BASE_URL}/api/csrf-cookie.php`),
    );
  }

  async fetchSession(): Promise<AdminSession> {
    const res = await firstValueFrom(
      this.http.get<AdminSession>(`${API_BASE_URL}/api/admin/me.php`),
    );
    this._session.set(res);
    return res;
  }

  async login(username: string, password: string): Promise<AdminLoginResponse> {
    await this.ensureCsrfCookie();
    try {
      const res = await firstValueFrom(
        this.http.post<AdminLoginResponse>(`${API_BASE_URL}/api/admin/login.php`, {
          username,
          password,
        }),
      );
      this._session.set({ loggedIn: true, username: res.username });
      return res;
    } catch (err) {
      if (err instanceof HttpErrorResponse && err.error?.error) {
        return { success: false, error: err.error.error };
      }
      return { success: false, error: 'Unable to log in right now. Please try again.' };
    }
  }

  async logout(): Promise<void> {
    await this.ensureCsrfCookie();
    await firstValueFrom(this.http.post(`${API_BASE_URL}/api/admin/logout.php`, {}));
    this._session.set({ loggedIn: false });
  }
}
