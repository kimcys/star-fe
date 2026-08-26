import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  host: { class: 'block' },
  template: `
    @if (totalItems() > 0) {
      <div class="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p class="text-sm text-slate-500">
          Showing {{ rangeStart() }}–{{ rangeEnd() }} of {{ totalItems() }}
        </p>

        <div class="flex items-center gap-2">
          <button
            type="button"
            [disabled]="page() <= 1"
            (click)="pageChange.emit(page() - 1)"
            class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent"
          >
            Previous
          </button>
          <span class="px-2 text-sm text-slate-600">Page {{ page() }} of {{ totalPages() }}</span>
          <button
            type="button"
            [disabled]="page() >= totalPages()"
            (click)="pageChange.emit(page() + 1)"
            class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent"
          >
            Next
          </button>
        </div>
      </div>
    }
  `,
})
export class PaginationComponent {
  page = input.required<number>();
  totalItems = input.required<number>();
  pageSize = input.required<number>();

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.pageSize())));
  readonly rangeStart = computed(() => (this.page() - 1) * this.pageSize() + 1);
  readonly rangeEnd = computed(() => Math.min(this.page() * this.pageSize(), this.totalItems()));

  pageChange = output<number>();
}
