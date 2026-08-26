import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { ConsentLog } from '../models/consent.model';

interface ConsentLogsResponse {
  success: boolean;
  logs: ConsentLog[];
}

@Injectable({ providedIn: 'root' })
export class ConsentLogsService {
  constructor(private readonly http: HttpClient) {}

  async list(): Promise<ConsentLog[]> {
    const res = await firstValueFrom(
      this.http.get<ConsentLogsResponse>(`${API_BASE_URL}/api/admin/consent-logs.php`),
    );
    return res.logs;
  }
}
