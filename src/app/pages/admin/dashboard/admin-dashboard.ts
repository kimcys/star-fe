import { Component, computed, signal } from '@angular/core';
import { ConsentLogsService } from '../../../core/services/consent-logs.service';
import { ConsentLog } from '../../../core/models/consent.model';
import { CardComponent } from '../../../shared/components/card/card';
import { TableColumn, TableComponent } from '../../../shared/components/table/table';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner';
import { AlertComponent } from '../../../shared/components/alert/alert';
import { InputComponent } from '../../../shared/components/input/input';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';

type StatusFilter = 'all' | 'accepted' | 'declined';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    CardComponent,
    TableComponent,
    SpinnerComponent,
    AlertComponent,
    InputComponent,
    PaginationComponent,
  ],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboardComponent {
  readonly logs = signal<ConsentLog[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal('');

  readonly searchTerm = signal('');
  readonly statusFilter = signal<StatusFilter>('all');
  readonly page = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly acceptedCount = computed(
    () => this.logs().filter((log) => log.consent_status === 'accepted').length,
  );
  readonly declinedCount = computed(
    () => this.logs().filter((log) => log.consent_status === 'declined').length,
  );

  readonly filteredLogs = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const status = this.statusFilter();

    return this.logs().filter((log) => {
      const matchesStatus = status === 'all' || log.consent_status === status;
      const matchesTerm =
        !term ||
        log.guid.toLowerCase().includes(term) ||
        (log.ip_address ?? '').toLowerCase().includes(term);
      return matchesStatus && matchesTerm;
    });
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredLogs().length / this.pageSize)),
  );

  readonly currentPage = computed(() => Math.min(Math.max(1, this.page()), this.totalPages()));

  readonly pagedLogs = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredLogs().slice(start, start + this.pageSize);
  });

  readonly columns: TableColumn<ConsentLog>[] = [
    { key: 'guid', header: 'GUID', cell: (row) => row.guid },
    { key: 'status', header: 'Status', cell: (row) => row.consent_status },
    { key: 'version', header: 'Version', cell: (row) => `v${row.consent_version}` },
    { key: 'consented_at', header: 'Consented At', cell: (row) => row.consented_at },
    { key: 'ip_address', header: 'IP Address', cell: (row) => row.ip_address ?? '—' },
  ];

  constructor(private readonly consentLogs: ConsentLogsService) {
    void this.load();
  }

  async load(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set('');
    try {
      this.logs.set(await this.consentLogs.list());
    } catch {
      this.errorMessage.set('Unable to load consent logs right now.');
    } finally {
      this.loading.set(false);
    }
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.page.set(1);
  }

  onStatusFilterChange(status: StatusFilter): void {
    this.statusFilter.set(status);
    this.page.set(1);
  }
}
