import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  host: { class: 'block' },
  template: `
    @if (totalItems() > 0) {
      <div class="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p class="text-caption text-mid-gray">
          Showing {{ rangeStart() }}–{{ rangeEnd() }} of {{ totalItems() }}
        </p>

        <div class="flex items-center gap-2">
          <button
            type="button"
            [disabled]="page() <= 1"
            (click)="pageChange.emit(page() - 1)"
            class="rounded-full border border-primary-ink px-3 py-1.5 text-caption font-normal text-primary-ink transition-colors hover:bg-cool-wash disabled:cursor-not-allowed disabled:border-hairline disabled:text-quiet-dot disabled:hover:bg-transparent"
          >
            Previous
          </button>
          <span class="px-2 text-caption text-mid-gray">Page {{ page() }} of {{ totalPages() }}</span>
          <button
            type="button"
            [disabled]="page() >= totalPages()"
            (click)="pageChange.emit(page() + 1)"
            class="rounded-full border border-primary-ink px-3 py-1.5 text-caption font-normal text-primary-ink transition-colors hover:bg-cool-wash disabled:cursor-not-allowed disabled:border-hairline disabled:text-quiet-dot disabled:hover:bg-transparent"
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
