import { Component, computed, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-pagination',
  host: { class: 'block' },
  imports: [ButtonComponent],
  template: `
    @if (totalItems() > 0) {
      <div class="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p class="text-caption text-mid-gray">
          Showing {{ rangeStart() }}–{{ rangeEnd() }} of {{ totalItems() }}
        </p>

        <div class="flex items-center gap-2">
          <app-button
            variant="outline"
            size="sm"
            [disabled]="page() <= 1"
            (click)="pageChange.emit(page() - 1)"
          >
            Previous
          </app-button>
          <span class="px-2 text-caption text-mid-gray">Page {{ page() }} of {{ totalPages() }}</span>
          <app-button
            variant="outline"
            size="sm"
            [disabled]="page() >= totalPages()"
            (click)="pageChange.emit(page() + 1)"
          >
            Next
          </app-button>
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
